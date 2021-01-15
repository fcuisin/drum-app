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

