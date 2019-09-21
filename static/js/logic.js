// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
});

// Legend colors: red to green
var colors = ["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60", "#1a9850"];

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 1500;
}

// Store API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url, function(data) {

    for (var i = 0; i < data.features.length; i++) {
        
        // Extract latitude and longitude of earthquakes
        var lat = [data.features[i].geometry.coordinates[1]];
        var lng = [data.features[i].geometry.coordinates[0]];

        // Circle markers
        L.circle([lat, lng], {
            color: "yellow",
            fillColor: "yellow",
            fillOpacity: 0.5,
            radius: markerSize(data.features[i].properties.mag)
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1><hr><p> Magnitude: " + data.features[i].properties.mag).addTo(myMap);

    }
});