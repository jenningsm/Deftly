var imgElement = document.getElementById("imageholder");
var imagepath = "tris/";
var images = [];
images.push('deep19.590754470275.0.png')
images.push('894431.8.png');
images.push('centered.png');
images.push('deep22.781116486293.78.png');
images.push('deep25.50295376664.0.png');
images.push('deep34.8152929114623.0.png');
images.push('deep59.7301673000020.8.png');
images.push('deep62.7898981710558.0.png');
images.push('1.png');
images.push('deep84.157732900413.8.png');
images.push('ntri.png');
images.push('10.png');
images.push('shallowdark53.9423181.3611549E7.png');

var stopSpinner = null;

function closeGeometries(next){
  if(stopSpinner !== null){
    stopSpinner(.05, next);
  } else {
    next();
  }
}

var loaded = [];
for(var i = 0; i < images.length; i++){
  loaded[i] = false;
}

function loadMyImage(num){
  if(!loaded[num]){
    var img = new Image();
    oneTimeListener(img, 'load', function() { img = null;});
    img.src = imagepath + images[num];
    loaded[num] = true;
  }
}

function setImage(num, next){

  stopSpinner = spinner(false, .05);

  function onLoaded(){
    stopSpinner(.05, next);
    stopSpinner = null;
  }

  if(num >= 0 && num < images.length) {
    oneTimeListener(imgElement, 'load', onLoaded);
    //setTimeout(function() { imgElement.src = imagepath + images[num]; }, 2000);
    imgElement.src = imagepath + images[num];
  }
  if(num > 0){
    loadMyImage(num - 1);
  }
  if(num < images.length - 1){
    loadMyImage(num + 1);
  }
}



var imgFader = mover(opacity(imgElement, 'inline'), 1);

function changeImage(num, next){

  var speed = .04;

  function fadeIn(next){
    imgFader(1, uniformMotion(), speed * .5, next);
  }

  function fadeOut(next){
    if(imgElement.src !== null){
      imgFader(0, uniformMotion(), speed, next);
    } else {
      next();
    }
  }

  sequence([fadeOut, partial(setImage, num), fadeIn, next]);
}



var pos = 0;

function nextImage(){
  if(pos < images.length - 1){
    pos++;
  } else {
    pos = 0;
  }

  changeImage(pos);
}

function previousImage(){
  if(pos > 0){
    pos--;
  } else {
    pos = images.length - 1;
  }

  changeImage(pos);
}

function beginImages(){
  loadMyImage(1);
  loadMyImage(images.length - 1);
}

imgElement.src = imagepath + images[0];


