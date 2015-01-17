var sbanners = nwtMotion(banners(true), 1);
var sweepBanners = fullSweep(sbanners, .09, .0045);
var partSweepBanners = partSweep(sbanners, .03, .0025);

function toggleDisplay(dir, next){
  ufmMotion(opacity(document.getElementById("headeropen")), partSweepBanners((dir ? .5 : 1), next))(!dir);
}

var sweepPage = fullSweep(nwtMotion(fullPage("content", false), 0), .05, .003);
var sweepMenu = fullSweep(nwtMotion(menuBar(false), 0), .12, .008);
//var sweepDisp = sweepDisplay("../uncontext1.html", 600);

function stp(){
//   banners.resize(0);
//   page.resize(80);
}
