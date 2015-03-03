
/* @pjs preload="tranq.jpg"; */

final int RAD = 400;
final int NUM = 2100;
final float BSIZE = 1.5;
float speed;
float frameSpeed;
final float START = .75;
final float SPREAD = 0;
final float RELEASE = 400;
final float MSIZE = 120;
final int FRATE = 24;


final int NGREYS = 2;
final float greywidth;
final float GREYSTR = 128;

color myred;

PVector center;

PImage backg;

float radSquared;
int count;

float rad;

Bird[] birds;
Mass[] masses;

var width;
var height;

Boolean begun = false;

void setup(){

  noLoop();
  function goMessage(e){
    if(e.data === "begin"){
      window.removeEventListener("message", goMessage);
      begin();
      begun = true;
    }
  }

  window.addEventListener("message", goMessage);

}

void begin(){

  var mycvs = document.getElementById("sketchContainer");
  width = window.innerWidth;;
  height = window.innerHeight;

  myred = color(255, 80, 80);

  rad = min(width / 2, height / 2) * (1 / 1.2);
  
  //speed = rad / 11.67;
  speed = rad / 15.67;

  frameSpeed = speed / FRATE;
  greywidth = rad / 43;


  count = 0;
  radSquared = pow(rad, 2);

  frameRate(FRATE);
  size(width, height);
  background(255);

  center = new PVector(width / 2, height / 2);


  PGraphics bg = createGraphics(width, height, RGB);
  bg.beginDraw();

  bg.noFill();

  float maxdist = sqrt(pow(center.x, 2) + pow(center.y, 2));

  bg.strokeWeight(10);

  for(float i = rad; i < maxdist; i += 10){
    bg.stroke(175 + 114 * i / (2 *  maxdist)); 
    bg.ellipse(center.x, center.y, i * 2, i * 2);
  }
   

  bg.fill(255);
  bg.stroke(myred);
  bg.strokeWeight(rad / 200);
  bg.ellipse(center.x, center.y, rad * 2, rad * 2);

  bg.noFill();
  bg.strokeWeight(rad / 350);
  bg.stroke(GREYSTR, 128);
  for(int i = 0; i < NGREYS; i++){
    float greyRad = rad * START - greywidth / 2;
    greyRad = 2 * (greyRad + i * greywidth / (NGREYS -1));
    bg.ellipse(center.x, center.y, greyRad, greyRad);
  }

  bg.strokeWeight(rad / 200);
  bg.stroke(255);
  bg.noFill();
  float a = 1.35;
  float b = rad / 12;
  bg.ellipse(center.x, center.y, rad * 2 * a, rad * 2 * a);
  bg.ellipse(center.x, center.y, rad * 2 * a + b, rad * 2 * a + b);

  PImage mind = loadImage("tranq.jpg");
  mind.resize(rad / 12, 0);

  bg.image(mind, center.x - mind.width / 2, center.y + rad * START * .72 - mind.height / 2);

  bg.endDraw();

  backg = bg.get();


  masses = new Mass[6];

  for(int i = 0; i < 5; i++){
    masses[i] = new Mass(new PVector( START * rad * cos(-0.1 * PI + i * 2 * PI / 5), START * rad * sin(-0.1 * PI + i * 2 * PI / 5)), false);
  }
  
  masses[5] = new Mass(new PVector(0,0), true);


  birds = new Bird[NUM];
  
  float bsize = .75 + rad * rad / (2 * 275 * 275);

  for(int i = 0; i < NUM; i++){
   int j = floor(random(6));

   birds[i] = new Bird(j, random(2 * PI), bsize);
  }

  window.parent.postMessage("tranquility", "*");

  loop();

}

void draw(){
  if(begun){
    count++;
   
    image(backg, 0, 0);
  
    for(int i = 0; i < 6; i++){
      masses[i].stp();
    }
  
    fill(0, min(count, 244));
    noStroke();
    bool release = ((count % RELEASE) == 0);   
    for(int i = 0; i < NUM; i++){
      birds[i].step(release);
    }
    for(int i = 0; i < NUM; i++){
      birds[i].drw();
    }
   
    for(int i = 0; i < 6; i++){
      masses[i].drw2();
    }
  
    //fill(255, max(255 - count * 150.0 / FRATE, 0));
    //rect(0, 0, width, height);
  } 
}


function setA(n){
  masses[0].setMass(n * 4);
}
function setB(n){
  masses[1].setMass(n * 5);
}
function setC(float n){
  masses[2].setMass(n * 100);
}
function setD(float n){
  masses[3].setMass(n * 100.0 / 14);
}
function setEF(float n){
  masses[4].setMass(n / 4.67);
}
function setEG(float n){
  masses[5].setMass(n / 4.67);
}

int pick(int exclude){

  float sum = 0;

  for(int i = 0; i < 6; i++){
    if(i != exclude){
      float s = masses[i].weight * masses[i].weight;
      sum += s * s;
    }
  }

  float rand = random(sum);

  sum = 0;
  for(int i = 0; i < 6; i++){
    if(i != exclude){
      sum += pow(masses[i].weight, 4);
      if(rand < sum){
        if(i == exclude)
          console.log("not supposed to happen");
        return i;
      }
    }
  }
  console.log("shouldn't happen");
  return 5;

}

class Mass {
  
  PVector pos;
  float weight;
  float targ;
  bool special;

  float theta;

  void setMass(Integer newTarg){
    targ = newTarg;
  }

  void stp(){
    weight += max(min((targ - weight) * .45 / FRATE, .3), -.3 );
  }
  
  Mass(PVector po, bool spec){
    special = spec;
    pos = po;
    weight = 40;
    targ = weight;
    theta = atan2(pos.y, pos.x);
  }
  
  public void drw2(){

    fill(128, 192);
    float rsize = 1 - 1 / (1 +  weight / 50);
    if(special)
      rsize *= 1.25;
    rsize *= rad / 3;
    if(special && false){
      stroke(myred);
      strokeWeight(rsize / 40.0);
    } else {
      stroke(0);
      strokeWeight(rsize / 75.0);
    }
    ellipse(pos.x + center.x, pos.y + center.y, rsize, rsize);

 
    noStroke();
    fill(0);
    ellipse(center.x + pos.x, center.y + pos.y, rsize / 4, rsize / 4);
  
    strokeWeight(rad / 350);

    if(special){

      noFill();
      stroke(GREYSTR, 128);
      for(int i = 0; i < NGREYS; i++){
        float rad2 = rsize * 2 - greywidth / 2;
        rad2 = 2 * (rad2 + i * greywidth / (NGREYS -1));
        ellipse(center.x + pos.x, center.y +  pos.y, rad2, rad2);
      }
    }
  }

}

class Bird {

  float dir[];
  PVector pos;
  float change[];
  int steps[];
  int last[];
  float size;
  bool bin;
  int prepareTime[];

  float basecos[];
  float modcos[];
  float basesin[];
  float modsin[];
 
  Bird(int index, float dir_, float sz){
    pos = masses[index].pos.get();
    prepareTime = new int[2];
    steps = new int[2];
    basecos = new float[2];
    modcos = new float[2];
    basesin = new float[2];
    modsin = new float[2];
    change = new float[2];
    dir = new float[2];
    dir[0] = dir_;
    last = new float[2];
    last[1] = index;
    prepare(true);
    setCourse(true);
    size = sz;
    bin = true;
  }

  private void setCourse(bool newTarg){

    basecos[0] = basecos[1];
    modcos[0] = modcos[1];
    basesin[0] = basesin[1];
    modsin[0] = modsin[1];

    dir[0] = dir[1];
    change[0] = change[1];
    steps[0] = steps[1];
    prepareTime[0] = prepareTime[1];

    if(newTarg){
      pos.x = masses[last[0]].pos.x + randomGaussian() * .55;
      pos.y = masses[last[0]].pos.y + randomGaussian() * .55;
    }

  }

  private void prepare(bool newTarg){

    int sign;

    PVector target;
    PVector diff;

    if(newTarg){
      last[0] = last[1];
      last[1] = pick(last[1]);
      target = masses[last[1]].pos.get();
      diff = PVector.sub(target,masses[last[0]].pos);
    } else {
      target = masses[last[1]].pos.get();
      diff = PVector.sub(target, pos);
    }

    if(newTarg){
      if(abs(masses[last[0]].pos.x) > 5 || abs(masses[last[0]].pos.y) > 5){
        dir[1] = (PVector.mult(pos, -1).heading() + randomGaussian() * PI / 3 + 2 * PI ) % (2 * PI);
      } else {
        dir[1] = random(2 * PI);
      }
    } else {
      dir[1] = dir[0];
    }

    dir[1] += -floor(dir[1] / (2 * PI));

    float base = diff.mag();
    float heading = diff.heading();
    if(heading < 0)
      heading += 2 * PI;
    float ang = heading - dir[1];
    float hold = ang;
    if(ang > 0){
      sign = (ang > PI) ? -1 : 1;
    } else {
      sign = (ang < -PI) ? 1 : -1;
    }
    ang = abs(ang);
    if(ang > PI){
      ang = 2 * PI - ang;
    }
    bool mixed = false;
    if(ang > PI / 2){
      ang = PI - ang;
      mixed = true;
    }

    float r = abs(base * sin((PI / 2) -  ang) / sin(2 * ang));

    change[1] = sign * speed / (r * FRATE);

    if(mixed){
      ang = PI - ang;
    }
    steps[1] = ceil(FRATE * r * ang * 2  / speed);
    if(!newTarg){
      steps[0] = 0;
    }

    basecos[1] = cos(dir[1]);
    modcos[1] = cos(change[1]);
    basesin[1] = sin(dir[1]);
    modsin[1] = sin(change[1]);

    int firstRelease = count + steps[0] + (RELEASE - ((count + steps[0]) % RELEASE));
    int afterRelease = count + steps[0] + steps[1] +  (RELEASE - ((count + steps[0] + steps[1]) % RELEASE));

    prepareTime[1] = floor(random(firstRelease + 2, afterRelease - 2));

  }
  
  public void drw(){
    ellipse(pos.x + center.x, pos.y + center.y, size, size);
  }
  
  public void step(bool release){
     if(count == prepareTime[0]){
       prepare(true);
     }

     if(steps[0] > 0 || release){

       if(steps[0] == 0){
         setCourse(true);
       }

       dir[0] += change[0];

       if(dir[0] < 0)
         dir[0] += 2 * PI;
       if(dir[0] > 2 * PI)
         dir[0] -= 2 * PI;
       pos.x += frameSpeed * basecos[0];
       pos.y += frameSpeed * basesin[0];

       basecos[0] = basecos[0] * modcos[0] - basesin[0] * modsin[0];
       basesin[0] = basesin[0] * modcos[0] + basecos[0] * modsin[0];

       steps[0]--;

       float squareDist = pos.x * pos.x + pos.y * pos.y;
       if(squareDist > radSquared && bin){
         pos.x = -pos.x;
         pos.y = -pos.y;
         prepare(false);
         setCourse(false);
         bin = false;
       } else {
         bin = true;
       }
     }
  }
}


  socket_ = new WebSocket('ws://literature.uncontext.com:80');
  socket_.onmessage = function (e) {
    if(begun){
      setA(JSON.parse(e.data).a);
      setB(JSON.parse(e.data).b);
      setC(JSON.parse(e.data).c);
      setD(JSON.parse(e.data).d);
      setEF(JSON.parse(e.data).e.f);
      setEG(JSON.parse(e.data).e.g);
    }
 };

