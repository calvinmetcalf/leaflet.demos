var m = L.map('map').setView([42.2, -71], 8).hash();
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