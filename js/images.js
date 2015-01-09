var currentImage = 1;
var numImages = 11;
var nextImage = new Image();
nextImage.src = "tris/2.png";
var prevImage = null;


function changeImage(dir){
  if(dir){
    if(nextImage != null){
      prevImage = new Image();
      prevImage.src = document.getElementById("imageholder").src;
      document.getElementById("imageholder").src = nextImage.src;
      currentImage++;
      if(currentImage != numImages){
        console.log(currentImage + " " + max);
        nextImage = new Image();
        nextImage.src = "tris/" + (currentImage + 1) + ".png";
      } else {
        nextImage = null;
      }
    }

  } else {
    if(prevImage != null){
      var image = document.getElementById("imageholder");
      nextImage = new Image();
      nextImage.src = image.src;
      image.src = prevImage.src;
      currentImage--;
      if(currentImage != 1){
        nextImage = prevImage;
        prevImage = new Image();
        prevImage.src = "tris/" + (currentImage - 1) + ".png";
      } else {
        prevImage = null;
      }
    }
  }
}
