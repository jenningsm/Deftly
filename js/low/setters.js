
function displayHandler(){
  var last = -1;

  return function(x){
    var display = null;
    if(last !== 0 && x === 0){
      display = 'none';
    } else if((last === 0 || last === -1) && x !== 0){
      display = 'block';
    }
    last = x;
    return display;
  }
}

function clip(element, orientation){
  var currentClip = null;
  var resized = false;
  var display = null;
  var d = displayHandler();

  var width;
  var height;
  function getDimensions(){
    width = element.offsetWidth;
    height = element.offsetHeight;
  }
  getDimensions();


  function clipit(x) {

     var a = d(x);
     if(a !== null){
       display = a;
       element.style.display = a;
       if(a !== 'none' && resized){
         getDimensions();
         resized = false;
       }
     }

     currentClip = x;
     var left = (orientation ? width * (1 - x) / 2 : 0);
     var right = (orientation ? width * x + left : width);
     var tp = (orientation ? 0 : height * (1 - x) / 2);
     var bottom = (orientation ? height : height * x + tp);
     element.style.clip = "rect(" + tp + "px, " + right + "px, " + bottom + "px, " + left + ")";

  }


  function onResize(){
    if(display === 'none'){
      resized = true;
    } else {
      getDimensions();
      clipit(currentClip);
    }
  }
  window.addEventListener('resize', onResize);

  return clipit;

}

function opacity(element, display){
  var d = displayHandler();
  return function(x){
    element.style.opacity = x;
    var a = d(x);
    if(a !== null){
      element.style.display = a;
    }
  }
}

function scale(element, orientation){
  var d = displayHandler();
  return function(x) {
     element.style.transform = "scale3d(" + (orientation ? x : 1) + ", " + (orientation ? 1 : x) + ", 1)";
     var a = d(x);
     if(a !== null){
       element.style.display = a;
     }
  }
}

function shift(element, shiftdir, orientation){
   var d = displayHandler();
   return function(x) {
     var shift = (((1 - x) * 100) * (shiftdir ? -1 : 1));
     element.style.transform = "translate3d(" + (orientation ? "0%" : shift + "%") + ", " + (orientation ? shift + "%" : "0%") + ", 0)";
     var a = d(x);
     if(a !== null){
       element.style.display = a;
     }
   }
}

