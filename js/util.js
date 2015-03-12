
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

function sequence(functions, chaincb){

  var interrupt = null;
  var interrupted = false;

  function sequenceHelper(f){
    if(!interrupted){
      if(f.length !== 0 && validFunc(f[0])){
        interrupt = f[0](partial(sequenceHelper, f.slice(1)));
      } else if(validFunc(chaincb)){
        var hold = chaincb;
        chaincb = null;
        interrupt = null;
        riv(hold);
      }
    }
  }

  sequenceHelper(functions);

  return function(n) { 
    var seq = [];
    seq.push(function(next) { interrupted = true; next() });
    seq.push(interrupt);
    sequence(seq, function() { riv(chaincb); riv(n);});
  };

}
