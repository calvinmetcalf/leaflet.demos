Leaflet Examples
====
Here are some exmples on how to make some sweet maps in [leaflet](http://leafletjs.com/) and [d3](http://d3js.org), the final product is going to be [this map](http://calvinmetcalf.github.com/leaflet.demos) and if you don't care about html you can [skip to the JavaScript](2-js.md).

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
+            Leaflet Demo!
+        </title>
+         <!--[if lte IE 8]>
+            <script src="js/ddr-ecma5-min.js"></script>
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
            Leaflet Demo!
        </title>
+        <style>
+            html { height: 100% }
+            body { height: 100%; margin: 0; padding: 0;}
+            #mapID{ height: 100% }
+        </style>
         <!--[if lte IE 8]>
            <script src="js/ddr-ecma5-min.js"></script>
        <![endif]-->    
   </head>
    <body>
+        <div id="mapID"></div>
+        <script type="text/javascript" src="js/leaflet.js"></script>
+        <script type="text/javascript" src="js/leaflet.css.js"></script>
+        <script type="text/javascript" src="js/script.js"></script>
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
* The script where we will be making our map.

Almost done last few things we need to add are the things specific to this demo, the above is a pretty good general template.

```diff
<!doctype html>
<html lang="en">
  <head>
    <meta charset='utf-8'/>
        <title>
            Leaflet Demo!
        </title>
        <style>
            html { height: 100% }
            body { height: 100%; margin: 0; padding: 0;}
            #mapID{ height: 100% }
        </style>
         <!--[if lte IE 8]>
            <script src="js/ddr-ecma5-min.js"></script>
        <![endif]-->     
+       <link rel="stylesheet" href="css/gh-fork-ribbon.css" />
+    <!--[if IE]>
+        <link rel="stylesheet" href="css/gh-fork-ribbon.ie.css" />
+    <![endif]-->
    </head>
    <body>
+        <div class="github-fork-ribbon-wrapper left">
+            <div class="github-fork-ribbon"><!--from http://simonwhitaker.github.com/github-fork-ribbon-css/ -->
+                <a href="https://github.com/calvinmetcalf/leaflet.demos">Fork me on GitHub</a>
+            </div>
+        </div>
        <div id="mapID"></div>
        <script type="text/javascript" src="js/leaflet.js"></script>
        <script type="text/javascript" src="js/leaflet.css.js"></script>
+        <script type="text/javascript" src="js/leaflet.markercluster.js"></script>
+        <script type="text/javascript" src="js/leaflet.providers.js"></script>
+        <script type="text/javascript" src="js/leaflet.hash.js"></script>
+        <script type="text/javascript" src="js/d3.v3.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
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
What did add
* A fork me on github ribbon, this is a version I like as it's pure css, I usually have it on the top right, but since the layer switcher is there I changed it's class from right to left.  Yes I know the irony of writing a plug in to avoid conditional comments and then after the next step have a nest of them but in fairness that is a different conditional comment (also I added the ribbon after the fact).
* [Marker clusters](https://github.com/Leaflet/Leaflet.markercluster) probably my favorite plugin ever, it only has a small custimization to take advantage of the [leaflet.css](https://github.com/calvinmetcalf/leaflet.css) plugin we already have on the page so that it adds its own css, if you want that version you can [grab it here](https://raw.github.com/calvinmetcalf/leaflet.demos/gh-pages/js/leaflet.markercluster.js), remember requires [leaflet.css](https://github.com/calvinmetcalf/leaflet.css).
* [Providers](https://github.com/calvinmetcalf/leaflet-providers) this is my custom fork of [@seelmann's](https://github.com/seelmann) [excellence plugin](https://github.com/seelmann/leaflet-providers). It fixes some urls and allows you to pre-populate the layer control. 
* [Hash](https://github.com/calvinmetcalf/leaflet-hash) this is my rewrite from scratch in CoffeeScript of [@mlevans'](https://github.com/mlevans) [fantastic repo of the same name](https://github.com/mlevans/leaflet-hash) adds baselayers to the now customizable hash and causes the back button to work better. 
* [d3](http://d3js.org) this is one of the reasons why you are here.

[onto the javascript](https://github.com/calvinmetcalf/leaflet.demos/blob/gh-pages/blog/2-js.md)
