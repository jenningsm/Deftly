
function displayBegin(sketch){
  return function(next){
    var a = loadDisplay(sketch);
    sequence([a, partial(disp, 1, uniformMotion(), .04)], next);
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

sequence([partial(riv, initializers[startScene])], sequence([drawBackground]));

initClose(startScene);
