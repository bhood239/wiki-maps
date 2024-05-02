// map and pin generation functions
let map;
let mapId;
let marker;

//LOAD CURRENT PINS FROM DATABASE
// Function to add a pin to the map
async function addPin(map, pin) {
  const position = {
    lat: Number(pin.lat),
    lng: Number(pin.lng)
  }
  marker = new google.maps.Marker({ position, map });
  console.log(pin);

  // Check if content exists for InfoWindow
  if (pin) {
    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div style='text-align: center;'><img style='width:200px; height:200px;' src='${pin.image}'></div>
      <div style='padding: 10px;'>
        <h1>${pin.title}</h1>
        <p>${pin.description}</p>
        <div style='bottom: 0; right: 10px;'>
          <p>Added by: ${pin.username}</p>
          <button type="button" onclick="editPin(${pin.id})">Edit</button>
        </div>
      </div>`
    });

    // Open InfoWindow when marker is clicked
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
};

// SCRIPT FOR USERS TO ADD PINS
// Function to handle map click
function handleMapClick(event) {
  try {
    // Create an info window with input fields for image URL, title, and description
    const infoWindowContent = `
      <div>
        <label for="imageUrl">Image URL:</label><br>
        <input type="text" id="imageUrl" name="imageUrl"><br>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="description">Description:</label><br>
        <textarea id="description" name="description"></textarea><br><br>
        <button onclick="addPinFromInfoWindow()">Add Pin</button>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      position: event.latLng,
    });

    infoWindow.open(map);

    // Function to add pin using data from the info window
    window.addPinFromInfoWindow = function() {
      const imageUrl = document.getElementById('imageUrl').value;
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;

      const pinData = {
        lat: Number(event.latLng.lat()),
        lng: Number(event.latLng.lng()),
        map_id: mapId,
        title: title || "Default Title",
        description: description || "Default Description",
        image: imageUrl || "https://http.cat/images/100.jpg"
      };

      if (map) {
        placeMarker(pinData, map);
        createPinOnServer(map, pinData);
        infoWindow.close(); // Close the info window after adding the pin
      } else {
        console.error('Map object is undefined.');
      }
    };
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
function createPinOnServer(map, pinData) {
  console.log("Sending pin data to server:", pinData);
  $.ajax({
    method: 'POST',
    url: '/api/pins',
    contentType: 'application/json',
    data: JSON.stringify(pinData),
    success: function(response) {
      console.log('Pin created on the server:', response);
      addPin(map, pinData);
    },
    error: function(error) {
      console.error('Error creating pin on server:', error);
      if (error.responseText) {
        console.log('Response Text:', error.responseText);
      }
      if (error.responseJSON) {
        console.log('Response JSON:', error.responseJSON);
      }
    }
  });
}

//FUNCTIONS FOR USERS TO EDIT PINS
// Function to handle pin editing
function editPin(pinId) {
  console.log(pinId);
  const infoWindowContent = `
    <div style='padding: 10px;'>
      <h1>Edit Pin</h1>
      <label for="editTitle">Title:</label><br>
      <input type="text" id="editTitle" "><br>
      <label for="editDescription">Description:</label><br>
      <textarea id="editDescription"></textarea><br><br>
      <label for="editImage">Image URL:</label><br>
      <textarea id="editImage"></textarea><br><br>
      <button type="button" onclick="saveEditedPin('${pinId}')">Save</button>
    </div>`;

  // Update the InfoWindow content with the editable fields
  const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });
  infoWindow.open(map, marker);
}

// Function to save the edited pin
function saveEditedPin(pinId) {
  const editedTitle = document.getElementById('editTitle').value;
  const editedDescription = document.getElementById('editDescription').value;
  const editedImage = document.getElementById('editImage').value;

  // Make an AJAX request to update the pin information
  $.ajax({
    method: 'POST',
    url: `/api/pins/${pinId}`,
    contentType: 'application/json',
    data: JSON.stringify({
      title: editedTitle,
      description: editedDescription,
      image: editedImage
    }),
    success: function(response) {
      console.log('Pin updated successfully:', response);
      initMap(mapId);
    },
    error: function(error) {
      console.error('Error updating pin:', error);
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
  mapId = id;
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
      const response = await $.ajax({
        method: 'GET',
        url: `/api/pins/${id}`
      });

      // Check if response contains the pin array
      if (response && Array.isArray(response.pin)) {
        const pins = response.pin;
        for (const pin of pins) {
          // Parse lat and lng strings into numbers
          const latNum = parseFloat(pin.lat);
          const lngNum = parseFloat(pin.lng);

          addPin(map, { id: pin.id, lat: latNum, lng: lngNum, title: pin.title, description: pin.description, image: pin.image, username: pin.username });
        }
      } else {
        console.error('Failed to load pins: Invalid response format');
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

