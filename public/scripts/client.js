// Client facing scripts here


$(() => {
  $('.menu').on('click', getMenuOptions);
  $('.heart').on('click', changeIconColor);
  $('#user-toggle').on('click', loadLoginPage);
  $('#login-form').on('submit', login);
  $('#logout').on('click', logout);
  $('.profile').on('click', loadProfile);
  $('.map-options-toggle').on('click', getMapOptions);


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
  })
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
      if(res === 'success') {
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
  if(checkLoggedIn) {
    $('.container').load('profile.html');
  }
}

function getMapOptions() {
  if ($('.map-options').is(':visible')) {
    $('.map-options').slideUp();
  } else {
    $('.map-options').slideDown();
  }
}
