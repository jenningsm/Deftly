
pageMotion();
bannerMotion();
menuMotion();

var titletext = ufmMotion(opacity(document.getElementById("headeropen")), 1);

function toggleDisplay(dir, next){
  var time = partSweepBanners((dir ? .5 : 1), next);
  fullFade(titletext, time)(!dir);
}




var vertstate = true;

function openPage(){
  sequence([partial(sweepMenu, false), partial(sweepBanners, false), partial(sweepPage, true)]);
}

function closePage(){
  sequence([partial(sweepPage, false), partial(sweepBanners, true)]);
}

function openTranquility(){
  loadDisplay("../uncontext1.html");
  sweepDisp = displayHandle(ufmMotion(display(false), 0), 600);
  
  sweepMenu(false);
  sequence([partial(toggleDisplay, true), sweepDisp]); 
}

