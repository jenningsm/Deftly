
l = [];
PGraphics hold;
int count;
float curSpeed;
float[] randoms;
float[] coss;
float[] sins;

final int NUMRANDS = 1000;
final int NUMTRIGS = 512;

float opacity;

PVector a;
PVector b;
Boolean c;
Boolean cstate;
float d;
float e;
float f;

int SIZE_X = 1280;
int SIZE_Y = 720;

Boolean leaderDown;

Boolean begun = false;

function goMessage(e){
  if(e === undefined || e.data === "begin"){
    begin();
    begun = true;

    if(e !== undefined){
      window.removeEventListener("message", goMessage);
    }
  }
}

void setup(){

  noLoop();

  if(parent.sketchesBegun['electrodynamics']){
    goMessage();
  } else {
    window.addEventListener("message", goMessage);
  }

}

void begin(){
  
  SIZE_X = window.innerWidth;
  SIZE_Y = window.innerHeight;
  
  randoms = new float[NUMRANDS];
  for(int i = 0; i < NUMRANDS; i++){
    randoms[i] = 1 / sqrt(random(1));
  }
  
  coss = new float[NUMTRIGS];
  sins = new float[NUMTRIGS];
  
  for(int i = 0; i < NUMTRIGS; i++){
    coss[i] = cos(2 * PI * i / NUMTRIGS);
    sins[i] = sin(2 * PI * i / NUMTRIGS);
  }
  
  //hold = createGraphics(SIZE_X, SIZE_Y);
  //hold.noStroke();
  noStroke();
  
  count = 0;  
  
  a = new PVector(.5, .5);
  b = new PVector(.5, .5);
  c = true;
  d = random(.75);
  e = .5;
  f = .5;
  cstate = true;
 
  size(SIZE_X, SIZE_Y);
  l = [];
  restart();
  frameRate(60);

  window.parent.postMessage("electrodynamics", "*");
 
  loop();
}

void draw(){
  if(begun){
    for(int i = 0; i < l.length; i++){
      if(!l[i].step()){
        l.splice(i, 1);
        if((i == 0 || i == 1) && !leaderDown){
          leaderDown = true;
        }
      }
    }
    if(leaderDown){
      count++;
    }
  
    opacity = count * curSpeed * .01;
    if(opacity > 0){
      back(true, 4 + opacity * opacity * opacity * .07);
    }
    
   // back(false, max(64 - count , 0));
    
    if(opacity > 10){
      l = [];
      restart();
    }
  } 
}

void back(Boolean dir, float op){
  fill((dir ? 0 : 255), op);
  rect(0, 0, SIZE_X / 2, SIZE_Y);
  fill((dir ? 255 : 0), op);
  rect(SIZE_X / 2, 0, SIZE_X / 2, SIZE_Y);
  
}


void restart(){
  leaderDown = false;
  count = 0;
  
  background(0);
  fill(255);
  noStroke();
  rect(SIZE_X / 2, 0, SIZE_X / 2, SIZE_Y);
  fill(0);
  rect(0,0,SIZE_X / 2, SIZE_Y);

//  float ang = atan2(SIZE_Y / 2, SIZE_X / 2) * d * (cstate ? 1 : -1);
  float ang = atan2(SIZE_Y / 2, SIZE_X / 2) * d * (cstate ? 1 : -1);
  float speed = d * 30 + 5;
  speed *= .5 * SIZE_X / 1300.0;
  l.push(new Leader(new PVector( 0, (SIZE_X / 2) * sin(ang) + SIZE_Y / 2, 0), -ang, -ang, .8 + 1.2 * a.x, e, b.x * .5, speed));
  l.push(new Leader(new PVector( SIZE_X, -(SIZE_X / 2) * sin(ang) + SIZE_Y / 2, 0), PI - ang, PI - ang, .8 + 1.2 * a.y, f, b.y * .5, speed));
  curSpeed = speed;
}

class Leader {

  float size;
  float target;
  float dir;
  PVector pos;
  int charge;
  float curl;
  float branch;
  float fidir;
  float speed;
  PVector[] points;
  int spot;
  
  float branchCount;
  int lastBranch;
  
  Leader(PVector pos_, float dir_, float fidir_, float size_, float curl_, float branch_, float speed_){
  
    pos =   pos_;
    dir = dir_;
    target = dir_;
    size = size_;
    charge = 1;
    curl = .5 + curl_ / 2;
    branch = branch_;
    fidir = fidir_;
    speed = speed_;
    points = new PVector[2];
    points[0] = new PVector(pos.x, pos.y + size / 2);
    points[1] = new PVector(pos.x, pos.y - size / 2);
    spot = 0;
    
    branchCount = 0;
    lastBranch = 0;
    
  }
  
  float angBetween(float a, float b){
    float diff = a - b;
    if(diff > PI){
      diff = -(2 * PI - diff);
    }
    if(diff < -PI){
      diff = -(-(2 * PI) - diff);
    }
    return diff;
  }
  
  Boolean step(){
    
    noCursor();
    
    if(size < .1){
      return false;
    }
    
    for(float i = 0; i < speed; i++){
  
     // float change = (curl / 2) / sqrt(random(1));
      float change = (curl / 2) * randoms[floor(random(NUMRANDS))];
      dir += change * (random(1) > .5 ? 1 : -1);
      dir += angBetween(target, dir) * .25;
      
      float tol = PI / 2;
      if(dir - target > tol){
        dir = target + tol;
      }
      if(target - dir > tol){
        dir = target - tol;
      }

      //HOW QUICKLY BOLTS TURN TO GROUND
      target += angBetween(fidir, target) * .004;
      //TAPERING
      size -= .0004;

    /*  pos.y += sin(dir);
      pos.x += cos(dir);*/
      
      float checkdir = dir % (2 * PI);
      if(checkdir < 0){
        checkdir += 2 * PI;
      }
      checkdir = min(2 * PI - .01, checkdir);
      
      PVector progression = new PVector(coss[floor(checkdir * NUMTRIGS / (2 * PI))], sins[floor(checkdir * NUMTRIGS / (2 * PI))]);
      pos.add(progression);
      
      Boolean side = (abs(fidir) < PI / 2);

      //if a bolt has reached the bounds, stop its computation
      if(pos.x < SIZE_X / 2 ^ side){
        return false;
      }
      
      PVector perp = PVector.mult(new PVector(-progression.y, progression.x), size / 2);
      PVector[] sides = new PVector[2];
      sides[0] = PVector.add(pos, perp);
      sides[1] = PVector.add(pos, PVector.mult(perp, -1));
      
      fill(side ? 255 : 0, max(0, 255 - opacity));
      for(int j = 0; j < 2; j++){
        triangle(points[spot].x, points[spot].y, points[(spot + 1) % 2].x, points[(spot + 1) % 2].y, sides[j].x, sides[j].y);
        points[spot] = sides[j];
        spot = (spot + 1) % 2;
      }

      //hold.ellipse(pos.x, pos.y, size, size);    
      branchCount += 1440.0f / (float) SIZE_X;   
      if(branchCount > lastBranch){
        lastBranch++;
        if(charge * size / abs(target - dir) > random(1000000 / (1 + branch * 30))){
          float newdir = target + (random(1) > .5 ? 1 : -1) * (randomGaussian() + PI / 3);
          float newSize = .67 * size;
          if(newSize > .1)
            l.push(new Leader(pos.get(), newdir, fidir, newSize, curl, branch, speed));
          charge = 0;
        } else {
          charge ++;
        }
      }
    }
    
    return true;
    
  }
}

socket_ = new WebSocket('ws://duel.uncontext.com:80');
socket_.onmessage = function (e) {

var dat = JSON.parse(e.data);

	  a.x = dat.a[0];
          a.y = dat.a[1];
          b.x = dat.b[0];
          b.y = dat.b[1];
          d = dat.d;
          if(!c && dat.c === 1){
            cstate = !cstate;
          }
          c = (dat.c === 1 ? true : false);
          e = dat.e;
          f = dat.f;

};

