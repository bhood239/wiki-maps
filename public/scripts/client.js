// Client facing scripts here


$(() => {
  // If logged in, show options visible only to an authenticated user
  checkLoggedIn()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        $('.heart').show();
        $('#map-options-toggle').show();
      }
    });

  $('.menu').on('click', getMenuOptions);
  $('.heart').on('click', changeIconColor);
  $('#user-toggle').on('click', loadLoginPage);
  $('#register').on('click', loadRegisterPage);
  $('#logout').on('click', logout);
  $('#profile').on('click', loadProfile);
  $('#map-options-toggle').on('click', getMapOptions);


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
  $.get('/map')
    .then((map) => {
      $map = createMap(map);
      // takes return value and appends it to menu-options
      $('.menu-options').prepend($map);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Function to create map
const createMap = (map) => {
  // Using .text() method to avoid XSS
  const $map = $('<li>').addClass('map-name').text(map.name);
  const $heartIcon = $('<i>').addClass('fa-solid fa-heart');
  // giving heart icon an 'id' to use to add/remove fav maps with that id
  const $heart = $('<span>').addClass('heart').attr('id', map.id).append($heartIcon);
  $map.append($heart);
};

const loadLoginPage = () => {
  // If logged in, load menu-options, if not, load login page
  if (checkLoggedIn()) {
    if ($('.user-options').is(':visible')) {
      $('.user-options').slideUp();
    } else {
      $('.user-options').slideDown();
    }
  } else {
    $('#map').load('login-page.html');
  }
};

function loadRegisterPage() {
  console.log('Loading register page...');
  $('#map').load('register-page.html');
}

// function register(event) {
//   // Prevents default from submission
//   event.preventDefault();

//   // Take the username and password values
//   const username = $('#username').val();
//   const password = $('#password').val();


//   //Make AJAX POST request
//   $.post({ url: '/register', data: { username, password } })
//     .then((res) => {
//       // Redirect to home page
//       window.location.href = 'index.html';
//     })
//     .catch((err) => {
//       alert('An error occured. Please try again.');
//     });
// }

// function login(event) {
//   console.log('123');
//   // Prevents default from submission
//   // event.preventDefault();

//   // Take the username and password values
//   const username = $('#username').val();
//   const password = $('#password').val();

//   //Make AJAX POST request
//   $.post( '/login', { username, password } )
//     .then((res) => {
//       // check if data is true
//       if (res === 'Success') {
//         // Redirect to home page
//         window.location.href = 'index.html';
//       } else {
//         // Display error message
//         alert('Login failed. Please try again.');
//       }
//     })
//     .catch((err) => {
//       alert('An error occured. Please try again.');
//     });
// }

function logout() {
  $.post({ url: '/logout' })
    .then((res) => {
      // Redirect to home page
      window.location.href = 'index.html';
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
  $('#map').load('profile.html');
  // $.get({ url: '/profile', data: id })
  //   .then((res) => {
  //     // prepend image url to profile picture
  //     $('#profile-picture').prepend(res.image);
  //     // prepend user name to profile name
  //     $('#profile-name').prepend(res.name);
  //     // prepend the number of favourite maps
  //     $('#favourite-maps-count').prepend(res.favMapsCount);
  //     // prepend the number of contributed maps
  //     $('#contributed-maps-count').prepend(res.conMapsCount);
  //     // prepend the list of favourite maps
  //     $('#favourite-maps').prepend(res.favMaps);
  //     // prepend the number of contributed maps
  //     $('#contributed-maps').prepend(res.conMaps);
  //   })
}

function getMapOptions() {
  // close if visible
  if ($('.map-options').is(':visible')) {
    $('.map-options').slideUp();
  } else {
    $('.map-options').slideDown();
  }
}
