

var m = mover(menuBar(false), 0);
var menuPos = 0;
function menu(target, motion, speed, next){
  if(target === -1){
    var newPos = (menuPos === 0 ? 1 : 0);
    m(newPos, motion, speed, next);
    menuPos = newPos;
  } else {
    m(target, motion, speed, next);
    menuPos = target;
  }
}

var banner = mover(banners(true), 1);
var geometries = mover(fullPage("geometries", false), 0);
var about = mover(fullPage("aboutpage", false), 0);
var titleText = mover(opacity(document.getElementById("headeropen")), 1);
var disp = mover(display(false), 0);

var bottomOpen = mover(opacity(document.getElementById("open")), 1);
var bottomBack = mover(opacity(document.getElementById("back")), 0);
var bottomText = function(target, motion, speed, next){
  if(target > .5){
    bottomBack(0, motion, speed, function() { bottomOpen(2 * (target - .5), motion, speed, next)} );
  } else {
    bottomOpen(0, motion, speed, function() { bottomBack((.5 - target) * 2, motion, speed, next)} );
  }
}

var pages = {'about' : about, 'geometries' : geometries};

function openPage(page){
  var seq = [];
  seq.push(partial(menu, 0, nwtMotion(3, 0), .03));
  seq.push(partial(banner, 0, nwtMotion(1.2, 0), .025));
  seq.push(partial(pages[page], 1, nwtMotion(0, 2), .02));
  sequence(seq);
}

function closePage(page){
  var seq = [];
  seq.push(partial(pages[page], 0, nwtMotion(2, 0), .02));
  seq.push(partial(banner, 1, nwtMotion(0, 1.2), .025));
  sequence(seq);
}


var speedScale = .75;

function openDisplay(path){
  loadDisplay(path);
  
  function moveBanners(next){
    banner(.5, nwtMotion(3, 3), .0075 * speedScale, next);
    titleText(0, uniformMotion(), .02 * speedScale);
    bottomText(0, uniformMotion(), .04 * speedScale);
  }

  menu(0, nwtMotion(2, 0), .03);
  sequence([moveBanners, partial(disp, 1, uniformMotion(), .04 * speedScale)]); 
}

function closeDisplay(){
  banner(1, nwtMotion(3, 3), .005 * speedScale);
  titleText(1, uniformMotion(), .01 * speedScale);
  bottomText(1, uniformMotion(), .02 * speedScale);
  sequence([partial(disp, 0, uniformMotion(), .03 * speedScale), removeDisplay]);
}
