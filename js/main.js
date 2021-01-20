let startButton = document.querySelector(".start-button");
let stopButton = document.querySelector(".stop-button");
stopButton.disabled = true;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.mediaDevices.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      })

      // Success callback
      .then(function(stream) {

        const mediaRecorder = new MediaRecorder(stream);

        console.log(mediaRecorder);

        startButton.onclick = function() {
          mediaRecorder.start();
          console.log("recorder started");
          startButton.style.background = "#FFCB21";
          stopButton.style.removeProperty('background');
          stopButton.disabled = false;
        }

        let chunks = [];

        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        }

        stopButton.onclick = function() {
          mediaRecorder.stop();
          startButton.style.removeProperty('background');
          stopButton.style.background = "#FFCB21";
          console.log("recorder stopped");

          const audio = document.querySelector("#recordedAudio");

          const blob = new Blob(chunks, {type:'audio/x-mpeg-3'});
          const audioURL = window.URL.createObjectURL(blob);
          console.log(audioURL);
          audio.src = audioURL;
        }

      })

      // Error callback
      .catch(function(err) {
         console.log('The following getUserMedia error occurred: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function removeTranisition(key) {
  key.addEventListener('transitionend', () => {
    key.classList.remove('play');
  });
}

function playMusic(event) {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if (!key) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('play');
  removeTranisition(key);
}

window.addEventListener("keydown", playMusic);
