Leaflet Examples
====
Here are some exmples on how to make some sweet maps in [leaflet](http://leafletjs.com/) and [d3](http://d3js.org)

Lets start from scratch
```html
<!doctype html>
<html>
  <head>
   </head>
    <body>
    </body>
</html>
```
really can't get any more basic then this, but we're going to need to add just a bit more boiler plate here
```diff
<!doctype html>
-<html>
+<html lang="en">
  <head>
+    <meta charset='utf-8'/>
+        <title>
+            Leaflet
+        </title>
+         <!--[if lte IE 8]>
+            <script src="ddr-ecma5-min.js"></script>
+        <![endif]-->    
   </head>
    <body>
+        <script type="text/javascript">
+            var _gaq = _gaq || [];
+            _gaq.push(['_setAccount', 'UA-31218444-1']);
+            _gaq.push(['_trackPageview']);
+           (function() {
+                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
+                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
+                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
+            })();
+        </script>
    </body>
</html>
```
what'd we do here?
we:
* Added a language attribute to the html tag
* Set the character set, D3 will throw and error if you don't have this set.
* Added a title
* Added a shim so we can use older browser features with out having to worry about IE 8, your also going to want to make sure you have a copy of this wonderful library, you may get one from its [github repo](https://github.com/ddrcode/ddr-ecma5)
* Added analytics, always add analytics, btw if you just copy and paste that code I'd change the id if I were you (or don't I'm always curious about the traffic patterns of strangers sites).
Next we add leaflet stuff
```diff
<!doctype html>
<html lang="en">
  <head>
    <meta charset='utf-8'/>
        <title>
            Leaflet
        </title>
+        <style>
+            html { height: 100% }
+            body { height: 100%; margin: 0; padding: 0;}
+            #map{ height: 100% }
+        </style>
         <!--[if lte IE 8]>
            <script src="ddr-ecma5-min.js"></script>
        <![endif]-->    
   </head>
    <body>
+        <div id="map"></div>
+        <script type="text/javascript" src="leaflet.js"></script>
+        <script type="text/javascript" src="leaflet.css.js"></script>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-31218444-1']);
            _gaq.push(['_trackPageview']);
           (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </body>
</html>
```
Ok what we did here was we
* added three lines of css that are mandatory to make a full screen map
* a div in which our map can live
* the leaflet script (duh)
* The first of a few leaflet plugins were going to be using to make our job easier, this one adds the correct css in for us without having to do the conditional comments you usually have to do, [you can grab it from it's repo](https://github.com/calvinmetcalf/leaflet.css)
