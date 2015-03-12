var spinElement = document.getElementById("spinner");

var spinFader = mover(opacity(spinElement), 0);

function spinner(shadow, speed, next){
  if(shadow){
    spinElement.className = "with-shadow";
  } else {
    spinElement.className = "";
  }

  var interrupt = spinFader(1, uniformMotion(), speed, next);

  return function(speed, n){
    var seq = [];
    interrupt(function() { spinFader(0, uniformMotion(), speed, n) });
  }
}
