function removeTranisition(key) {
  key.addEventListener('transitionend', () => {
    key.classList.remove('play');
  });
}

window.addEventListener("keydown", function(event) {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  key.classList.add('play');
  removeTranisition(key);
});

