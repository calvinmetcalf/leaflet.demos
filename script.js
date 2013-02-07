var m = L.map('map').setView([42.2, -71], 8).hash();
var fills =["rgb(197,27,125)",
"rgb(222,119,174)",
"rgb(241,182,218)",
"rgb(253,224,239)",
"fill:rgb(247,247,247)",
"rgb(230,245,208)",
"rgb(184,225,134)",
"rgb(127,188,65)",
"rgb(77,146,33)"]
var baseMaps = [
    "MapQuestOpen.OSM",
    "OpenStreetMap.Mapnik",
    "OpenStreetMap.DE",
    "Esri.WorldImagery",
    "Stamen.TerrainBackground",
    "Stamen.Watercolor"
];
var overlayMaps
var lc = L.control.layers.filled(baseMaps, overlayMaps, {map : m});

d3.json("oa.json", function(oa) {

window.p = oa.features.map(function(v){
    
    return v.geometry.coordinates;
     
});
window.v=d3.geom.voronoi(p);
p.map(function(r){
 var latlng =new L.LatLng(r[1],r[0]);
    var circ = new L.CircleMarker(latlng,{stroke:false,fillOpacity:1,clickable:false})
    m.addLayer(circ.setRadius(3));
});
v.map(function(r){
    L.polygon(r.map(function(rr){
        return new L.LatLng(rr[1],rr[0]);
    }),{stroke:false,fillOpacity:0.5,color:fills[Math.floor((Math.random()*9))]}).addTo(m);
});
});