
function menuMotion(){
  var m = new nwtMotion(menuBar(false), 0);
  
  sweepMenu = fullSweep(m.act, .12, .008);
  toggleMenu = toggle(sweepMenu, m.get);
}

function bannerMotion(){
  var b = new nwtMotion(banners(true), 1);
  sweepBanners = fullSweep(b.act, .09, .0045);
  partSweepBanners = partSweep(b.act, .03, .0025);
}

function pageMotion(){
  var p = new nwtMotion(fullPage("content", false), 0);
  sweepPage = fullSweep(p.act, .05, .003);
}
