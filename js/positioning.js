function clip(element, orientation, width, height){
  return function(x) {
     var left = (orientation ? width * (1 - x) / 2 : 0);
     var right = (orientation ? width * x + left : width);
     var tp = (orientation ? 0 : height * (1 - x) / 2);
     var bottom = (orientation ? height : height * x + tp);
     element.style.clip = "rect(" + tp + "px, " + right + "px, " + bottom + "px, " + left + ")";
  }
}

function sidefade(element){
  return function(x){
    element.style.opacity = x * 1.5;
  }
}

function scaleBorder(border, orientation){
  return function(x) {
     border.style.transform = "scale(" + (orientation ? x : 1) + ", " + (orientation ? 1 : x) + ")";
  }
}

function shift(element, shiftdir, orientation){
   return function(x) {
     var shift = (((1 - x) * 100) * (shiftdir ? -1 : 1));
     element.style.transform = "translate(" + (orientation ? "0%" : shift + "%") + ", " + (orientation ? shift + "%" : "0%") + ")";
   }
}

