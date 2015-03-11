
var initializers = {
   'index' : null,
   'geometries' : beginImages,
   'about' : null,
   'tranquility' : function() { loadDisplay('tranquility')() },
   'electrodynamics' : function() { loadDisplay('electrodynamics')() }
}

history.replaceState({'scene' : startScene }, "", startScene === 'index' ? root + '/' : root + '/' + startScene);

riv(initializers[startScene]);

initClose(startScene);
