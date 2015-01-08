
function sequence(functions){
  if(functions.length != 0){
    functions[0](partial(sequence, functions.slice(1)));
  }
}


function fullSweep(maxSpeed, accel){
  return function(dir, next){
    this.sweep((dir ? 1 : 0), (dir ? maxSpeed : 0), (dir ? 0 : maxSpeed), maxSpeed, accel, accel, next);
  }
}

function sweep(start){
  return function(stop, startSpeed, stopSpeed, maxSpeed, accel, decel, next){
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
    sweepUtil(this, (start < stop ? true : false), stop, maxSpeed, accel, decel, start, (accel === 0 ? maxSpeed : startSpeed), slowat, next);
    this.sweep = sweep(stop);
  }
}

function sweepUtil(element, dir, stop, maxSpeed, accel, decel, currentPos, currentSpeed, slowat, next){
  var mult = (dir ? 1 : -1);
  if(currentPos * mult < stop * mult){
    element.resize(currentPos);
    currentPos += currentSpeed * (dir ? 1 : -1);
    if(currentPos * mult < slowat * mult){
      if(Math.abs(currentSpeed) < maxSpeed){
        currentSpeed += accel;
      }
    } else {
      currentSpeed -= decel;
      if(currentSpeed < 0){
        currentSpeed = 0;
        currentPos = stop;
      }
    }
    setTimeout(sweepUtil, 30, element, dir, stop, maxSpeed, accel, decel, currentPos, currentSpeed, slowat, next);
  } else {
    element.resize(stop);
    next();
  }
}
