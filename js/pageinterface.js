
var page = new pageMotion();
var banners = new bannerMotion();
var menu = new menuMotion();

var titletext = ufmMotion(opacity(document.getElementById("headeropen")), 1);

function toggleDisplay(dir, next){
  var time = partSweepBanners((dir ? .5 : 1), next);
  fullFade(titletext, time)(!dir);
}




var vertstate = true;

function openPage(){
  sequence([partial(menu.sweep, false), partial(banners.sweep, false), partial(page.sweep, true)]);
}

function closePage(){
  sequence([partial(page.sweep, false), partial(banners.sweep, true)]);
}

function openTranquility(){
  loadDisplay("../uncontext1.html");
  sweepDisp = displayHandle(ufmMotion(display(false), 0), 600);
  
  menu.sweep(false);
  sequence([partial(toggleDisplay, true), sweepDisp]); 
}

