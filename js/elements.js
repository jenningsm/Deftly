
function clip(element, orientation, width, height){
  return function(x) {
     var left = (orientation ? width * (1 - x) / 2 : 0);
     var right = (orientation ? width * x + left : width);
     var tp = (orientation ? 0 : height * (1 - x) / 2);
     var bottom = (orientation ? height : height * x + tp);
     element.style.clip = "rect(" + tp + "px, " + right + "px, " + bottom + "px, " + left + ")";
  }
}

function fade(element){
  return function(x){
    element.style.opacity = x * 1.5;
  }
}

function scaleBorder(border, orientation){
  return function(x) {
     border.style.transform = "scale(" + (orientation ? x : 1) + ", " + (orientation ? 1 : x) + ")";
  }
}

function shift(element, shiftdir, orientation){
   return function(x) {
     var shift = (((1 - x) * 100) * (shiftdir ? -1 : 1));
     element.style.transform = "translate(" + (orientation ? "0%" : shift + "%") + ", " + (orientation ? shift + "%" : "0%") + ")";
   }
}

/*--------------------------------------------------------------------------------------------*/

function Banners(display){

  var headpos = shift(document.getElementById("header"), true, true);
  var tailpos = shift(document.getElementById("footer"), false, true);

  this.resize = function(x) { headpos(x); tailpos(x); };

  this.sweep = sweep(display ? 1 : 0);
  this.toggle = fullSweep(.06, .002);

  this.resize(display ? 1 : 0);
}

function DisplayCanvas(display){

  this.toggle = function(dir, next){
    var spot = document.getElementById("sketchspot"); 
    spot.style.display = "inline";
    var iframe = document.createElement("iframe");
    var isrc = document.createAttribute("src");
    isrc.value = "../uncontext1.html";
    var frameid = document.createAttribute("id");
    frameid.value = "displayframe";
    iframe.setAttributeNode(isrc);
    iframe.setAttributeNode(frameid);
    spot.appendChild(iframe);
  }
}

function FullPage(page, display){

  var page  = document.getElementById(page);
  var border  = document.getElementById("borderbox");
  
  var c = clip(page, true, page.offsetWidth, page.offsetHeight);
  var s = scaleBorder(border, true);
  var f = fade(page);

  this.resize = function(x) { c(x); s(x); f(x); };
  this.sweep = sweep(display ? 1 : 0);
  this.toggle = fullSweep(.04, .002);

  this.resize(display ? 1 : 0);
}

function MenuBar(display){
  var bar = document.getElementById("menubar");
  var border = document.getElementById("menuborder");
  var c = clip(bar, false, bar.offsetWidth, bar.offsetHeight);
  var s = scaleBorder(border, false);

  this.resize = function(x) { s(x); c(x); };


  this.sweep = sweep(display ? 1 : 0);
  this.toggle = fullSweep(.12, .008);

  this.resize(display ? 1 : 0);
}
