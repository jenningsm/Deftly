var arcs = [];

function setup(){
  cvs = createCanvas(window.innerWidth, window.innerHeight);
  cvs.parent("sketchpad");
  arcs = [];

  base = 255;
  background(base, base, base + 10);

  var num = 250;
  var pow = 5;
  var standard = Math.pow(50, 1 /pow);
  var maxRad = Math.sqrt(Math.pow( window.innerWidth ,2) + Math.pow(window.innerHeight,2));
  blendMode(BLEND);
  for(var i = 0; i < num; i++){
    var dist = (.3 + Math.random() * 0 + (num - i) / (num * 1.5)) * standard;
    dist = Math.pow(dist, pow);
    var rad = maxRad / (1.5 + dist);
    var radWidth = 250 / (1 + dist);
    //radWidth *= radWidth * dist / (rad + (radWidth / 2) + dist);
    var rand = Math.random();
    var colors;
    if(rand > .2){
      colors = [Math.random() * 64, Math.random() * 32, 64 + Math.random() * 196, 128];
    } else if(rand > .1) {
      var shade = Math.random() * 96 + 32;
      colors = [shade, shade, shade, 128];
    } else {
      colors = [255, 96, 0, 128];
    }
    var shade = Math.random() * 224 + 32;
    colors = [shade, shade, shade, 160];
    arcs.push(new Arc(Math.PI / 4 + Math.random() - .5, Math.random() * 2 * PI, radWidth, rad, .002 + (Math.random() - .5) / 25, colors));
    arcs[i].draw();
  }
  
  /*noStroke();
  fill(255, 0, 0, 128);
  ellipseMode(RADIUS);
  var pad = document.getElementById("sketchpad");
  var width = pad.clientWidth;
  var height = pad.clientHeight;
  var c = 45;
  ellipse(width / 2, height / 2, width / (c * standard), width / (c * standard));
  */
}

function  draw(){
//  background(base, base, base + 10);
  var len = arcs.length;
  for(var i = 0; i < len; i++){
//    arcs[i].rotate();
  }
  for(var i = 0; i < len; i++){
//    arcs[i].draw();
  }
}
