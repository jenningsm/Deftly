
var Element;

Element.fullSweep = function(dir, maxSpeed, accel, next){
  sweep((dir ? 0 : 1), (dir ? 1 : 0), (dir ? maxSpeed : 0), (dir ? 0 : maxSpeed), maxSpeed, accel, accel, next);
}

Element.sweep = function(start, stop, startSpeed, stopSpeed, maxSpeed, accel, decel, next){
  var slowat;
  if(decel === 0){
    slowat = stop;
  } else {
    var decrease = maxSpeed - stopSpeed;
    slowat =  stop - (start > stop ? -1 : 1) * .5 * decrease * decrease / decel;
  }
  sweepUtil((start < stop ? true : false), stop, maxSpeed, accel, decel, start, (accel === 0 ? maxSpeed : startSpeed), slowat, next);
}

Element.sweepUtil = function(dir, stop, maxSpeed, accel, decel, currentPos, currentSpeed, slowat, next){
  var mult = (dir ? 1 : -1);
  if(currentPos * mult < stop * mult){
    this.resize(currentPos);
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
    setTimeout(sweepUtil, 30, dir, stop, maxSpeed, accel, decel, currentPos, currentSpeed, slowat, next);
  } else {
    this.resize(stop);
    if(next.length > 0){
      next[0](next.shift());
    }
  }
}
