
var last = null;

function close(next){
  if(last === null){
    riv(next);
  } else {
    var a = closes[last];
    last = null;
    return a(next);
  }
}

function initClose(scene){
  last = scene;
}

var scenes = {};
scenes.index = function(next) { return nullReturn(next) };
scenes.about = function(next) { return openPage('about', next) };
scenes.geometries = function(next) { return openPage('geometries', next) };
scenes.tranquility = function(next) { return openDisplay('tranquility', next) };
scenes.electrodynamics = function(next) { return openDisplay('electrodynamics', next) };

var closes = {};
closes.index = function(next) { return nullReturn(next) };
closes.about = function(next) { return closePage('about', next) };
closes.geometries = function(next) { return closePage('geometries', next) };
closes.tranquility = function(next) { return closeDisplay(next) };
closes.electrodynamics = function(next) { return closeDisplay(next) };

var interrupt = function() { };

function switchScenes(scene, next){
  function newLast(next){
    last = scene;
    return nullReturn(next);
  }
  interrupt();
  var s = sequence([close, newLast, scenes[scene]], next);
  interrupt = s.interrupt;
  return nullReturn(s.run);
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
    sequence([function(n) { return switchScenes(scene, n) }], chainEnd).run();
  }
}

function onPopState(e){
  switchScenes(e.state.scene).run();
}

window.addEventListener('popstate', onPopState);

////////////////////


var pages = {'about' : about, 'geometries' : geometries};

function openPage(page, next){

  var seq = [];
  seq.push(partial(banner, 0, nwtMotion(1.2, 0), .025));
  seq.push(partial(pages[page], 1, nwtMotion(0, 2), .02));
  return combineActions([menu(0, .05), sequence(seq, next)]);
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
    var a = titleText(0, uniformMotion(), .04 * speedScale);
    var b = bottomText(0, uniformMotion(), .04 * speedScale);
    var c = banner(.5, nwtMotion(3, 3), .0075 * speedScale, n);
    var d = menu(0, .05);
    return combineActions([a, b, c, d]);
  }

  return sequence([moveBanners, showDisplay, partial(disp, 1, uniformMotion(), .04)], next); 
}

function closeDisplay(next){

  function moveBanners(next){
    var a = titleText(1, uniformMotion(), .01 * speedScale);
    var b = bottomText(1, uniformMotion(), .04 * speedScale);
    var c = banner(1, nwtMotion(3, 3), .0075 * speedScale, next);
    return combineActions([a, b, c]);
  }
  return sequence([partial(disp, 0, uniformMotion(), .04), removeDisplay, moveBanners], next);
}

