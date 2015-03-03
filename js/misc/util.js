
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

function sequence(functions){
  if(functions.length != 0 && functions[0] !== null && functions[0] !== undefined){
    functions[0](partial(sequence, functions.slice(1)));
  }
}

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
