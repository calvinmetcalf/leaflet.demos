var m = L.map('map').setView([42.35904337942925, -71.06178045272827], 18)
var baseMaps = [
    "MapQuestOpen.OSM",
    "OpenStreetMap.Mapnik",
    "OpenStreetMap.DE",
    "Esri.WorldImagery",
    "Stamen.TerrainBackground",
    "Stamen.Watercolor",
];

//var bikes = L.geoJson.ajax("bikes.json",{onEachFeature: onEachFeature,style:style});

L.control.layers.filled(baseMaps,{},{map:m})
function getUrl(){
    return "bikes.json";//http://calvin.iriscouch.com/bike/_design/bike/_spatiallist/geojson/all?bbox=-77.0196533203125,40.52215098562377,-66.8133544921875,43.55651037504758";
}
var docs=L.geoJson(undefined,{onEachFeature: onEachFeature,style:style});
var boxes = L.featureGroup([]);
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
    	var out = [];
        for(var key in feature.properties){
        	out.push(key + ": "+feature.properties[key]);
        }
        
        layer.on('click', function(e){
    L.rrose({ autoPan: false })
      .setContent(out.join("<br/>"))
      .setLatLng(e.latlng)
      .openOn(m);
  });
    }
}
function style(doc) {
		var status = doc.properties.FacilityStatus.slice(0,doc.properties.FacilityStatus.indexOf(":"));
		out = {opacity:0.9};
        switch (status) {
            case 'Existing':
            	//
            	break;
            case 'Under construction':
            	out.dashArray = "4, 10";

            	break;
            case 'In design':
            	out.dashArray = "4,15";

            	break;
            case 'Planned':
            	out.dashArray = "3, 20"
            	break;
        }
        var facT = doc.properties.FacilityType
		var pn = facT.indexOf("(")
		if( pn>0 ){
				facT = facT.slice(0,pn)
		}
		switch (facT.trim()) {
			case 'Bike lane':
				out.color = "#E41A1C";
				break;
			case "Bicycle/Pedestrian priority roadway":
				out.color ="#377EB8";
				break;
			case "Cycle track":
				out.color ="#4DAF4A";
				break;
			case "Marked shared lane":
				out.color ="#984EA3";
				break;
			case "Shared use path":
				out.color ="#FF7F00";
				break;
			case "Sign-posted on-road bike route":
				out.color ="#FFFF33";
				break;
			case "On-Road - To Be Determined":
				out.color ="#A65628";
				break;
			case "Paved bike shoulder":
				out.color ="#F781BF";
				break;
			case "Hybrid":
				out.color ="#999999";
				break;
		}
        return out;
    }
var db;
Pouch("bikeboxes",function(err,d){
	if(!err){	
		db=d;
		db.put({"language":"javascript","spatial":{"all":"function(doc){if(doc && doc.geometry){emit(doc.geometry,doc)}}"},"_id":"_design/bike2"},function(){});
		$.get("bikes.json",function(d){
			d.features.forEach(function(v){
				v._id = v.id;
				delete v.id;
				db.put(v,function(){});
			});
			m.on("moveend",updateMap);
            updateMap();
		},"json");
	}
});
m.hash();
function updateMap(){
    db.spatial("bike2/all",{"start_range":[m.getBounds().getSouthWest().lng,m.getBounds().getSouthWest().lat],"end_range":[m.getBounds().getNorthEast().lng,m.getBounds().getNorthEast().lat]},function(err,data){
        m.removeLayer(docs);
        docs.clearLayers();
        m.removeLayer(boxes);
        boxes.clearLayers();
        
    			data.rows.forEach(function(v){
					docs.addData(v.value);
					if(v.key.length>1){
           var bounds= [[v.key[1][0],v.key[0][0]],[v.key[1][1],v.key[0][1]]];
    			
		
					
					var recto = L.rectangle(bounds,{fill:false}).bindPopup(v.key.toString())
					
					boxes.addLayer(recto);
					}
					});
					docs.addTo(m);
					boxes.addTo(m);
				
				});
}