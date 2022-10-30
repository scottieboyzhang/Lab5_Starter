// explore.js

window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;
var voices=[];
function init() {
  const butt = document.querySelector('button');
  const inputTxt = document.getElementById("text-to-speak");
  const voiceSelect = document.querySelector('select');
  
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  butt.onclick = (event) =>{
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const utterNull = new SpeechSynthesisUtterance("a");
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        synth.speak(utterThis);
        var result = document.querySelector("img");
        result.src = "assets/images/smiling-open.png";
        while(synth.speaking){
          result.src = "assets/images/smiling-open.png";
          synth.pause();
        }
      }
    }
      synth.resume();
      result.src = "assets/images/smiling.png"; 
      
    inputTxt.blur(); 
  }
}  
  
function populateVoiceList() {
  voices = synth.getVoices();
  
  if (typeof speechSynthesis === 'undefined') {
    return;
  }
  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.querySelector("select").appendChild(option);
  }
  
}


