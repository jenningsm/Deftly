
function displayBegin(sketch){
  return function(next){
    var a = loadDisplay(sketch);
    return sequence([a, partial(disp, 1, uniformMotion(), .04)], next);
  }
}

var initializers = {
   'index' : null,
   'geometries' : beginImages,
   'about' : null,
   'tranquility' : displayBegin('tranquility'),
   'electrodynamics' : displayBegin('electrodynamics')
}

history.replaceState({'scene' : startScene }, "", startScene === 'index' ? root + '/' : root + '/' + startScene);

var s = sequence([initializers[startScene]], drawBackground(startScene === 'index').run);
interrupt = s.interrupt;
s.run();

initClose(startScene);
