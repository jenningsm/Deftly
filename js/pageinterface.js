

var menu = mover(menuBar(false), 0);
var banner = mover(banners(true), 1);
var page = mover(fullPage("content", false), 0);
var titleText = mover(opacity(document.getElementById("headeropen")), 1);


function toggleDisplay(dir, next){
  var time = banners((dir ? .5 : 1), nwtMotion(3, 3), .01, next);
  titleText((dir ? 0, 1), uniformMotion(), .01);
}




var vertstate = true;

function openPage(){
  sequence([partial(menu, 0, nwtMotion(3, 0), .01), partial(banners, 0, nwtMotion(3, 0), .01), partial(page, 1, nwtMotion(0, 3), .01)]);
}

function closePage(){
  var seq = [];
  seq.push(partial(page, 0, nwtMotion(3, 0), .01));
  seq.push(partial(banner, 1, nwtMotion(0, 3), .01));
  sequence(seq);
}

function openTranquility(){
  loadDisplay("../uncontext1.html");
  sweepDisp = displayHandle(ufmMotion(display(false), 0), 600);
  
  menu.sweep(false);
  sequence([partial(toggleDisplay, true), sweepDisp]); 
}

