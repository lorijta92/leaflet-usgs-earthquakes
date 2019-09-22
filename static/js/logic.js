// Create map object
var myMap = L.map("map", {
    center: [33.98, -39.17],
    zoom: 3
  });

// Create and add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);  

// Store API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to set marker color based on magnitude using a ternary operator
function getColor(mag){
    return mag > 5 ? "#d73027":
        mag > 4 ? "#fc8d59" :
        mag > 3 ? "#fee08b":
        mag > 2 ? "#d9ef8b":
        mag > 1 ? "#91cf60":
        "#1a9850";
}

// Perform a GET request to the query URL: plot markers on map
d3.json(url, function(data) {

    for (var i = 0; i < data.features.length; i++) {
        
        // Extract coordinates, magnitude, location name, and date of earthquakes
        var coord = data.features[i].geometry.coordinates;
        var mag = data.features[i].properties.mag;
        var date = new Date(data.features[i].properties.time);
        var loc_name = data.features[i].properties.place;

        // Circle markers
        L.circle([coord[1], coord[0]], {
            color: "#E3E3E3",
            weight: 1,
            fillColor: getColor(mag),
            fillOpacity: 0.5,
            radius: mag * 50000 // Adjust radius size
        }).bindPopup("<h1>" + loc_name + "</h1><hr><h3> Magnitude: " + mag + "</h3>" + "<p>" + date + "</p>") // Add tooltip
        .addTo(myMap);
    }
});

// Create magnitude legend
var legend = L.control({ position: "bottomleft" }); // Add layer control

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Magnitude</h4>";
    div.innerHTML += "<i style='background: #1a9850'></i><span>0-1</span><br>";
    div.innerHTML += "<i style='background: #91cf60'></i><span>1-2</span><br>";
    div.innerHTML += "<i style='background: #d9ef8b'></i><span>2-3</span><br>";
    div.innerHTML += "<i style='background: #fee08b'></i><span>3-4</span><br>";
    div.innerHTML += "<i style='background: #fc8d59'></i><span>4-5</span><br>";
    div.innerHTML += "<i style='background: #d73027'></i><span>5+</span><br>";
    return div;
  };

legend.addTo(myMap);