
function mover(shift){


  return function(from, to, scale, startSpeed, stopSpeed, maxSpeed, accel, decel, next){

    //the point in time at which the item will begin to decelerate
    var decelAt = Math.max((decel + stopSpeed - startSpeed) / (decel + accel), (maxSpeed - stopSpeed) / decel);
    
    //the point in time at which the item will stop accelerating
    var stopAccelAt = Math.min(decelAt, (maxSpeed - startSpeed) / accel);

    function m(x){
      //amount of time spent accelerating, floating, and decelerating, respectively
      var accelFor = Math.min(x, stopAccelAt);
      var floatFor = Math.max(0, Math.min(x - stopAccelAt, decelAt - stopAccelAt));
      var decelFor = Math.max(0, x - decelAt);

      //amount of distance traveled while accelerating, floating, and decelerating, respectively
      var accelDist = .5 * accel * accelFor * accelFor + accelFor * startSpeed;
      var floatDist = floatFor * maxSpeed;
      var decelDist = -.5 * decel * decelFor * decelFor + decelFor * (stopSpeed + decel * (1 - x));

      shift(accelDist + floatDist + decelDist);
    } 
  }
}
