function mover(aggregate, pos){
  return function(target, motion, speed, next){
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
        } else {
          pos = posHold + (target - posHold) * motion(x);
          aggregate(pos);
          x += speed;
          requestAnimationFrame(move);
        }
      }
      requestAnimationFrame(move);
      return speed;
    } else {
      if(next !== undefined)
        next();
      return 0;
    }
  }
}
