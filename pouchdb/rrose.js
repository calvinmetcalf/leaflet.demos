/*
  Copyright (c) 2012 Eric S. Theise
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
  documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
  persons to whom the Software is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
  Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
    
L.Rrose = L.Popup.extend({

  _initLayout:function () {
    var prefix = 'leaflet-rrose',
      container = this._container = L.DomUtil.create('div', prefix + ' ' + this.options.className + ' leaflet-zoom-animated'),
      closeButton, wrapper;

    if (this.options.closeButton) {
      closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
      closeButton.href = '#close';
      closeButton.innerHTML = '&#215;';

      L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
    }

    // Set the pixel distances from the map edges at which popups are too close and need to be re-oriented.
    var x_bound = 80, y_bound = 160;
    // Determine the alternate direction to pop up; north mimics Leaflet's default behavior, so we initialize to that.
    this.options.position = 'n';
    // Then see if the point is too far north...
    var y_diff = y_bound - this._map.latLngToContainerPoint(this._latlng).y;
    if (y_diff > 0) {
      this.options.position = 's'
    }
    // or too far east...
    var x_diff = this._map.latLngToContainerPoint(this._latlng).x - (this._map.getSize().x - x_bound);
    if (x_diff > 0) {
      this.options.position += 'w'
    } else {
    // or too far west.
      x_diff = x_bound - this._map.latLngToContainerPoint(this._latlng).x;
      if (x_diff > 0) {
        this.options.position += 'e'
      }
    }
    // If it's too far in both dimensions, determine which predominates. e.g., turn 'nw' into either 'nnw' or 'wnw'.
    if (this.options.position.length === 2) {
      (y_diff > x_diff) ? 
        this.options.position = this.options.position.charAt(0) + this.options.position :
        this.options.position = this.options.position.charAt(1) + this.options.position;
    }

    // Create the necessary DOM elements in the correct order. Pure 'n' and 's' conditions need only one class for styling, others need two.
    if (/s/.test(this.options.position)) {
      if (this.options.position === 's') {
        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
        wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
        L.DomUtil.addClass(closeButton,prefix + '-close-button-s');
      } 
      else {
        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container' + ' ' + prefix + '-tip-container-' + this.options.position, container);
        wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper' + ' ' + prefix + '-content-wrapper-' + this.options.position, container);
      }
      this._tip = L.DomUtil.create('div', prefix + '-tip' + ' ' + prefix + '-tip-' + this.options.position, this._tipContainer);
      L.DomEvent.disableClickPropagation(wrapper);
      this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
      L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
    } 
    else {
      if (this.options.position === 'n') {
        wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
      } 
      else {
        wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper' + ' ' + prefix + '-content-wrapper-' + this.options.position, container);
        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container' + ' ' + prefix + '-tip-container-' + this.options.position, container);
      }
      L.DomEvent.disableClickPropagation(wrapper);
      this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
      L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
      this._tip = L.DomUtil.create('div', prefix + '-tip' + ' ' + prefix + '-tip-' + this.options.position, this._tipContainer);
    }

  },

  _updatePosition:function () {
    var pos = this._map.latLngToLayerPoint(this._latlng),
      is3d = L.Browser.any3d,
      offset = this.options.offset;

    if (is3d) {
      L.DomUtil.setPosition(this._container, pos);
    }

    if (/s/.test(this.options.position)) {
      this._containerBottom = -this._container.offsetHeight + offset.y - (is3d ? 0 : pos.y);
    } else {
      this._containerBottom = -offset.y - (is3d ? 0 : pos.y);
    }

    if (/e/.test(this.options.position)) {
      this._containerLeft = offset.x + (is3d ? 0 : pos.x);
    } 
    else if (/w/.test(this.options.position)) {
      this._containerLeft = -Math.round(this._containerWidth) + offset.x + (is3d ? 0 : pos.x);
    } 
    else {
      this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (is3d ? 0 : pos.x);
    }

    this._container.style.bottom = this._containerBottom + 'px';
    this._container.style.left = this._containerLeft + 'px';
  }

});
L.rrose = function (options, source) {
    return new L.Rrose(options, source);
};


(function(){
var rcss;

rcss = [];

rcss.push("/* Rrose layout */\n\n.leaflet-rrose {\n    position: absolute;\n    text-align: center;\n}\n\n.leaflet-rrose-content-wrapper {\n    padding: 1px;\n    text-align: left;\n}\n\n.leaflet-rrose-content {\n    margin: 14px 20px;\n}\n\n.leaflet-rrose-tip-container {\n    margin: 0 auto;\n    width: 40px;\n    height: 20px;\n    position: relative;\n    overflow: hidden;\n}\n\n.leaflet-rrose-tip-container-sse, .leaflet-rrose-tip-container-ese,\n.leaflet-rrose-tip-container-nne, .leaflet-rrose-tip-container-ene,\n.leaflet-rrose-tip-container-e {\n    margin-left: 0px;\n}\n\n.leaflet-rrose-tip-container-ssw, .leaflet-rrose-tip-container-wsw,\n.leaflet-rrose-tip-container-nnw, .leaflet-rrose-tip-container-wnw,\n.leaflet-rrose-tip-container-w {\n    margin-right: 0px;\n}\n\n.leaflet-rrose-tip {\n    width: 15px;\n    height: 15px;\n    padding: 1px;\n\n    -moz-transform: rotate(45deg);\n    -webkit-transform: rotate(45deg);\n    -ms-transform: rotate(45deg);\n    -o-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.leaflet-rrose-tip-n {\n    margin: -8px auto 0;\n}\n\n.leaflet-rrose-tip-s {\n    margin: 11px auto 0;\n}\n\n.leaflet-rrose-tip-sse, .leaflet-rrose-tip-ese {\n    margin: 11px 11px 11px -8px; overflow: hidden;\n}\n\n.leaflet-rrose-tip-ssw, .leaflet-rrose-tip-wsw {\n    margin: 11px 11px 11px 32px; overflow: hidden;\n}\n\n.leaflet-rrose-tip-nne, .leaflet-rrose-tip-ene, .leaflet-rrose-tip-e {\n    margin: -8px 11px 11px -8px; overflow: hidden;\n}\n\n.leaflet-rrose-tip-nnw, .leaflet-rrose-tip-wnw, .leaflet-rrose-tip-w {\n    margin: -8px 11px 11px 32px; overflow: hidden;\n}\n\na.leaflet-rrose-close-button {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 4px 5px 0 0;\n    text-align: center;\n    width: 18px;\n    height: 14px;\n    font: 16px/14px Tahoma, Verdana, sans-serif;\n    color: #c3c3c3;\n    text-decoration: none;\n    font-weight: bold;\n}\n\na.leaflet-rrose-close-button:hover {\n    color: #999;\n}\n\n.leaflet-rrose-content p {\n    margin: 18px 0;\n}\n\n.leaflet-rrose-scrolled {\n    overflow: auto;\n    border-bottom: 1px solid #ddd;\n    border-top: 1px solid #ddd;\n}\n\n/* Visual appearance */\n\n.leaflet-rrose-content-wrapper, .leaflet-rrose-tip {\n    background: white;\n\n    box-shadow: 0 3px 10px #888;\n    -moz-box-shadow: 0 3px 10px #888;\n    -webkit-box-shadow: 0 3px 14px #999;\n}\n\n.leaflet-rrose-content-wrapper {\n    -moz-border-radius:    20px;\n    -webkit-border-radius: 20px;\n    border-radius:         20px;\n}\n\n.leaflet-rrose-content-wrapper-sse, .leaflet-rrose-content-wrapper-ese {\n    -moz-border-radius:    0px 20px 20px 20px;\n    -webkit-border-radius: 0px 20px 20px 20px;\n    border-radius:         0px 20px 20px 20px;\n}\n\n.leaflet-rrose-content-wrapper-ssw, .leaflet-rrose-content-wrapper-wsw {\n    -moz-border-radius:    20px 0px 20px 20px;\n    -webkit-border-radius: 20px 0px 20px 20px;\n    border-radius:         20px 0px 20px 20px;\n}\n\n.leaflet-rrose-content-wrapper-nnw, .leaflet-rrose-content-wrapper-wnw, .leaflet-rrose-content-wrapper-w {\n    -moz-border-radius:    20px 20px 0px 20px;\n    -webkit-border-radius: 20px 20px 0px 20px;\n    border-radius:         20px 20px 0px 20px;\n}\n\n.leaflet-rrose-content-wrapper-nne, .leaflet-rrose-content-wrapper-ene, .leaflet-rrose-content-wrapper-e {\n    -moz-border-radius:    20px 20px 20px 0px;\n    -webkit-border-radius: 20px 20px 20px 0px;\n    border-radius:         20px 20px 20px 0px;\n}\n\n.leaflet-rrose-content {\n    font: 12px/1.4 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n}\na.leaflet-rrose-close-button-s {\ntop : 20px;\n}");

rcss.push(".leaflet-rrose-tip {\nwidth: 21px;\n_width: 27px;\nmargin: 0 auto;\n_margin-top: -3px;\n\nfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n\noverflow: visible;\n}\n\n.leaflet-rrose-tip-s {\n_margin-top: 0px;\n\nfilter: \n    progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\n    progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n}\n\n.leaflet-rrose-tip-sse, .leaflet-rrose-tip-ese {\n_margin-top: -8px;\n_margin-left: auto;\n_padding: 10px;\n\nfilter:\n  progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\n  progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=0);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n}\n\n.leaflet-rrose-tip-ssw, .leaflet-rrose-tip-wsw {\n_margin-top: -8px;\n_margin-left: auto;\n_padding: 10px;\n\nfilter:\n    progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\n    progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n}\n\n.leaflet-rrose-tip-nne, .leaflet-rrose-tip-ene, .leaflet-rrose-tip-e {\n_margin-top: -12px;\n_margin-left: auto;\n_padding: 10px;\n\nfilter:\n    progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\n    progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n}\n\n.leaflet-rrose-tip-nnw, .leaflet-rrose-tip-wnw, .leaflet-rrose-tip-w {\n_margin-top: -12px;\n_margin-left: auto;\n_padding: 10px;\n\nfilter:\n    progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\n    progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=0);\n-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";}\n\n.leaflet-rrose-tip-container {\nmargin-top: -1px;\n}\n\n.leaflet-rrose-content-wrapper, .leaflet-rrose-tip {\nborder: 1px solid #bbb;\n}\n");
L.css(rcss);
})()