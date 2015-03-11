
function displayBegin(sketch){
  return function(){
    var a = loadDisplay(sketch);
    sequence([a, disp(1, uniformMotion(), .04)]);
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

riv(initializers[startScene]);

initClose(startScene);
