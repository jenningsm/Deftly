function mover(aggregate, pos){
  return function(target, motion, speed, next){
    var posHold = pos;
    var x = 0;
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
  }
}
