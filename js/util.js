
function combineActions(actions){
  var ints = [];
  var runs = [];

  for(var i = 0; i < actions.length; i++){
    ints.push(actions[i].interrupt);
    runs.push(actions[i].run);
  }

  function interrupt(){
    for(var i = 0; i < actions.length; i++){
      riv(ints[i]);
    }
  }

  function run(){
    for(var i = 0; i < actions.length; i++){
      riv(runs[i]);
    }
  }

  return {'interrupt' : interrupt, 'run' : run };
}

function nullFunc(next){
}

function nullReturn(next){
  return { 'interrupt' : nullFunc, 'run' : next };
}

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

var seqInterrupts = {};
var id = 0;

function sequence(functions, chaincb){

  var myId = id++;

  var stopped = false;
 
  function sequenceHelper(f, s){
    if(functions.length !== 0 && validFunc(f[0]) && s !== 1 && !stopped){
        var v = f[0](partial(sequenceHelper, f.slice(1)));
        if(v === undefined){
          console.log(f[0]);
        }
        seqInterrupts[myId] = v.interrupt;
        v.run();
    } else if(validFunc(chaincb)){
        chaincb();
    }
  }

  function interrupt() { 
    stopped = true;
    var hold = seqInterrupts[myId];
    delete seqInterrupts[myId];
    riv(hold);
  };

  return {'interrupt' : interrupt, 'run' : partial(sequenceHelper, functions, 0) };
}
