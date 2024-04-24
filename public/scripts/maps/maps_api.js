// let map;

// const initMap = async function() {
//   const { Map } = await google.maps.importLibrary("maps");

//   // Create a new map with default options
//   map = new Map(document.getElementById('map'), {
//     zoom: 13,
//     center: { lat: 50.113123, lng: -122.953864 } // Centered at Whistler
//   });





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
}

// initMap();

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const map = new Map(document.getElementById("map"), {
    center: { lat: 50.113123, lng: -122.953864 }, // Centered at Whistler
    zoom: 13,
    mapId: "4504f8b37365c3d0"
  });

    // example pins to add to map
    const pins = [
      { coords: { lat: 50.117045, lng: -122.946385 }, content: '<h1>Coffee Shop</h1>' },
      { coords: { lat: 50.114947, lng: -122.958227 }, content: '<h1>Coffee Shop</h1>' }
    ];

      // Loop through pins and add them to the map
  for (let i = 0; i < pins.length; i++) {
    addPin(map, pins[i]);
  }
};

initMap();
