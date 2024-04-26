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

// Function to retrieve map coordinates
async function fetchMapCoords() {
  try {
    const map = await $.ajax({
      method: 'GET',
      url: 'api/maps'
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

// Define initMap as an async function
async function initMap() {
  try {
    // Fetch map coordinates
    const mapCoords = await fetchMapCoords();

    // Request needed library
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById("map"), {
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
}

