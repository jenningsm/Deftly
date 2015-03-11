
var initializers = {
   'index' : null,
   'geometries' : beginImages,
   'about' : null,
   'tranquility' : function() { loadDisplay('tranquility')() },
   'electrodynamics' : function() { loadDisplay('electrodynamics')() }
}


riv(initializers[startScene]);

initClose(startScene);
