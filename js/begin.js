
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

interrupt = sequence([initializers[startScene]], drawBackground);

initClose(startScene);
