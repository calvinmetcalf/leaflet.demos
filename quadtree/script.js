var m = L.map('map').setView([42.2, -71], 8).hash();
var baseMaps = [
  
    "MapQuestOpen.OSM",
      "Stamen.Watercolor",
    "OpenStreetMap.Mapnik",
    "OpenStreetMap.DE",
    "Esri.WorldImagery",
    "Stamen.TerrainBackground"
    
];
var overlayMaps
var lc = L.control.layers.filled(baseMaps, overlayMaps, {map : m});

d3.json("oa.json", function(oa) {
var q,dd;
var s={
  lat:{max:42.85949,
  min:41.57026
  },
  lng:{max:-70.10718,
  min:-73.36505
  }
};
function bb(b){
   
    b.visit(c);
function c(quad, x1, y1, x2, y2) {
   L.polygon([makel([x1,y1]),makel([x2,y1]),makel([x2,y2]),makel([x1,y2])],{fillOpacity:0,weight:1,color:"#000",clickable:false}).addTo(m);
         
      }
      

}
function makel(ll){
    var lol=new L.LatLng(ll[1], ll[0]);
    return lol;
    
}

var p = oa.features.map(function(v){
    
    var r = {x:v.geometry.coordinates[0],y:v.geometry.coordinates[1],properties:v.properties};
    var latlng =new L.LatLng(r.y,r.x);
    var circ = new L.CircleMarker(latlng,{stroke:false,fillOpacity:1,clickable:false})
    m.addLayer(circ.setRadius(3));
    return r;
    }
    
    );
q = d3.geom.quadtree(p,s.lng.min,s.lat.min,s.lng.max,s.lat.max);
bb(q);
});