$(() => {
  $('#map-form').on('submit', createMap);
});

const createMap = (event) => {
  // Prevents default from submission
  event.preventDefault();

  console.log('create map');
  // Take the form values
  const name = $('#name').val();
  const description = $('#description').val();
  const lat = $('#latitude').val();
  const lng = $('#longitude').val();

  //Make AJAX POST request
  $.post('/api/maps', { name, description, lat, lng })
    .then((res) => {
      // Redirect to home page
      window.location.href = '/';
    })
    .catch((err) => {
      alert('An error occured. Please try again.');
    });
};
