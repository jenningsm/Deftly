
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};


function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

function oneTimeListener(target, type, callback){
  function oneTimeCallback(e){
    target.removeEventListener(type, oneTimeCallback);
    callback(e);
  }
  target.addEventListener(type, oneTimeCallback);
}

function validFunc(func){
  return (func !== null && func !== undefined);
}

function riv(func, next){
  if(validFunc(func))
    func(next);
  else if(validFunc(next))
    next();
}

function sequence(functions, chaincb, s){
  if(functions.length !== 0 && validFunc(functions[0]) && s !== 1){
      functions[0](partial(sequence, functions.slice(1), chaincb));
  } else if(validFunc(chaincb)){
      chaincb(0);
  }
}
