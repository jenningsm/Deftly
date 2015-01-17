

function fullSweep(swp, maxSpeed, accel){
  return function(dir, next){
      return swp((dir ? 1 : 0), (dir ? maxSpeed : 0), (dir ? 0 : maxSpeed), maxSpeed, accel, accel, next);
  }
}

function partSweep(swp, maxSpeed, accel){
  return function(stop, next){
      return swp(stop, 0, 0, maxSpeed, accel, accel, next);
  }
}


function sweepDisplay(swp, time){
  var fading;
  return function(dir, next){
    if(dir){
      fading = fade(swp, time);
      fading(dir, next);
    } else {
      fading(dir, partial(closeDisplay, next));
    }
  }
}

