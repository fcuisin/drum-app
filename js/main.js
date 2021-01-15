function removeTranisition(key) {
  key.addEventListener('transitionend', () => {
    key.classList.remove('play');
  });
}

function playMusic(audio, key) {
  key.classList.add('play');
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener("keydown", function(event) {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if (!key) return;
  playMusic(audio, key);
  removeTranisition(key);
});

