
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

var interrupt = function(n) { n() };

var scenes = {};
scenes.index = function(next) { next(); return function(n) { n() }; };
scenes.about = function(next) { return openPage('about', next) };
scenes.geometries = function(next) { return openPage('geometries', next) };
scenes.tranquility = function(next) { return openDisplay('tranquility', next) };
scenes.electrodynamics = function(next) { return openDisplay('electrodynamics', next) };

var closes = {};
closes.index = function(next) { next(); return function(n) { n() }; };
closes.about = function(next) { return closePage('about', next) };
closes.geometries = function(next) { return closePage('geometries', next) };
closes.tranquility = function(next) { return closeDisplay(next) };
closes.electrodynamics = function(next) { return closeDisplay(next) };

function switchScenes(scene, next){
  function newLast(next){
    last = scene;
    next();
  }
  sequence([interrupt, close, newLast, function(n) { interrupt = scenes[scene](n) }], next);
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
  menu(0, .05);
  return sequence(seq, next);
}

function closePage(page, next){

  var seq = [];
  seq.push(partial(pages[page], 0, nwtMotion(2, 0), .02));
  seq.push(partial(banner, 1, nwtMotion(0, 1.2), .025));
  return sequence(seq, next);
}


/////////////////


var speedScale = 1;

function openDisplay(sketch, next){

  var showDisplay = loadDisplay(sketch);
 
  function moveBanners(n){
    titleText(0, uniformMotion(), .04 * speedScale);
    bottomText(0, uniformMotion(), .04 * speedScale);
    var v = banner(.5, nwtMotion(3, 3), .0075 * speedScale, n);
    return function(ne) { console.log("banners interrupted"); v(ne)};
  }

  menu(0, .05);
  var v = sequence([moveBanners, showDisplay, partial(disp, 1, uniformMotion(), .04)], next);
  return function(n) { console.log("open interrupt"); v(n)}; 
}

function closeDisplay(next){

  function moveBanners(next){
    titleText(1, uniformMotion(), .01 * speedScale);
    bottomText(1, uniformMotion(), .04 * speedScale);
    return banner(1, nwtMotion(3, 3), .0075 * speedScale, next);
  }
  return sequence([partial(disp, 0, uniformMotion(), .04), removeDisplay, moveBanners], next);
}

