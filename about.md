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
+            <script src="es5-shim.min.js"></script>
+        <![endif]-->    
   </head>
    <body>
+        <script type="text/javascript">
+            var _gaq = _gaq || [];
+            _gaq.push(['_setAccount', 'UA-xxxxxxxx-1']);
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
