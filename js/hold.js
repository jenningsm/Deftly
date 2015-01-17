
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
