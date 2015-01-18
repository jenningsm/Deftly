
function sequence(functions){
  if(functions.length != 0){
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

function toggle(fn, start){
  return function(next){
    fn(start, next);
    start = !start;
  }
}
