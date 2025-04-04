document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([51.505, -0.09], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        tileSize: 256,  // Default is 256, some providers use 512
        zoomOffset: 0,  // If tiles look out of alignment, change this to 1
    }).addTo(map);

    // Example Indoor Layer
    var indoorLayer = L.layerGroup().addTo(map);
    L.marker([51.505, -0.09]).addTo(indoorLayer);
});
