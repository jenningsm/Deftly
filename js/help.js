
var vertstate = true;

function openPage(){
  sequence([partial(sweepMenu, false), partial(sweepBanners, false), partial(sweepPage, true)]);
}

function closePage(){
  sequence([partial(sweepPage, false), partial(sweepBanners, true)]);
}

function openTranquility(){
  var what = display("../uncontext1.html");
  sweepMenu(false);
  sequence([partial(toggleDisplay, true), partial(fade(what, 1000), true)]); 
}
