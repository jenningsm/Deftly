var spinElement = document.getElementById("spinner");

var spinFader = mover(opacity(spinElement), 0);

function spinner(shadow, speed, next){
  if(shadow){
    spinElement.className = "with-shadow";
  } else {
    spinElement.className = "";
  }

  //if a spinner gets interrupted, we don't want to interupt the chain of actions
  // hence the last argument passed to the following function
  spinFader(1, uniformMotion(), speed, function() { if(validFunc(next)) { next(0) } });

  return function(speed, n){
    //if a spinner gets interrupted, we don't want to interupt the chain of actions
    // hence the last argument passed to the following function
    spinFader(0, uniformMotion(), speed, function(){ if(validFunc(n)) { n(0) } });
  }
}
