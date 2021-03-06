
function nwtMotion(accel, decel, maxSpeed){

  var startSpeed, stopSpeed, maxSpeed;

  if(maxSpeed === undefined)
    maxSpeed = 1;

  if(accel === 0)
    startSpeed = maxSpeed;
  else
    startSpeed = 0;

  if(decel === 0)
    stopSpeed = maxSpeed;
  else 
    stopSpeed = 0;



  //the point in time at which the item will begin to decelerate
  var decelAt = (decel + stopSpeed - startSpeed) / (decel + accel);
  if(maxSpeed !== 0){
    if(decel === 0){
      decelAt = 1;
    } else {
      decelAt = Math.max(decelAt, 1 - (maxSpeed - stopSpeed) / decel);
    }
  }

  //the point in time at which the item will stop accelerating
  var stopAccelAt;
  if(accel === 0){
    stopAccelAt = 0;
  } else {
    stopAccelAt = Math.min(decelAt, (maxSpeed - startSpeed) / accel);
  }

  //the total distance that will be travelled, used to scale down to 1
  var totalDist = 0;
  totalDist += .5 * accel * Math.pow(stopAccelAt, 2);
  totalDist += maxSpeed * (decelAt - stopAccelAt);
  totalDist += ((1 - decelAt) * decel + stopSpeed)* (1 - decelAt) - .5 * decel * Math.pow(1 - decelAt, 2);

  return function(x){
    //amount of time spent accelerating, floating, and decelerating, respectively
    var accelFor = Math.min(x, stopAccelAt);
    var floatFor = Math.max(0, Math.min(x - stopAccelAt, decelAt - stopAccelAt));
    var decelFor = Math.max(0, x - decelAt);

    //amount of distance traveled while accelerating, floating, and decelerating, respectively
    var accelDist = .5 * accel * accelFor * accelFor + accelFor * startSpeed;
    var floatDist = floatFor * maxSpeed;
    var decelDist = ((1 - decelAt) * decel + stopSpeed) * decelFor - .5 * decel * Math.pow(decelFor, 2); 

    return (accelDist + floatDist + decelDist) / totalDist;
  } 
}

function uniformMotion(){
  return function(x) { return x };
}
