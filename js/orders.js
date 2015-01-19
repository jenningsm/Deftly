
var timestep = 17;
var timemult = timestep / 30;

//       NEWTONIAN MOTION

function nwtMotion(resize, start){
  return (function two(stop, startSpeed, stopSpeed, maxSpeed, accel, decel, next){
    /* an attempt to deal with acceleration issues; isn't working
    var h = stopSpeed / decel;
    var r = Math.sqrt(((2 * (Math.abs(stop - start)) * accel - stopSpeed * stopSpeed - startSpeed * startSpeed) / (decel * (accel + decel))) + (h * h)) - h;
    var t = (stopSpeed + decel * r - startSpeed) / accel;
    if(startSpeed + t * accel < maxSpeed){
      maxSpeed = t * accel + startSpeed;
    }*/


    var slowat;
    if(decel === 0){
      slowat = stop;
    } else {
      var decrease = maxSpeed - stopSpeed;
      slowat =  stop - (start > stop ? -1 : 1) * .5 * decrease * decrease / decel;
    }
  /* this put in handle the case when the max speed is not reached (slowat needs to be different in such a case) but it currently does not work  
     the equation i used to calculate altslow assumes that startSpeed and stopSpeed are 0, which, obviously, is not always the case
  
    var mult = (start < stop ? 1 : -1);
    var altslow = start + mult * decel * Math.abs(start - stop) / (decel + accel);
    if(accel != 0 && altslow * mult > slowat * mult){
      console.log(accel);
      console.log(decel);
      //slowat = altslow;
    }*/
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
