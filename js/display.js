
var sketchMap = {"tranquility" : "uncontext1.html", "electrodynamics" : "uncontext2.html"};

/* load display sequence:
 
   first, the html is loaded and the function beginSketch is returned

   beginSketch is called once the banners are in place. beginSketch actually begins
   the computation for the sketches

   once the initial setup computation is finished, the sketch iframes send a message to
   the parent. Once this message is recieved, the sketch is faded in
*/

function loadDisplay(sketch){
  var spot = document.getElementById("sketchspot"); 
  spot.style.opacity = 0;
  spot.style.display = "inline";
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "sketches/" +  sketchMap[sketch]);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);


  function beginSketch(next){

    function sketchLoaded(e){
      if(e.data === sketch){
        window.removeEventListener("message", sketchLoaded);
        next();
      }
    }
    window.addEventListener("message", sketchLoaded);

    var w = iframe.contentWindow || iframe;
    w.postMessage("begin", "*"); 
  }

  return beginSketch;
}

function removeDisplay(next){
  document.getElementById("sketchspot").removeChild(document.getElementById("displayframe"));
  if(next !== undefined){
    next();
  }
}
