
var timestep = 20;
var timemult = timestep / 30;

//       NEWTONIAN MOTION

function nwtMotion(resize, start){
  this.get = function() { return start; };
  this.act =  (function two(stop, startSpeed, stopSpeed, maxSpeed, accel, decel, next){
    var slowat;
    if(decel === 0){
      slowat = stop;
    } else {
      var decrease = maxSpeed - stopSpeed;
      slowat =  stop - (start > stop ? -1 : 1) * .5 * decrease * decrease / decel;
    }
    nwtUtil(resize, (start < stop ? true : false), stop, maxSpeed, accel, decel, slowat, next)(start, (accel === 0 ? maxSpeed : startSpeed));
    var starthold = start;
    start = stop;

    //return the time it takes to finish the sweep
    return 1.3 * (timestep * Math.abs(stop - starthold) / (maxSpeed * timemult)) + ((accel === 0 ? 0 : (1 / accel)) + (decel === 0 ? 0 : (1 / decel))) * (maxSpeed * .5);
  });
}

function nwtUtil(resize, dir, stop, maxSpeed, accel, decel, slowat, next){
  return (function rec(currentPos, currentSpeed){
    var mult = (dir ? 1 : -1);
    if(currentPos * mult < stop * mult){
      if(currentPos * mult < slowat * mult){
        if(currentSpeed < maxSpeed){
          currentSpeed += accel * timemult;
          currentSpeed = Math.min(currentSpeed, maxSpeed);
        }
      } else {
        currentSpeed -= decel * timemult;
        if(currentSpeed < 0){
          currentSpeed = 0;
          currentPos = stop;
        }
      }
      resize(currentPos);
      currentPos += currentSpeed * (dir ? 1 : -1) * timemult;
      setTimeout(rec, timestep, currentPos, currentSpeed);
    } else {
      resize(stop);
      if(next !== undefined){
        next();
      }
    }
  });
}


//      UNIFORM MOTION

function ufmMotion(fader, start){
   return function(stop, time, next){
     ufmUtil(fader, time, start, stop, next)(start);
     start = stop;
   }
}

function ufmUtil(fader, total, start, stop, next){
  var mult = (start < stop ? 1 : -1);
  var step = Math.abs(start - stop) * timestep / total;
  return (function rec(current){
    if(current * mult < stop * mult){
      fader(current);
      setTimeout(rec, timestep, current + step * mult);
    } else {
      fader(stop);
      if(next !== undefined){
        next();
      }
    }
  });
}
