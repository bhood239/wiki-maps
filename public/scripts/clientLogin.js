$(() => {
  $('#login-form').on('submit', login);
});

function login(event) {
  // Prevents default from submission
  event.preventDefault();

  // Take the username and password values
  const username = $('input[name="username"]').val();
  const password = $('input[name="password"]').val();

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
