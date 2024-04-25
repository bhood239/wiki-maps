// Function to add a pin to the map
async function addPin(map, props) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const marker = new AdvancedMarkerElement({
    position: props.coords,
    map: map
  });

  // Check if content exists for InfoWindow
  if (props.content) {
    const infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

    // Open InfoWindow when marker is clicked
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
};

// generate map function
// - mapCoords must be an object with keys of lat and lng
// - pins must be an object containing coords as an object with lat and lng and content
async function initMap(mapCoords, pins) {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const map = new Map(document.getElementById("map"), {
    center: mapCoords, // Centered at Whistler
    zoom: 13,
    mapId: "4504f8b37365c3d0"
  });

      // Loop through pins and add them to the map
  for (let i = 0; i < pins.length; i++) {
    addPin(map, pins[i]);
  }
};


initMap({lat: 50.113123, lng: -122.953864}, [
  { coords: {lat: 50.117045, lng: -122.946385}, content:'<h1>Coffee Shop</h1>'},
  { coords: {lat: 50.114947, lng: -122.958227}, content:'<h1>Coffee Shop</h1>'}
]);
