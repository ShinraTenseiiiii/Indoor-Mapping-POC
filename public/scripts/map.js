document.addEventListener("DOMContentLoaded", () => {
    let map;
    let iaLocator;
    
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.7749, lng: -122.4194 }, // Default center (update to your building)
            zoom: 19,
            mapTypeId: 'satellite'
        });

        // Initialize IndoorAtlas positioning
        iaLocator = new IndoorAtlas(
            "53dd35b2-ea2e-4a94-9593-4303ee43c700",
            "fdsgfdgdfgdfg"
        );

        iaLocator.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = new google.maps.LatLng(latitude, longitude);

                // Add marker to map
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Position"
                });

                map.setCenter(userLocation);
            },
            (error) => console.error("IndoorAtlas Error:", error),
            { enableHighAccuracy: true }
        );
    }

    document.getElementById("startNavigation").addEventListener("click", initMap);
});
