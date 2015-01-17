
var vertstate = true;

function openPage(){
  sequence([partial(sweepMenu, false), partial(sweepBanners, false), partial(sweepPage, true)]);
}

function closePage(){
  sequence([partial(sweepPage, false), partial(sweepBanners, true)]);
}

function openTranquility(){
  var what = display("../uncontext1.html");
  sweepDisp = sweepDisplay(what, 600);
  
  sweepMenu(false);
  sequence([partial(toggleDisplay, true), partial(sweepDisp, true)]); 
}

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
