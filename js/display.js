
function loadDisplay(url){
  var spot = document.getElementById("sketchspot"); 
  spot.style.opacity = 0;
  spot.style.display = "inline";
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);
}

function removeDisplay(next){
  document.getElementById("sketchspot").removeChild(document.getElementById("displayframe"));
  if(next !== undefined){
    next();
  }
}
