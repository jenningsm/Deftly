var arcs = [];

stopBackSpinner = spinner(false, .05);

function setup(){

  function getDim(){
    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;
    return Math.max(width, height);
  }

  var dim = getDim();
  cvs = createCanvas(dim, dim);
  cvs.parent("sketchpad");
  arcs = [];

  var center = [dim / 2, dim / 2];

  base = 255;
  background(base, base, base + 10);

  var num = 250;
  var pow = 5;
  var standard = Math.pow(30, 1 /pow);
  var maxRad = Math.sqrt(Math.pow( window.innerWidth ,2) + Math.pow(window.innerHeight,2));
  blendMode(BLEND);
  for(var i = 0; i < num; i++){
    var dist = (.3 + (num - i) / (num * 1.5)) * standard;
    dist = Math.pow(dist, pow);
    var rad = maxRad / (1.5 + dist);
    var radWidth = Math.pow(2 * dim * dim, .25) * 6 / (1 + dist);
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

  var canvasElement = document.getElementById('defaultCanvas');

  function onResize(){
    var ndim = getDim();
    if(dim !== ndim){
      dim = ndim;
      canvasElement.style.width = dim + 'px';
      canvasElement.style.height = dim + 'px';
    }
  }

  window.addEventListener('resize', onResize);

}

