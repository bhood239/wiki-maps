// Client facing scripts here


$(() => {
  $('.menu').on('click', getMenuOptions);
  $('.heart').on('click', changeIconColor);
  $('#user-toggle').on('click', loadLoginPage);
  $('#login-form').on('submit', login);
  $('#logout').on('click', logout);
  $('.profile').on('click', loadProfile);
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
    // Send POST request to remove the map from favourite maps
    $(this).removeClass('clicked');
  } else {
    // If it doesn't, add the 'clicked' class to change the color to red
    // Send POST request to add the map to favourite maps
    $(this).addClass('clicked');
  }
}

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
        $('.container').load('login-page.html');
      }
    });
};

function login(event) {
  // Prevents default from submission
  event.preventDefault();

  // Serialize form data
  const formData = $(this).serialize();

  // Take the username and password values
  const username = $('#username').val();
  const password = $('#password').val();

  //Make AJAX POST request
  $.post({ url: '/login', data: { username, password } })
    .then((res) => {
      // check if data is true
      if (res === 'success') {
        // Redirect to home page
        window.location.href = 'index.html';
      } else {
        // Display error message
        alert('Login failed. Please try again.');
      }
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
}

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
  return $.get({ url: '/check_login' })
    .then((response) => {
      if (response.logged_in) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function loadProfile() {
  checkLoggedIn()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        $('.container').load('profile.html');
        $.get({ url: '/profile' })
        .then((res) => {
          // prepend image url to profile picture
          $('#profile-picture').prepend(res.image);
          // prepend user name to profile name
          $('#profile-name').prepend(res.name);
          // prepend the number of favourite maps
          $('#favourite-maps-count').prepend(res.favMapsCount);
          // prepend the number of contributed maps
          $('#contributed-maps-count').prepend(res.conMapsCount);
          // prepend the list of favourite maps
          $('#favourite-maps').prepend(res.favMaps);
          // prepend the number of contributed maps
          $('#contributed-maps').prepend(res.conMaps);
        })
      }
    });

}

function getMapOptions() {
  if ($('.map-options').is(':visible')) {
    $('.map-options').slideUp();
  } else {
    $('.map-options').slideDown();
  }
}

function generateMap() {
  initMap({lat: 50.113123, lng: -122.953864}, [
    { coords: {lat: 50.117045, lng: -122.946385}, content:'<h1>Coffee Shop</h1>'},
    { coords: {lat: 50.114947, lng: -122.958227}, content:'<h1>Coffee Shop</h1>'}
  ])
}
