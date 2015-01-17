

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


//this should not be in here as it explicitly references ufmMotion

function sweepDisplay(swp, time){
  var fading;
  return function(dir, next){
    if(dir){
      fading = ufmMotion(swp, time);
      fading(dir, next);
    } else {
      fading(dir, partial(closeDisplay, next));
    }
  }
}

