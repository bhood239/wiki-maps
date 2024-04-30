$(() => {
  $('#edit-profile-form').on('submit', editProfile);
});

function editProfile(event) {
  // Prevents default from submission
  event.preventDefault();

  // Take the username and password values
  const username = $('#edit-profile-form').find('input[name="username"]').val();
  const password = $('#edit-profile-form').find('input[name="password"]').val();
  const profile_photo = $('#edit-profile-form').find('input[name="profile_photo"]').val();


  //Make AJAX POST request
  $.post( '/profile', { profile_photo, username, password } )
    .then((res) => {
      // Redirect to home page
      console.log(res);
      window.location.href = '/';
    })
    .catch((err) => {
      alert(err.responseText);
    });
}
