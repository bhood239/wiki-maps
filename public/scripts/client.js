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
        $('#map-options-toggle').show();
      }
    });

  $('.nav-title').on('click', () => {
    $('.login-container').addClass('hide');
    $('.profile-container').addClass('hide');
    $('.map-form-container').addClass('hide');
    $('.map-container').removeClass('hide');
  });
  $('.menu').on('click', getMenuOptions);
  $('.heart').on('click', changeIconColor);
  $('#user-toggle').on('click', loadLoginPage);
  $('#logout').on('click', logout);
  $('#profile').on('click', loadProfile);
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

function changeIconColor() {
  // Check if the icon already has the 'clicked' class
  if ($(this).hasClass('clicked')) {
    // If it does, remove the 'clicked' class to revert to the previous color
    $(this).removeClass('clicked');
    // Check the id of the icon which is map id
    const mapId = $(this).attr('id');
    // send a POST request to '/favMaps' to remove the map_id from favourites table
    $.post({ url: '/favMaps', data: mapId })
      .then((res) => {
        console.log('Removed from favourites.');
      })
      .catch((err) => {
        console.log('An error occured. Try again later.');
      });
  } else {
    // If it doesn't, add the 'clicked' class to change the color to red
    $(this).addClass('clicked');
    // Check the id of the icon which is map id
    const mapId = $(this).attr('id');
    // send a POST request to '/favMaps' to add the map_id to favourites table
    $.post({ url: '/favMaps', data: mapId })
      .then((res) => {
        console.log('Added to favourites.');
      })
      .catch((err) => {
        console.log('An error occured. Try again later.');
      });
  }
}

// Function to load maps in the menu options
function loadMaps() {
  // clear the element to avoid duplicate maps
  $('.menu-items').empty();
  // Make Ajax GET request
  $.get('/api/maps')
    .then((maps) => {
      console.log('maps', maps);
      renderMaps(maps);
    })
    .catch((err) => {
      console.log(err);
    });
}

const renderMaps = (maps) => {
  // loop through maps
  for (const map of maps) {
    console.log('eachmap', map);
    const $map = createMap(map);
    // takes return value and appends it to menu-options
    $('.menu-items').prepend($map);
  }
};

// Function to create map
const createMap = (map) => {
  console.log('createmap', map);
  // Using .text() method to avoid XSS
  const $map = $('<li>').addClass('map-name').text(map.name);
  const $heartIcon = $('<i>').addClass('fa-solid fa-heart');
  // giving heart icon an 'id' to use to add/remove fav maps with that id
  const $heart = $('<span>').addClass('heart').attr('id', map.id).append($heartIcon);
  $map.append($heart);

  return $map;
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

function loadProfile() {
  $('.profile-container').removeClass('hide');
  $('.map-container').toggleClass('hide');

  // const id = this.id;
  $.get('/profile')
    .then((res) => {
      // prepend image url to profile picture
      $('#profile-picture').prepend('<img src="' + res.image + '" alt="Profile Picture">');
      // prepend user name to profile name
      $('#profile-name').prepend('<h1>' + res.name + '</h1>');
      // prepend the number of favourite maps
      $('#favourite-maps-count').append('<p>' + res.favMapsCount + '</p>');
      // prepend the number of contributed maps
      $('#contributed-maps-count').append('<p>' + res.conMapsCount + '</p>');
      // Loop through favourite maps and append to list
      if (res.favMaps) {
        console.log(res.favMaps);
        res.favMaps.forEach((map) => {
          $('#favourite-maps').append('<li>' + map + '</li>');
        });
      }
      // prepend the number of contributed maps
      // $('#contributed-maps').prepend(res.conMaps);
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
