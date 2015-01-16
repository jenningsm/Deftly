
var timestep = 17;
var timemult = timestep / 30;

function sequence(functions){
  if(functions.length != 0){
    functions[0](partial(sequence, functions.slice(1)));
  }
}

function fullSweep(swp, maxSpeed, accel){
  return function(dir, next){
      swp((dir ? 1 : 0), (dir ? maxSpeed : 0), (dir ? 0 : maxSpeed), maxSpeed, accel, accel, next);
  }
}

function sweep(resize, start){
  return (function two(stop, startSpeed, stopSpeed, maxSpeed, accel, decel, next){
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
    sweepUtil(resize, (start < stop ? true : false), stop, maxSpeed, accel, decel, slowat, next)(start, (accel === 0 ? maxSpeed : startSpeed));
    start = stop;
  });
}

function sweepUtil(resize, dir, stop, maxSpeed, accel, decel, slowat, next){
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

function fade(fader, total){
   return function(dir){
     fadeUtil(fader, total, dir)(0);
   }
}

function fadeUtil(fader, total, dir){
  return (function rec(current){
    if(current <= total){
      fader((dir ? current : total - current) / total);
      setTimeout(rec, 30, current + 30);
    } else {
      fader(dir ? 1 : 0);
    }
  });
}
