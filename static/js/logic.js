// Creating map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);  

// Store API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url, function(data) {

    for (var i = 0; i < data.features.length; i++) {
        
        // Extract latitude, longitude, and magnitude of earthquakes
        var coord = data.features[i].geometry.coordinates;
        var mag = [data.features[i].properties.mag];

        console.log(mag);

        // Set marker color
        var color = "";
        if (mag > 5) {color = "#d73027";}
        else if (mag > 4) {color = "#fc8d59";}
        else if (mag > 3) {color = "#fee08b";}
        else if (mag > 2) {color = "#d9ef8b";}
        else if (mag > 1) {color = "#91cf60";}
        else {color = "#1a9850";}

        // Circle markers
        L.circle([coord[1], coord[0]], {
            color: "black",
            fillColor: color,
            fillOpacity: 0.5,
            radius: mag * 1500
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1><hr><p> Magnitude: " + mag).addTo(myMap);

    }
});