
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

function riv(func){
  if(validFunc(func)){
    func();
  }
}

/*
  Takes an array of functions to be executed in order. If any of the functions
   is interrupted while that function is executing, the remaining functions will not be
   executed, but chaincb will be called. If all the functions finish executing without
   interruption, chaincb will be called at the end.

   each function in functions takes one argument, which is a callback to sequence.

   If a function calls the callback with an argument of 1, this alerts sequence that
   that function has been interrupted. If a function does not ever get interrupted it
   will call the callback with an agrument of 0 or no argument at all once it has
   finished executing. 
*/

function sequence(functions, chaincb, s){
  if(functions.length !== 0 && validFunc(functions[0]) && s !== 1){
      functions[0](partial(sequence, functions.slice(1), chaincb));
  } else if(validFunc(chaincb)){
      chaincb();
  }
}
