var arcs = [];

stopBackSpinner = spinner(false, .05);

function setup(){


  var width = window.innerWidth;
  var height = window.innerHeight;
  var dim = Math.max(width, height);
  cvs = createCanvas(dim, dim);
  cvs.parent("sketchpad");
  arcs = [];

  var center = [dim / 2, dim / 2];

  base = 255;
  background(base, base, base + 10);

  var num = 280;
  var pow = 5;
  var standard = Math.pow(50, 1 /pow);
  var maxRad = Math.sqrt(Math.pow( window.innerWidth ,2) + Math.pow(window.innerHeight,2));
  blendMode(BLEND);
  for(var i = 0; i < num; i++){
    var dist = (.3 + (num - i) / (num * 1.5)) * standard;
    dist = Math.pow(dist, pow);
    var rad = maxRad / (1.5 + dist);
    var radWidth = Math.sqrt(2 * dim * dim) * .12 / (1 + dist);
    //radWidth *= radWidth * dist / (rad + (radWidth / 2) + dist);
    var rand = Math.random();
    var shade = Math.random() * 224 + 32;
    var colors = [shade, shade, shade, 160];
    arcs.push(new Arc(center, Math.PI / 4 + Math.random() - .5, Math.random() * 2 * PI, radWidth, rad, .002 + (Math.random() - .5) / 25, colors));
    arcs[i].draw();
  }

  noLoop();

  function fadeIn(){
    mover(opacity(document.getElementById("sketchpad")), 0)(1, uniformMotion(), .015);
  }

  stopBackSpinner(.05, fadeIn);

/*  function stop(){
    stopSpinner(.05, fadeIn);
  }
 
  setTimeout(stop, 3000);
*/
/*  var pcanvas = document.getElementById("defaultCanvas");
  var imgdata = pcanvas.getContext("2d").getImageData(0, 0, pcanvas.width, pcanvas.height);
  document.getElementById("backcanvas").getContext("2d").putImageData(imgdata, 0, 0);
  noCanvas();*/
  //document.getElementById("sketchpad").removeChild(document.getElementById("defaultCanvas"));
  
}

