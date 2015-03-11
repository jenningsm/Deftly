
function banners(){
  var headpos = shift(document.getElementById("header"), true, true);
  var tailpos = shift(document.getElementById("footer"), false, true);

  return function(x) { headpos(x); tailpos(x); };
}

function display(){
  return opacity(document.getElementById("sketchspot"));
}

function fullPage(pg){

  var page  = document.getElementById(pg);
  var border  = document.getElementById("borderbox");
 
  var c = clip(page, true);
  var s = scale(border, true);
  var f = sidefade(page);

  return function(x) { c(x); s(x); f(x); };

}

function menuBar(){
  var bar = document.getElementById("menubar");
  var border = document.getElementById("menuborder");
  var c = clip(bar, false);
  var s = scale(border, false);

  return function(x) { s(x); c(x); };
}
