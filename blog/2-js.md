The JS
===

Here we are going to be getting into the JavaScript which will make [this map](http://calvinmetcalf.github.com/leaflet.demos), this is all the code that was in the 'script.js' file in the [previous post](1-html.md).

First thing we do is wrap it all up in a closure:

```js
(function () {
//code goes here
}());
```

Polluting the global namespace is a party foul and you shouldn't do it, I tend not to count the closure when doing my indents if for no other reason then I usually only put the closure in at the end after I've debugged it so I don't feel like adding an extra tab to each line, with that out of the way we do:

```js
var m = L.map('mapID').setView([42.36, -71.06], 15);
```

What this does is creates a new map, in an element called 'mapID' set at zoom level 15 and centered on Boston.  You may see this written in a couple different ways, for almost all Objects in leaflet there are two ways of creating them, a traditional Uppercase Object Creation method:

```js
var m = new L.Map('mapID');
```

and a lowercase factory function method:

```js
var m = L.map('mapID');
```

I always use the second method.  All objects almost always take a options object as the last argument, so I could have written that as:

```js
var m = L.map('mapID', {
	center: new L.LatLng(42.36, -71.06),
    zoom: 15
});
```

but most everything in leaflet supports the style jQuery made famous called "Method Chaining", which as an aside it turns out is just [a less pretentious term for 'monad'](http://blog.jorgenschaefer.de/2013/01/monads-for-normal-programmers.html), but I degrees instead of passing an option argument we can set the zoom and center with methods:

```js
var m = L.map('mapID').setZoom(15).panTo(new L.LatLng(42.36, -71.06));
```

It doesn't really make sense to set our zoom an pan separably as we don't have those yet, so good thing leaflet has another method called setView which does this in one go:

```js
var m = L.map('mapID').setView(new L.LatLng(42.36, -71.06), 15);
```

But wait we have lower case factory functions so we can write:

```js
var m = L.map('mapID').setView(L.latLng(42.36, -71.06), 15);
```

But wait longer because any place in leaflet that accepts a latLng is smart enough to also let you pass an array and turn into a latLng for you so:

```js
var m = L.map('mapID').setView([42.36, -71.06], 15);
```

And there we have it, going forward I will not be be going into quite as much detail about the different ways you can do things so keep these in mind.  

Next we set the layers, leaflet doesn't come with a default layer built in like Google Maps or Bing, so we need to set that, for serious projects I usually use [Map Quest Open](http://open.mapquest.com/) but I think doing something slightly more awesome is the order of the day here, so were going to set the default here to be the unbelievable [Stamen Watercolor map](http://maps.stamen.com/watercolor/) with a few more sensible ones available as well:

```js
var baseMaps = [
	"Stamen.Watercolor",
	"OpenStreetMap.Mapnik",
	"OpenStreetMap.DE",
	"Esri.WorldImagery",
	"MapQuestOpen.OSM"
];
var lc = L.control.layers.provided(baseMaps,{},{collapsed:false}).addTo(m);
m.addHash({lc:lc});
```

Whats going on here:
* We made an array of basemap names to pass to the
* layerControl that we're about to make, the other options are an empty Object, because we don't have any overlays yet and we want to pass an options object as argument 3 because we don't want it collapsed by default, then we add it to the map, we call it lc because the usually the only time we reference it is.
* When we add it as an option to the Hash we just added to the map, adding a layer control is the way to get it to show the names layers in the url.

At this point you have a working map, now some stuff for the custom maps we're making:

```js
var data={}, layers={}, fills = [
	"rgb(197,27,125)",
	"rgb(222,119,174)",
	"rgb(213, 62, 79)",
	"rgb(84, 39, 136)",
	"rgb(247,64,247)",
	"rgb(244, 109, 67)",
	"rgb(184,225,134)",
	"rgb(127,188,65)",
	"rgb(69, 117, 180)"
];
```

Data and layers we're going to make public latter hence why we're defining them here, fills is the color scheme we're going to use for our layers. 

The next thing we need to do is load the json file with our data, which in this case is a geojson file containing the location of 2,000 billboards in MA. Usually I'd just use jQuery or my [AJAX plugin for leaflet](https://github.com/calvinmetcalf/leaflet-ajax) (wow I feel like I'm constantly tooting my own horn in this post), but D3 comes with its own AJAX function for  getting data so instead we do:

```js
d3.json("json/oa.json", dealwithData);
```

so that was easy, but what about deal with data? It's a function that takes an an argument the json that was just parsed, in this case the function looks like:

```js
function dealwithData(json){
    points(json);
    veronoi();
    delaunay();
    clusters();
    quadtree();
}
``` 

I'm calling a different function for each 
