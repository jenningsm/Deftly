
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

