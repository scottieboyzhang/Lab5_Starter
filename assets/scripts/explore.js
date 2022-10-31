// explore.js

window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;
var voices=[];


function init() {
  const butt = document.querySelector('button');
  const inputTxt = document.getElementById("text-to-speak");
  const voiceSelect = document.querySelector('select');
  var result = document.querySelectorAll("img")[0];
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  butt.addEventListener('click', () =>{
    result.setAttribute('src', 'assets/images/smiling-open.png');
    let utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    utterThis.addEventListener('end', () => {
      result.setAttribute('src', 'assets/images/smiling.png');
    });
   inputTxt.blur(); 
  })
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


