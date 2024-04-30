$(() => {
  $('#register-form').on('submit', register);
});

function register(event) {
  // Prevents default from submission
  event.preventDefault();

  // Take the username and password values
  const username = $('#register-form').find('input[name="username"]').val();
  const password = $('#register-form').find('input[name="password"]').val();
  const profile_photo = $('#register-form').find('input[name="profile_photo"]').val();


  //Make AJAX POST request
  $.post( '/register', { profile_photo, username, password } )
    .then((res) => {
      // Redirect to home page
      window.location.href = '/';
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
}
