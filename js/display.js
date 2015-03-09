
var sketchMap = {"tranquility" : "uncontext1.html", "electrodynamics" : "uncontext2.html"};

/* load display sequence:
 
   first, the html is loaded and the function beginSketch is returned

   beginSketch is called once the banners are in place. beginSketch actually begins
   the computation for the sketches

   once the initial setup computation is finished, the sketch iframes send a message to
   the parent. Once this message is recieved, the sketch is faded in
*/

var stopSpinner = null;

function loadDisplay(sketch){
  var spot = document.getElementById("sketchspot"); 
  spot.style.opacity = 0;
  spot.style.display = "inline";
  var iframe = document.createElement("iframe");

  var iframeloaded = false;
  iframe.addEventListener('load', function() { iframeloaded = true });

  iframe.setAttribute("src", "sketches/" +  sketchMap[sketch]);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);

  function beginSketch(next){

    stopSpinner = spinner(true, .05);

    function sketchLoaded(e){
      if(e.data === sketch){
        window.removeEventListener("message", sketchLoaded);
        stopSpinner(.05, next);
      }
    }

    var w = iframe.contentWindow || iframe;
    if(w.postMessage){
      function begin(){
        window.addEventListener("message", sketchLoaded);
        w.postMessage("begin", "*");
      }
      if(iframeloaded){
        begin();
      } else {
        iframe.addEventListener('load', begin);
      }
    } else {
      stopSpinner(.05, function() { next(1) });
    }
 //   setTimeout(function() { w.postMessage("begin", "*"); }, 2000);
  }

  return beginSketch;
}

function removeDisplay(next){
  document.getElementById("sketchspot").removeChild(document.getElementById("displayframe"));
  if(stopSpinner != null){
    stopSpinner(.05, next);
    stopSpinner = null;
  } else {
    next(0);
  }
}
