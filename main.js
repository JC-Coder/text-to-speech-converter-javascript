const textarea  = document.querySelector('textarea'); 
const voiceList = document.querySelector('select');
const speechBtn = document.querySelector('button');
let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices(){
    for (let voice of synth.getVoices()){
        //selecting "Google US English" as the default voice 
        let selected = voice.name === "Google US English" ? "selected" : "";


        // creating and option tag and passing the name and lang of voices
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend', option); // inserting option before end of select tag.
    }
}

synth.addEventListener('voiceschanged', voices);


function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        // if the available device voice name is equal to the user selected voice name 
        //then set the speech voice to the user selected voice
        
        if (voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance); //speak the speech/utterance
};

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textarea.value !== ""){
         // if an utterance / speech is not currently speaking 
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }

        if(textarea.value.length > 80){
            // if isSpeaking is true then change it's value to false and resume the utterance 
            // else change it's value and pause the utterance/speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                } 
            });
        } else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
