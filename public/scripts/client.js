// Client facing scripts here

$(() => {
  // load maps into menu list
  loadMaps();

  // If logged in, show options visible only to an authenticated user
  checkLoggedIn()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        console.log('isLoggedIn');
        $('.heart').show();
        $('.edit-logo').show();
        heartIcon();
      }
    });

    // Load index page when title is clicked
  $('.nav-title').on('click', () => {
    $('.login-container').addClass('hide');
    $('.profile-container').addClass('hide');
    $('.map-form-container').addClass('hide');
    $('.edit-profile-container').addClass('hide');
    $('.map-container').removeClass('hide');
  });

  $('.menu').on('click', getMenuOptions);
  $('#user-toggle').on('click', loadLoginPage);
  $('#logout').on('click', logout);
  $('#profile').on('click', loadProfile);

  $('.edit-logo').on('click', () => {
    $('.login-container').addClass('hide');
    $('.profile-container').addClass('hide');
    $('.map-form-container').addClass('hide');
    $('.map-container').addClass('hide');
    $('.edit-profile-container').removeClass('hide');
  });

  $('#fav-maps').on('click', () => {
    $('#contributed-maps').addClass('hide');
    $('#favourite-maps').removeClass('hide');
  });
  $('#con-maps').on('click', () => {
    $('#favourite-maps').addClass('hide');
    $('#contributed-maps').removeClass('hide');
  });
  $('#map-options-toggle').on('click', getMapOptions);

  $('.btn-login').click(() => {
    $('#register-form').addClass('hide');
    $('#login-form').toggleClass('hide');
    $('.btn-log-reg-container').toggleClass('hide');
  })
  $('.btn-reg').click(() => {
    $('#login-form').addClass('hide');
    $('#register-form').toggleClass('hide');
    $('.btn-log-reg-container').toggleClass('hide');
  })

  $('#add-map').on('click', loadMapForm);

});

// helper functions
const getMenuOptions = () => {
  if ($('.menu-items').is(':visible')) {
    $('.menu-items').slideUp();
  } else {
    $('.menu-items').slideDown();
  }
};

function changeIconColor(id) {
  // Check if the icon already has the 'clicked' class
  if ($(`#${id}`).hasClass('clicked')) {
    // If it does, remove the 'clicked' class to revert to the previous color
    $(`#${id}`).removeClass('clicked');
    // Check the id of the icon which is map id
    const mapId = id;
    // send a POST request to '/favMaps' to remove the map_id from favourites table
    $.post( '/api/favmaps/delete', { mapId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.responseText);
      });
  } else {
    // If it doesn't, add the 'clicked' class to change the color to red
    $(`#${id}`).addClass('clicked');
    // Check the id of the icon which is map id
    const mapId = id;
    // send a POST request to '/favMaps' to add the map_id to favourites table
    $.post( '/api/favmaps', { mapId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.responseText);
      });
  }
}

const heartIcon = () => {
  $.get('/api/favmaps')
  .then((maps) => {
    const mapIds = JSON.parse(maps);
    mapIds.forEach((mapId) => {
      $(`#${mapId}`).addClass('clicked');
    });
  })
  .catch((error) => {
    console.error('Error fetching favorite maps:', error);
  });
};

// Function to load maps in the menu options
function loadMaps() {
  // clear the element to avoid duplicate maps
  $('.menu-items').empty();
  // Make Ajax GET request
  $.get('/api/maps')
    .then((maps) => {
      console.log('loadmaps', maps);
      renderMaps(maps);
    })
    .catch((err) => {
      console.log(err);
    });
}

const renderMaps = (maps) => {
  // loop through maps
  for (const map of maps) {
    const $map = createMapList(map);
    // takes return value and appends it to menu-options
    $('.menu-items').prepend($map);
  }
};

// Function to create map
const createMapList = (map) => {
  const $mapItem = $('<li>')
  const $mapDiv = $('<div>').addClass('map-name').text(map.name); // Create list item
  const $heartIcon = $('<i>').addClass('fa-solid fa-heart');
  // giving heart icon an 'id' to use to add/remove fav maps with that id
  const $heart = $('<span>').addClass('heart').attr('id', map.id).append($heartIcon);
  $mapItem.append($mapDiv);
  $mapItem.append($heart);

  // Attach click event to the map button to initialize the map
  $mapDiv.on('click', async function() {
    try {
      await initMap(map.id); // Initialize map with the clicked map ID
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  });

  // Attach click event to the heart icon to add to fav
  $heart.on('click', async function() {
    changeIconColor(map.id);
  });

  return $mapItem;
};

const loadLoginPage = () => {
  // If logged in, load menu-options, if not, load login page
  checkLoggedIn()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        if ($('.user-options').is(':visible')) {
          $('.user-options').slideUp();
        } else {
          $('.user-options').slideDown();
        }
      } else {
        $('.login-container').removeClass('hide');
        $('.map-container').addClass('hide');
        $('.btn-log-reg-container').removeClass('hide');
        $('#login-form').addClass('hide');
        $('#register-form').addClass('hide');
        $('.profile-container').addClass('hide');
      }
    });
};


function logout() {
  $.post({ url: '/logout' })
    .then((res) => {
      // Redirect to home page
      window.location.href = '/';
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
}

function checkLoggedIn() {
  return $.get('/check-login')
    .then((res) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
}

let profileLoaded = false;

function loadProfile() {
  $('.profile-container').removeClass('hide');
  $('.map-container').toggleClass('hide');
  $('#contributed-maps').addClass('hide');

  // const id = this.id;
  $.get('/profile')
    .then((res) => {
      // clear data before appending again
      $('#profile-picture').empty();
      $('#profile-name').empty();
      $('#favourite-maps-count').empty();
      $('#contributed-maps-count').empty();
      $('#favourite-maps').empty();
      $('#contributed-maps').empty();
      // prepend image url to profile picture
      $('#profile-picture').prepend(`<img src="${res.image}" alt="Profile Picture">`);
      // prepend user name to profile name
      $('#profile-name').prepend(`<h1>${res.name}</h1>`);
      // prepend the number of favourite maps
      $('#favourite-maps-count').append(`<p>${res.favMapsCount}</p>`);
      // prepend the number of contributed maps
      $('#contributed-maps-count').append(`<p>${res.conMapsCount}</p>`);
      // Loop through favourite maps and append to list
      if (res.favMaps) {
        console.log(res.favMaps);
        res.favMaps.forEach((map) => {
          $('#favourite-maps').append(`<li>${map}</li>`);
        });
      }
      // Loop through contributed maps and append to list
      if (res.conMaps) {
        res.conMaps.forEach((map) => {
          $('#contributed-maps').append(`<li>${map}</li>`);
        });
      }
    })
    .catch((error) => {
      console.error("Error loading profile:", error);
      // Handle error, display error message, etc.
    });
}

function getMapOptions() {
  // close if visible
  if ($('.map-options').is(':visible')) {
    $('.map-options').slideUp();
  } else {
    $('.map-options').slideDown();
  }
}

const loadMapForm = () => {
  checkLoggedIn()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        $('.login-container').addClass('hide');
        $('.profile-container').addClass('hide');
        $('.map-container').addClass('hide');
        $('.map-form-container').removeClass('hide');
      }
    });
};

