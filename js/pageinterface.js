
var closeFunc = null;

function close(next){
  if(closeFunc === null){
    if(next !== undefined && next !== null){
      next();
    }
  } else {
    var a = closeFunc;
    closeFunc = null;
    a(next);
  }
}


var scenes = {};
scenes.index = function(next) { next() };
scenes.about = function(next) { openPage('about', next) };
scenes.geometries = function(next) { openPage('geometries', next) };
scenes.tranquility = function(next) { openDisplay('tranquility', next) };
scenes.electrodynamics = function(next) { openDisplay('electrodynamics', next) };


function switchScenes(scene, next){
  sequence([close, scenes[scene], next]);
}

var root = '/ws';

var first = true;
function toScene(scene, next){
  if(first){
    history.replaceState({'scene' : scene }, "", scene === 'index' ? root + '/' : root + '/' + scene);
    first = false;
  } else {
    history.pushState({'scene' : scene }, "", scene === 'index' ? root + '/' : root + '/' + scene);
  }
  switchScenes(scene, next);
}

////////////////////


var pages = {'about' : about, 'geometries' : geometries};

function openPage(page, next){
  closeFunc = function(n) { closePage(page, n) };

  var seq = [];
  seq.push(partial(banner, 0, nwtMotion(1.2, 0), .025));
  seq.push(partial(pages[page], 1, nwtMotion(0, 2), .02));
  seq.push(next);
  sequence(seq);
  menu(0, .05);
}

function closePage(page, next){

  var seq = [];
  seq.push(partial(pages[page], 0, nwtMotion(2, 0), .02));
  seq.push(partial(banner, 1, nwtMotion(0, 1.2), .025));
  seq.push(next);
  sequence(seq);
}


/////////////////


var speedScale = 1;

function openDisplay(sketch, next){
  closeFunc = closeDisplay; 

  var showDisplay = loadDisplay(sketch);
 
  function moveBanners(next){
    banner(.5, nwtMotion(3, 3), .0075 * speedScale, next);
    titleText(0, uniformMotion(), .04 * speedScale);
    bottomText(0, uniformMotion(), .04 * speedScale);
  }

  menu(0, .05);
  sequence([moveBanners, showDisplay, partial(disp, 1, uniformMotion(), .04), next]); 
}

function closeDisplay(next){

  function moveBanners(next){
    banner(1, nwtMotion(3, 3), .0075 * speedScale, next);
    titleText(1, uniformMotion(), .01 * speedScale);
    bottomText(1, uniformMotion(), .04 * speedScale);
  }
  sequence([partial(disp, 0, uniformMotion(), .04), removeDisplay, moveBanners, next]);
}
