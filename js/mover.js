function mover(aggregate, pos){
  var stopLastMotion = null;

  return function(target, motion, speed, next){

    if(stopLastMotion !== null){
      stopLastMotion();
    }
    stopLastMotion = function(){
      x = -1;
    }
    var posHold = pos;
    var x = 0;
    if(target !== pos){
      speed = speed / Math.abs(target - pos);
      function move(){
        if(x >= 1){
          pos = target;
          aggregate(target);
          if(next !== undefined)
            next();
        } else if (x >= 0) {
          pos = posHold + (target - posHold) * motion(x);
          aggregate(pos);
          x += speed;
          requestAnimationFrame(move);
        } else {
          if(validFunc(next))
            next(1);
        }
      }
      requestAnimationFrame(move);
//      return speed;
    } else {
      if(next !== undefined)
        next();
//      return 0;
    }
  }
}
