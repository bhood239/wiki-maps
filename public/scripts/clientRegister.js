$(() => {
  $('#register-form').on('submit', register);
});

function register(event) {
  // Prevents default from submission
  event.preventDefault();

  // Take the username and password values
  const username = $('#username').val();
  const password = $('#password').val();


  //Make AJAX POST request
  $.post({ url: '/register', data: { username, password } })
    .then((res) => {
      // Redirect to home page
      window.location.href = 'index.html';
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
}
