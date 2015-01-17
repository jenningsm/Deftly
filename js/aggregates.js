
function banners(display){
  var headpos = shift(document.getElementById("header"), true, true);
  var tailpos = shift(document.getElementById("footer"), false, true);

  var ret = function(x) { headpos(x); tailpos(x); };
  ret(display ? 1 : 0);
  return ret;
}

function display(display){
  var ret = opacity(document.getElementById("sketchspot"));
  ret(display ? 1 : 0);
  return ret;
}

function fullPage(page, display){

  var page  = document.getElementById(page);
  var border  = document.getElementById("borderbox");
  
  var c = clip(page, true, page.offsetWidth, page.offsetHeight);
  var s = scale(border, true);
  var f = sidefade(page);

  var ret = function(x) { c(x); s(x); f(x); };
  ret(display ? 1 : 0);
  return ret;

}

function menuBar(display){
  var bar = document.getElementById("menubar");
  var border = document.getElementById("menuborder");
  var c = clip(bar, false, bar.offsetWidth, bar.offsetHeight);
  var s = scale(border, false);

  var ret = function(x) { s(x); c(x); };
  ret(display ? 1 : 0);
  return ret;
}
