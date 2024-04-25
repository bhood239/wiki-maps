$(() => {
  $('#login-form').on('submit', login);
  $('#register').on('click', loadRegisterPage);
});

function login(event) {
  console.log('123');
  // Prevents default from submission
  event.preventDefault();

  // Take the username and password values
  const username = $('#username').val();
  const password = $('#password').val();

  //Make AJAX POST request
  $.post( '/login', { username, password } )
    .then((res) => {
      // check if data is true
      if (res === 'Success') {
        // Redirect to home page
        window.location.href = '/';
      } else {
        // Display error message
        alert('Login failed. Please try again.');
      }
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
}
