var ANGRES = .03;
var ANGGAP = .00015;

function Arc(ctx, center, rotWidth, rotPos,  radWidth, radius, rotSpeed, color){
  this.trigs = [Math.cos(rotSpeed), Math.sin(rotSpeed)];
  this.points = [];
  this.color = color;

  this.ctx = ctx;

  var numSteps = rotWidth / ANGRES;

  var cos = [];
  var sin = [];

  cos[0] = Math.cos(rotPos);
  sin[0] = Math.sin(rotPos);
  cos[1] = Math.cos(rotPos + ANGGAP);
  sin[1] = Math.sin(rotPos + ANGGAP);
  
  var cosPlus = Math.cos(ANGRES);
  var sinPlus = Math.sin(ANGRES);

  this.center = center;

  for(var i = 0; i < numSteps; i++){

    if(i !== 0){
      this.points.push((radius - radWidth / 2) * cos[0]);
      this.points.push((radius - radWidth / 2) * sin[0]);
      this.points.push((radius + radWidth / 2) * cos[0]);
      this.points.push((radius + radWidth / 2) * sin[0]);
    }  

    if(i !== numSteps - 1){
      this.points.push((radius - radWidth / 2) * cos[1]);
      this.points.push((radius - radWidth / 2) * sin[1]);
      this.points.push((radius + radWidth / 2) * cos[1]);
      this.points.push((radius + radWidth / 2) * sin[1]);
    }
  
    for(var j = 0; j < 2; j++){
      sin[j] = sin[j] * cosPlus + sinPlus * cos[j];
      cos[j] = cos[j] * cosPlus - sin[j] * sinPlus;
    }

  }
}

function cssColor(color){
  return 'rgba(' + Math.round(color[0]) + ',' +  Math.round(color[1]) + ',' +  Math.round(color[2]) + ',' + (color[3] / 255) + ')';
}

Arc.prototype.draw = function(){
  for(var j = 0; j < this.points.length; j += 8){
    this.ctx.beginPath();

    this.ctx.moveTo(this.points[j] + this.center[0], this.points[j+1] + this.center[1]);
    this.ctx.lineTo(this.points[j + 4] + this.center[0], this.points[j + 5] + this.center[1]);
    this.ctx.lineTo(this.points[j + 6] + this.center[0], this.points[j + 7] + this.center[1]);
    this.ctx.lineTo(this.points[j + 2] + this.center[0], this.points[j + 3] + this.center[1]);

    this.ctx.closePath();

    this.ctx.fillStyle = cssColor(this.color);
    this.ctx.fill();
  }
}

Arc.prototype.rotate = function(){
  var len = this.points.length;
  for(var i = 0; i < len; i += 2){
    hold = [this.points[i], this.points[i+1]];
    this.points[i] = this.trigs[0] * hold[0] - this.trigs[1] * hold[1];
    this.points[i+1] = this.trigs[1] * hold[0] + this.trigs[0] * hold[1];
  }
}
