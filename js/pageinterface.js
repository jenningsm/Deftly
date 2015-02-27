

var m = mover(menuBar(false), 0);
var menuPos = 0;
function menu(target, motion, speed, next){
  if(target === -1){
    var newPos = (menuPos === 0 ? 1 : 0);
    m(newPos, motion, speed, next);
    menuPos = newPos;
  } else {
    m(target, motion, speed, next);
    menuPos = target;
  }
}

var banner = mover(banners(true), 1);
var page = mover(fullPage("content", false), 0);
var titleText = mover(opacity(document.getElementById("headeropen")), 1);
var disp = mover(display(false), 0);



function openPage(){
  var seq = [];
  seq.push(partial(menu, 0, nwtMotion(3, 0), .03));
  seq.push(partial(banner, 0, nwtMotion(1.2, 0), .025));
  seq.push(partial(page, 1, nwtMotion(0, 2), .02));
  sequence(seq);
}

function closePage(){
  var seq = [];
  seq.push(partial(page, 0, nwtMotion(2, 0), .02));
  seq.push(partial(banner, 1, nwtMotion(0, 1.2), .025));
  sequence(seq);
}



function openDisplay(path){
  loadDisplay(path);
  
  function moveBanners(next){
    banner(.5, nwtMotion(3, 3), .01, next);
    titleText(0, uniformMotion(), .04);
  }

  menu(0, nwtMotion(2, 0), .03);
  sequence([moveBanners, partial(disp, 1, uniformMotion(), .04)]); 
}

function closeDisplay(){
  banner(1, nwtMotion(3, 3), .01);
  titleText(1, uniformMotion(), .01);
  sequence([partial(disp, 0, uniformMotion(), .03), removeDisplay]);
}
