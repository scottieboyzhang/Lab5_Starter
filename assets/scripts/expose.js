// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const ImageChange = document.getElementById("horn-select");
  const SoundChange = document.getElementById("horn-select");
  const VolumeChange = document.getElementById("volume");
  ImageChange.addEventListener("change",changeImage);
  SoundChange.addEventListener("change", changeSound);
  VolumeChange.addEventListener("change", changeVol);
}
function changeImage(e){  
  const pre= "assets/images/";
  const post= ".svg";
  const result = document.querySelector("img");
  result.src = pre + e.target.value + post // Set source path  
}

function changeSound(e){
  var button = document.querySelector("button");
  button.onclick = function(){playA(e)};
}

function playA(e){
  const pre = "assets/audio/";
  const post = ".mp3";
  var result = document.querySelector("audio");
  result.src = pre + e.target.value + post;
  result.play();
  if(e.target.value == "party-horn"){
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
}

function changeVol(){
  var vol = document.getElementById("volume");
  var volu = document.querySelector("audio");
  var resultImg = document.querySelectorAll("img")[1];
  volu.volume = vol.value *0.01;
  if(vol.value > 1 && vol.value < 33){
    resultImg.src= "assets/icons/volume-level-1.svg";
  }else if(vol.value >= 33 && vol.value < 67){
    resultImg.src= "assets/icons/volume-level-2.svg";
  }else if(vol.value ==0){
    resultImg.src= "assets/icons/volume-level-0.svg";
  }
  else{
    resultImg.src= "assets/icons/volume-level-3.svg";
  }
}