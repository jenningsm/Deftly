function mover(aggregate, pos){
  var stopLastMotion = null;
  aggregate(pos);

  return function(target, motion, speed, next){

    var posHold = pos;
    var x = 0;
    if(target !== pos){
      speed = speed / Math.abs(target - pos);
      function move(){
        if(x >= 1){
          pos = target;
          aggregate(target);
          riv(next);
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

      function run() { requestAnimationFrame(move) };
      function interrupt() { x = -1 };

      return { 'interrupt' : interrupt, 'run' : run };
    } else {
      return {'interrupt' : nullFunc, 'run' : next };
    }
  }
}
