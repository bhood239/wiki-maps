// map and pin generation functions

let map; // Define map in a scope accessible to the event listener

//LOAD CURRENT PINS FROM DATABASE
// Function to add a pin to the map
async function addPin(map, pin) {
  const position = {
    lat: Number(pin.lat),
    lng: Number(pin.lng)
  }
  const marker = new google.maps.Marker({ position, map });

  // Check if content exists for InfoWindow
  if (pin.content) {
    const infoWindow = new google.maps.InfoWindow({
      content: pin.content
    });

    // Open InfoWindow when marker is clicked
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
};

// SCRIPT FOR USERS TO ADD PINS
// Function to handle map click event
function handleMapClick(event) {
  try {
    const latLng = {
      lat: event.latLng.lat(), // Get latitude from click
      lng: event.latLng.lng() // Get longitude from click
    };
    if (map) {
      placeMarker(latLng, map); // Place marker on the map
      createPinOnServer(latLng); // Send AJAX request to create pin in the database
    } else {
      console.error('Map object is undefined.');
    }
  } catch (error) {
    console.error('Error handling map click:', error);
  }
}

// Function to add a new pin marker on the map
function placeMarker(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

// Function to send AJAX request to create pin on the server
function createPinOnServer(latLng) {
  $.ajax({
    method: 'POST',
    url: '/api/pins',
    data: latLng, // Send the latLng data to the server
    success: function(response) {
      console.log('Pin created on the server:', response);
      addPin(map, latLng);
      // You can update the map or perform other actions based on the response
    },
    error: function(error) {
      console.error('Error creating pin on server:', error);
    }
  });
}

// Function to retrieve map coordinates
async function fetchMapCoords(id) {
  try {
    const map = await $.ajax({
      method: 'GET',
      url: `api/maps/${id}`
    });
    console.log('Map data:', map);

    // Check if map data is valid
    if (map && map.length > 0 && map[0].lat && map[0].lng) {
      const mapCoords = {
        lat: Number(map[0].lat),
        lng: Number(map[0].lng)
      };
      return mapCoords;
    } else {
      throw new Error('Invalid map data received');
    }
  } catch (error) {
    console.error('Failed to fetch map coordinates:', error);
    throw error;
  }
}

// GENERATE MAP
async function initMap(id) {
  try {
    // Fetch map coordinates
    const mapCoords = await fetchMapCoords(id);

    // Request needed library
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: mapCoords, // Centered at retrieved coordinates
      zoom: 13,
      mapId: "4504f8b37365c3d0"
    });

    try {
      const pins = await $.ajax({
        method: 'GET',
        url: '/api/pins'
      }); // This awaits the fetched pins
      console.log(pins);
      for (const pin of pins) {
        addPin(map, pin);
      }
    } catch (error) {
      console.error('Failed to load pins:', error);
    }
  } catch (error) {
    console.error('Failed to initialize map:', error);
  }

  // Check if map is defined before adding event listener
  if (map) {
    google.maps.event.addListener(map, 'click', handleMapClick);
  } else {
    console.error('Map object is undefined.');
  }
}

