

var startScene;
var mypath = window.location.pathname.split('/');
if(!(mypath[mypath.length-1] in {'about' : '', 'tranquility' : '', 'electrodynamics' : '', 'geometries' : ''})){
  startScene = 'index';
} else {
  startScene = mypath[mypath.length-1];
}


var m = mover(menuBar(), 0);
var menuPos = 0;

function menu(target, speed, next){
  if(target === -1){
    var newPos = (menuPos === 0 ? 1 : 0);
    m(newPos, newPos === 1 ? nwtMotion(0, 2) : nwtMotion(2, 0), speed, next);
    menuPos = newPos;
  } else {
    m(target, target === 1 ? nwtMotion(0, 2) : nwtMotion(2, 0), speed, next);
    menuPos = target;
  }
}


////////////


var notYetOpened = true;
var g;

if(startScene === 'geometries'){
  notYetOpened = false;
  g = mover(fullPage('geometries'), 1);
} else {
  g = mover(fullPage("geometries"), 0);
}

function geometries(target, motion, speed, next){

  var after;
  if(notYetOpened && target === 1){
    after = beginImages;
    notYetOpened = false;
  } else {
    after = function(n) { n() };
  }

  var before;
  if(target === 0){
    before = closeGeometries;
  } else {
    before = function(next) { next() };
  }

  sequence([before, partial(g, target, motion, speed), after, next]);
}


////////////////

var s = (startScene === 'index' ? 1 : 0);

var bo = opacity(document.getElementById("open"));
var bb = opacity(document.getElementById("back"));

var bottomOpen = mover(bo, s);
var bottomBack = mover(bb, (s + 1) % 2);

var bottomText = function(target, motion, speed, next){
  if(target > .5){
    bottomBack(0, motion, speed, function() { bottomOpen(2 * (target - .5), motion, speed, next)} );
  } else {
    bottomOpen(0, motion, speed, function() { bottomBack((.5 - target) * 2, motion, speed, next)} );
  }
}


///////////////

var isDisp = (startScene === 'tranquility' || startScene === 'electrodynamics');

var bannerPos = 0;
if(startScene === 'index'){
  bannerPos = 1;
} else if(isDisp){
  bannerPos = .5;
}

var banner = mover(banners(), bannerPos);
var about = mover(fullPage("aboutpage"), (startScene === 'about' ? 1 : 0));

var tt = opacity(document.getElementById('headeropen'));
var titleText = mover(tt, (isDisp ? 0 : 1));
var disp = mover(display(), (isDisp ? 1 : 0));


/////////////////

