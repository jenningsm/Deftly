
function menuMotion(){
  var m = new nwtMotion(menuBar(false), 0);
  
  this.sweep = fullSweep(m.act, .12, .008);
  this.toggle = toggle(this.sweep, m.get);
}

function bannerMotion(){
  var b = new nwtMotion(banners(true), 1);
  this.sweep = fullSweep(b.act, .09, .0045);
  this.move = partSweep(b.act, .03, .0025);
}

function pageMotion(){
  var p = new nwtMotion(fullPage("content", false), 0);
  this.sweep = fullSweep(p.act, .05, .003);
}
