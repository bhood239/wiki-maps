// Function to add a pin to the map
async function addPin(map, coords) {
  const position = {
    lat: Number(coords.lat),
    lng: Number(coords.lng)
  }
  new google.maps.Marker({position, map});

  // Check if content exists for InfoWindow
  // if (content) {
  //   const infoWindow = new google.maps.InfoWindow({
  //     content: props.content
  //   });

    // Open InfoWindow when marker is clicked
  //   marker.addListener('click', function() {
  //     infoWindow.open(map, marker);
  //   });
  // }
};

// generate map function
// - mapCoords must be an object with keys of lat and lng
// - pins must be an object containing coords as an object with lat and lng and content
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const map = new Map(document.getElementById("map"), {
    center: {lat: 50.1162, lng: -122.9535}, // Centered at Whistler
    zoom: 13,
    mapId: "4504f8b37365c3d0"
  });


  try {
    const pins = await $.ajax({
      method: 'get',
      url: '/api/pins'
    }); // This awaits the fetched pins from your async function
    console.log(pins);
    for (const pin of pins) {
      addPin(map, pin);
    }
  } catch (error) {
    console.error('Failed to load pins:', error);
  }
};

