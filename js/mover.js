function mover(aggregate, pos){
  var stopLastMotion = null;
  aggregate(pos);

  return function(target, motion, speed, next){

    var interruptReturn = null;
    var done = false;

    var posHold = pos;
    var x = 0;

    if(target !== pos){
      speed = speed / Math.abs(target - pos);
      function move(){
        if(interruptReturn === null){
          if(x >= 1){
            pos = target;
            aggregate(target);
            done = true;
            riv(next);
          } else if (x >= 0) {
            pos = posHold + (target - posHold) * motion(x);
            aggregate(pos);
            x += speed;
            requestAnimationFrame(move);
          }
        } else {
          interruptReturn();
        }
      }
      requestAnimationFrame(move);
    } else {
       done = true;
       riv(next);
    }

    return function(n){
      if(done){
        n();
      } else {
        interruptReturn = n;
      }
    }
  }
}
