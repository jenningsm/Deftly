
function drawBackground(showSpinner, next){

  var stopBackSpinner;

  if(showSpinner){
    stopBackSpinner = partial(spinner(false, .05), .05);
  } else {
    stopBackSpinner = function(n) { n() };
  }

  function getDim(){
    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;
    return Math.max(width, height);
  }

  cvs = document.getElementById("back-canvas");
  var dim = getDim();
  var ctx = cvs.getContext("2d");
  cvs.width = dim;
  cvs.height = dim;
  arcs = [];

  var center = [dim / 2, dim / 2];

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(dim, 0);
  ctx.lineTo(dim, dim);
  ctx.lineTo(0, dim);
  ctx.closePath();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fill();


  var arcs = [];

  var num = 250;
  var pow = 5;
  var standard = Math.pow(30, 1 /pow);
  var maxRad = Math.sqrt(Math.pow( window.innerWidth ,2) + Math.pow(window.innerHeight,2));
  for(var i = 0; i < num; i++){
    var dist = (.3 + (num - i) / (num * 1.5)) * standard;
    dist = Math.pow(dist, pow);
    var rad = maxRad / (1.5 + dist);
    var radWidth = Math.pow(2 * dim * dim, .25) * 6 / (1 + dist);
    var rand = Math.random();
    var shade = Math.random() * 224 + 32;
    var colors = [shade, shade, shade, 160];
    arcs.push(new Arc(ctx, center, Math.PI / 4 + Math.random() - .5, Math.random() * 2 * Math.PI, radWidth, rad, .002 + (Math.random() - .5) / 25, colors));
    arcs[i].draw();
  }

  function fadeIn(n){
    mover(opacity(document.getElementById("sketchpad")), 0)(1, uniformMotion(), .015, n);
  }

  sequence([stopBackSpinner, fadeIn], next);

  function onResize(){
    var ndim = getDim();
    if(dim !== ndim){
      dim = ndim;
      cvs.style.width = dim + 'px';
      cvs.style.height = dim + 'px';
    }
  }

  window.addEventListener('resize', onResize);

}

