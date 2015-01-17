
function banners(display){
  var headpos = shift(document.getElementById("header"), true, true);
  var tailpos = shift(document.getElementById("footer"), false, true);

  var ret = function(x) { headpos(x); tailpos(x); };
  ret(display ? 1 : 0);
  return ret;
}


//this one is out of place in that is creates rather than just returning
function display(url){
  var spot = document.getElementById("sketchspot"); 
  spot.style.opacity = 0;
  spot.style.display = "inline";
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);

  return function(x){
    spot.style.opacity = x;
  }
}

//this is out of place as well
function closeDisplay(next){
  document.getElementById("sketchspot").removeChild(document.getElementById("displayframe"));
  if(next !== undefined){
    next();
  }
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
