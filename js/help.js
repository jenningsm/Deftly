
var vertstate = true;

function openPage(){
  sequence([partial(sweepMenu, false), partial(sweepBanners, false), partial(sweepPage, true)]);
}

function closePage(){
  sequence([partial(sweepPage, false), partial(sweepBanners, true)]);
}

