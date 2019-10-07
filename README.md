# USGS: Earthquake Visualizations

![earthquakemap](https://github.com/lorijta92/leaflet-usgs-earthquakes/blob/master/static/earthquakes_maps.png?raw=true)

# Goal
Use Leaflet.js to visualize earthquakes by plotting markers on a global map, colored and sized by magnitude.

# Process

First, a basic HTML file was created with a `<div>` to store the map and a CSS stylesheet made to set the dimensions of the map. Then, in the `logic.js` file, I created a Leaflet map object and tile layer, importing the necessary  API key through a config file. 

I wanted to visualize one week’s worth of earthquakes around the world, so I found the appropriate link on the USGS website and stored that URL address as a variable. Then, using `d3.json()`, I accessed that data and created a function to plot a circle marker for each earthquake.

In a for loop, I iterated through the data, storing the coordinates, magnitude, location name, and date of each earthquake in variables. Still within the for loop, I used `L.circle` to create the markers, passing in the appropriate variables, and used `.bindPopup()` to attach a tooltip to each marker with further information about the earthquake. 

Because I wanted the color of each marker to be conditional on the magnitude, I created a function, `getColor()` using a ternary operator to return a different color code based on magnitude. This function was then used in the `fillColor` field of `L.circle()` in the for loop. 

Lastly, a legend was added to clarify the colors used on the markers. To accomplish this, a layer control was first added, and then new `<div>` elements containing the legend contents appended to the legend using `L.DomUtil.create()`. Additional legend styling elements were added to the CSS file.
