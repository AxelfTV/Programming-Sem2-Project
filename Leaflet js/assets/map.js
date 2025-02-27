var map = L.map('map').setView([53.3498, -6.2603], 13); // Dublin

       

function main(){
    console.log("test");
     // Add OpenStreetMap layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom crime data markers
    var crimeData = [
        { lat: 53.3438, lon: -6.2546, type: "Theft" },
        { lat: 53.3488, lon: -6.2672, type: "Assault" }
    ];

    crimeData.forEach(crime => {
        L.marker([crime.lat, crime.lon])
            .addTo(map)
            .bindPopup(`<b>Crime Type:</b> ${crime.type}`);
    });

     // Define waypoints for the route (example coordinates)
    var waypoints = [
        L.latLng(53.3498, -6.2603), // Starting point: Dublin City Center
        L.latLng(53.3438, -6.2546),  // Ending point: Another location in Dublin
        L.latLng(53.3408, -6.2546)  // Ending point: Another location in Dublin
    ];
  
      // Create and add the routing control to the map
      L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true, // Allows the route to update while dragging markers
        // Optionally, specify a different routing service by providing a custom service
      }).addTo(map);
}
$().ready( main )