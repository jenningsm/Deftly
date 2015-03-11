
var last = null;

function close(next){
  if(last === null){
    riv(next);
  } else {
    var a = closes[last];
    last = null;
    a(next);
  }
}

function initClose(scene){
  last = scene;
}

var scenes = {};
scenes.index = function(next) { next() };
scenes.about = function(next) { openPage('about', next) };
scenes.geometries = function(next) { openPage('geometries', next) };
scenes.tranquility = function(next) { openDisplay('tranquility', next) };
scenes.electrodynamics = function(next) { openDisplay('electrodynamics', next) };

var closes = {};
closes.index = function(next) { next() };
closes.about = function(next) { closePage('about', next) };
closes.geometries = function(next) { closePage('geometries', next) };
closes.tranquility = function(next) { closeDisplay(next) };
closes.electrodynamics = function(next) { closeDisplay(next) };

var nextScene = null;
function switchScenes(scene, next){
  function newLast(next){
    last = scene;
    next();
  }
  sequence([close, newLast, scenes[scene]], next);
}

var root = '/ws';

var locks = [false, false];
function toScene(scene, channel,  next){
  if(!locks[channel]){
    locks[channel] = true;
    history.pushState({'scene' : scene }, "", scene === 'index' ? root + '/' : root + '/' + scene);
    function chainEnd(s){
      locks[channel] = false;
      if(validFunc(next)){
        next(s);
      }
    }
    sequence([function(n) { switchScenes(scene, n) }], chainEnd);
  }
}

//toScene('index');

function onPopState(e){
  switchScenes(e.state.scene);
}

window.addEventListener('popstate', onPopState);

////////////////////


var pages = {'about' : about, 'geometries' : geometries};

function openPage(page, next){

  var seq = [];
  seq.push(partial(banner, 0, nwtMotion(1.2, 0), .025));
  seq.push(partial(pages[page], 1, nwtMotion(0, 2), .02));
  sequence(seq, next);
  menu(0, .05);
}

function closePage(page, next){

  var seq = [];
  seq.push(partial(pages[page], 0, nwtMotion(2, 0), .02));
  seq.push(partial(banner, 1, nwtMotion(0, 1.2), .025));
  sequence(seq, next);
}


/////////////////


var speedScale = 1;

function openDisplay(sketch, next){

  var showDisplay = loadDisplay(sketch);
 
  function moveBanners(n){
    banner(.5, nwtMotion(3, 3), .0075 * speedScale, n);
    titleText(0, uniformMotion(), .04 * speedScale);
    bottomText(0, uniformMotion(), .04 * speedScale);
  }

  menu(0, .05);
  sequence([moveBanners, showDisplay, partial(disp, 1, uniformMotion(), .04)], next); 
}

function closeDisplay(next){

  function moveBanners(next){
    banner(1, nwtMotion(3, 3), .0075 * speedScale, next);
    titleText(1, uniformMotion(), .01 * speedScale);
    bottomText(1, uniformMotion(), .04 * speedScale);
  }
  sequence([partial(disp, 0, uniformMotion(), .04), removeDisplay, moveBanners], next);
}

