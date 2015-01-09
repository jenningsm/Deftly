var ANGRES = .03;

function Arc(rotWidth, rotPos,  radWidth, radius, rotSpeed, color){
  this.trigs = [Math.cos(rotSpeed), Math.sin(rotSpeed)];
  this.points = [];
  this.color = color;
  this.center = [document.getElementById("sketchpad").clientWidth / 2, document.getElementById("sketchpad").clientHeight / 2];

  var numSteps = rotWidth / ANGRES;

  var cos = Math.cos(rotPos);
  var sin = Math.sin(rotPos);
  
  var cosPlus = Math.cos(ANGRES);
  var sinPlus = Math.sin(ANGRES);

  for(var i = 0; i < numSteps; i++){

    this.points.push((radius - radWidth / 2) * cos);
    this.points.push((radius - radWidth / 2) * sin);
    this.points.push((radius + radWidth / 2) * cos);
    this.points.push((radius + radWidth / 2) * sin);
    
    sin = sin * cosPlus + sinPlus * cos;
    cos = cos * cosPlus - sin * sinPlus;

  }
}

Arc.prototype.draw = function(){
  fill(this.color[0], this.color[1], this.color[2], this.color[3]);
  noStroke();
  beginShape(QUAD_STRIP);
  var len = this.points.length;
  for(var i = 0; i < len; i += 2){
    vertex(this.points[i] + this.center[0], this.points[i+1] + this.center[1]);
  }
  endShape();
/*  beginShape(TRIANGLE_STRIP);
  var len = this.points.length;
  for(var i = 0; i < len; i += 4){
    vertex(this.points[i] + this.center[0], this.points[i+1] + this.center[1]);
  }
  for(var i = len - 2; i >= 0; i -= len - 4){
    vertex(this.points[i] + this.center[0], this.points[i+1] + this.center[1]);
  }
  endShape(CLOSE);*/
}

Arc.prototype.rotate = function(){
  var len = this.points.length;
  for(var i = 0; i < len; i += 2){
    hold = [this.points[i], this.points[i+1]];
    this.points[i] = this.trigs[0] * hold[0] - this.trigs[1] * hold[1];
    this.points[i+1] = this.trigs[1] * hold[0] + this.trigs[0] * hold[1];
  }
}
