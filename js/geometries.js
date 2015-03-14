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
    return stopSpinner(.05, next);
  } else {
    return nullReturn(next);
  }
}

function loadMyImage(num){
  var img = new Image();
  oneTimeListener(img, 'load', function() { img = null;});
  img.src = imagepath + images[num];
}

function setImage(num, next){

  function run(){
    stopSpinner = spinner(false, .02);
  
    function onLoaded(){
      stopSpinner(.05, next).run();
      stopSpinner = null;
    }
  
    loadMyImage((num - 1 + images.length) % images.length);
    loadMyImage((num + 1) % images.length);
  
    if(num >= 0 && num < images.length) {
      oneTimeListener(imgElement, 'load', onLoaded);
      imgElement.src = imagepath + images[num];
      console.log("begun image");
    }
  } 
 
  return nullReturn(run);

}



var imgFader = mover(opacity(imgElement), 1);

function changeImage(num, next){

  var speed = .04;

  function fadeIn(n){
    return imgFader(1, uniformMotion(), speed * .5, n);
  }

  function fadeOut(n){
    if(imgElement.src !== null){
      return imgFader(0, uniformMotion(), speed, n);
    } else {
      return nullReturn(n);
    }
  }

  return sequence([fadeOut, partial(setImage, num), fadeIn, next]);

}



var pos = 0;

function nextImage(){
  if(pos < images.length - 1){
    pos++;
  } else {
    pos = 0;
  }

  changeImage(pos).run();
}

function previousImage(){
  if(pos > 0){
    pos--;
  } else {
    pos = images.length - 1;
  }

  changeImage(pos).run();
}

function beginImages(next){
  loadMyImage(1);
  loadMyImage(images.length - 1);
  return nullReturn(next);
}

imgElement.src = imagepath + images[0];


