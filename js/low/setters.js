
function displayHandler(element){
  var last = -1;

  return function(x){
    if(last !== 0 && x === 0){
      element.style.display = 'none';
    } else if((last === 0 || last === -1) && x !== 0){
      element.style.display = 'block';
    }
    last = x;
  }
}

function clip(element, orientation){
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  var currentClip = null;

  var d = displayHandler(element);

  function clipit(x) {
     currentClip = x;
     var left = (orientation ? width * (1 - x) / 2 : 0);
     var right = (orientation ? width * x + left : width);
     var tp = (orientation ? 0 : height * (1 - x) / 2);
     var bottom = (orientation ? height : height * x + tp);
     element.style.clip = "rect(" + tp + "px, " + right + "px, " + bottom + "px, " + left + ")";

     d(x);
  }

  function onResize(){
    width = element.offsetWidth;
    height = element.offsetHeight;
    clipit(currentClip);
  }

  window.addEventListener('resize', onResize);

  return clipit;

}

function opacity(element, display){
  var d = displayHandler(element);
  return function(x){
    element.style.opacity = x;
    d(x);
  }
}

function scale(element, orientation){
  var d = displayHandler(element);
  return function(x) {
     element.style.transform = "scale3d(" + (orientation ? x : 1) + ", " + (orientation ? 1 : x) + ", 1)";
     d(x);
  }
}

function shift(element, shiftdir, orientation){
   var d = displayHandler(element);
   return function(x) {
     var shift = (((1 - x) * 100) * (shiftdir ? -1 : 1));
     element.style.transform = "translate3d(" + (orientation ? "0%" : shift + "%") + ", " + (orientation ? shift + "%" : "0%") + ", 0)";
     d(x);
   }
}

