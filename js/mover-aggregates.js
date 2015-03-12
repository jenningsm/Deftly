


function menuMover(scene){
  var m = mover(menuBar(), 0);
  var menuPos = 0;
  
  return function(target, speed, next){
    var interrupt;
    if(target === -1){
      var newPos = (menuPos === 0 ? 1 : 0);
      interrupt = m(newPos, newPos === 1 ? nwtMotion(0, 2) : nwtMotion(2, 0), speed, next);
      menuPos = newPos;
    } else {
      interrupt = m(target, target === 1 ? nwtMotion(0, 2) : nwtMotion(2, 0), speed, next);
      menuPos = target;
    }
    return interrupt;
  }
} 

function geometriesMover(scene){
  var notYetOpened = true;
  var g;
  
  if(scene === 'geometries'){
    notYetOpened = false;
    g = mover(fullPage('geometries'), 1);
  } else {
    g = mover(fullPage("geometries"), 0);
  }
  
  return function(target, motion, speed, next){
  
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
  
    return sequence([before, partial(g, target, motion, speed), after, next]);
  }
}

function bottomTextMover(scene){
  var s = (scene === 'tranquility' || scene === 'electrodynamics' ? 0 : 1);
  
  var bo = opacity(document.getElementById("open"));
  var bb = opacity(document.getElementById("back"));
  
  var bottomOpen = mover(bo, s);
  var bottomBack = mover(bb, (s + 1) % 2);
  
  return function(target, motion, speed, next){
    if(target > .5){
      return bottomBack(0, motion, speed, function() { bottomOpen(2 * (target - .5), motion, speed, next)} );
    } else {
      return bottomOpen(0, motion, speed, function() { bottomBack((.5 - target) * 2, motion, speed, next)} );
    }
  }
} 
  
function bannersMover(scene){
  var isDisp = (scene === 'tranquility' || scene === 'electrodynamics');
  
  var bannerPos = 0;
  if(scene === 'index'){
    bannerPos = 1;
  } else if(isDisp){
    bannerPos = .5;
  }
  
  return mover(banners(), bannerPos);
}

function aboutMover(scene){
  return mover(fullPage("about"), (scene === 'about' ? 1 : 0)); 
}

function titleTextMover(scene){
  var tt = opacity(document.getElementById('headeropen'));
  return mover(tt, (scene === 'tranquility' || scene === 'electrodynamics' ? 0 : 1));
}

function displayMover(scene){
  //return mover(display(), (scene === 'tranquility' || scene === 'electrodynamics'  ? 1 : 0));
  return mover(display(), 0);
}

/////////////////


var startScene;
var mypath = window.location.pathname.split('/');
if(!(mypath[mypath.length-1] in {'about' : '', 'tranquility' : '', 'electrodynamics' : '', 'geometries' : ''})){
  startScene = 'index';
} else {
  startScene = mypath[mypath.length-1];
}

var banner = bannersMover(startScene);
var disp = displayMover(startScene);
var titleText = titleTextMover(startScene);
var about = aboutMover(startScene);
var geometries = geometriesMover(startScene);
var bottomText = bottomTextMover(startScene);
var menu = menuMover(startScene);
