

var sketchesBegun = {"tranquility" : false, "electrodynamics" : false};

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
  spot.style.display = "block";
  var iframe = document.createElement("iframe");

  var iframeloaded = false;
  iframe.addEventListener('load', function() { iframeloaded = true });

  iframe.setAttribute("src", "sketches/" +  sketchMap[sketch]);
  iframe.setAttribute("id", "displayframe");
  spot.appendChild(iframe);

  var cancelled = false;

  function beginSketch(next){

    stopSpinner = spinner(true, .05);

    function run(){
      function sketchLoaded(e){
        if(e.data === sketch){
          window.removeEventListener("message", sketchLoaded);
          sketchesBegun[sketch] = false;
          if(stopSpinner !== null){
            stopSpinner(.05, next).run();
            stopSpinner = null;
          }
        }
      }
  
  
      function begin(){
        var w = iframe.contentWindow || iframe;
        if(w.postMessage && !cancelled){      
          window.addEventListener("message", sketchLoaded);
          sketchesBegun[sketch] = true;
          w.postMessage("begin", "*");
        } else if(!cancelled){
          stopSpinner(.05, function() { next(1) }).run();
        }
      }
  
      if(iframeloaded){
        begin();
      } else {
        iframe.addEventListener('load', begin);
      }
    }

    function interrupt() {
      cancelled = true;
      if(stopSpinner !==  null){
        var a = stopSpinner;
        stopSpinner = null;
        a(.05, function() { next(1) }).run();
      } else {
        next(1);
      }
    }

    return {'interrupt' : interrupt, 'run' : run };
  }

  return beginSketch;
}

function removeDisplay(next){
  function run() { document.getElementById("sketchspot").removeChild(document.getElementById("displayframe")); next() }
  return {'interrupt' : nullFunc, 'run' : run };
}
