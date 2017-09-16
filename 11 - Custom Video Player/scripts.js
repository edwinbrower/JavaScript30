const video = document.querySelector('.viewer');
const playButton = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
const sliders = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  playButton.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleSliderUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function changeProgress(e) {
  const time = video.duration * e.offsetX / progress.offsetWidth;
  video.currentTime = time;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', handleSliderUpdate));
sliders.forEach(slider => slider.addEventListener('mousemove', handleSliderUpdate));

let mouseDown = false;

progress.addEventListener('click', changeProgress);
progress.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    changeProgress(e);
  }
});
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);



