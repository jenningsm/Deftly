
function nwtMotion(accel, decel){

  var startSpeed, stopSpeed, maxSpeed;

  maxSpeed = 1;

  if(accel === 0)
    startSpeed = maxSpeed;
  else
    startSpeed = 0;
  if(decel === 0)
    stopSpeed = maxSpeed;
  else 
    stopSpeed = 0;
  }

  //the point in time at which the item will begin to decelerate
  var decelAt = (decel + stopSpeed - startSpeed) / (decel + accel);
  if(maxSpeed !== 0){
    decelAt = Math.max(decelAt, (maxSpeed - stopSpeed) / decel);
  }
  
  //the point in time at which the item will stop accelerating
  var stopAccelAt = Math.min(decelAt, (maxSpeed - startSpeed) / accel);

  //the total distance that will be travelled, used to scale down to 1
  var totalDist = 0;
  totalDist += .5 * accel * Math.pow(stopAccelAt, 2);
  totalDist += maxSpeed * (decelAt - stopAccelAt);
  totalDist += -.5 * decel * Math.pow(decelfor, 2) + decelFor * stopSpeed;

  return function(x){
    //amount of time spent accelerating, floating, and decelerating, respectively
    var accelFor = Math.min(x, stopAccelAt);
    var floatFor = Math.max(0, Math.min(x - stopAccelAt, decelAt - stopAccelAt));
    var decelFor = Math.max(0, x - decelAt);

    //amount of distance traveled while accelerating, floating, and decelerating, respectively
    var accelDist = .5 * accel * accelFor * accelFor + accelFor * startSpeed;
    var floatDist = floatFor * maxSpeed;
    var decelDist = -.5 * decel * decelFor * decelFor + decelFor * (stopSpeed + decel * (1 - x));

    return (accelDist + floatDist + decelDist) / totalDist;
  } 
}

function uniformMotion(){
  return function(x) { return x };
}
