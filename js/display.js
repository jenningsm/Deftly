
var sketchMap = {"tranquility" : "uncontext1.html", "electrodynamics" : "uncontext2.html"};

function loadDisplay(sketch, next){
  var spot = document.getElementById("sketchspot"); 
  spot.style.opacity = 0;
  spot.style.display = "inline";
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", sketchMap[sketch]);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);

  function tranquilityLoaded(e){
    if(e.data === sketch){
      window.removeEventListener("message", tranquilityLoaded);
      next();
    }
  }

  window.addEventListener("message", tranquilityLoaded);
}

function removeDisplay(next){
  document.getElementById("sketchspot").removeChild(document.getElementById("displayframe"));
  if(next !== undefined){
    next();
  }
}
