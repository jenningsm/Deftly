
function fullFade(fd, time){
  return function(dir, next){
    fd((dir ? 1 : 0), time, next);
  }
}


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

function displayHandle(disp, time){
  var dir = true;
  var fd = fullFade(disp, 600);
  return (function ret(next){
    if(!dir){
      next = function() { sequence([closeDisplay, next]);};
    }
    fd(dir, next);
    dir = !dir;
  });
}
