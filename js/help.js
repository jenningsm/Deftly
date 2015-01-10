
var vertstate = true;

function openPage(){
  sequence([partial(sweepMenu, false), partial(sweepVerts, false), partial(sweepPage, true)]);
}

function closePage(){
  sequence([partial(sweepPage, false), partial(sweepVerts, true)]);
}


function sweepVerts(dir, next){
  //fullSweep(banners, dir, .06, .002, next);
  banners.toggle(dir, next);
}

function sweepMenu(dir, next){
  menu.toggle(dir, next);
}

function sweepPage(dir, next){
  //fullSweep(page, dir, .04, .002, next);
  page.toggle(dir, next);
}
