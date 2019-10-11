const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

function makeFullscreen() {
	// use necessary prefixed versions
player.webkitRequestFullscreen();
player.mozRequestFullScreen();
player.msRequestFullscreen();

// finally the standard version
player.requestFullscreen();
}

function togglePlay() {
	video.paused ? video.play() : video.pause();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(e) {
	// video[this.name] = this.value; // this relates to the 'change' event and will not work for mouse events
	video[e.target.name] = e.target.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

//TODO
//add fullscreen button
fullscreen.addEventListener('click', makeFullscreen)

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseup', () => mousedown = false);

// ranges.forEach(r => r.addEventListener('change', handleRangeUpdate))
ranges.forEach(r => r.addEventListener('mousemove', (e) => mousedown && handleRangeUpdate(e)));
ranges.forEach(r => r.addEventListener('mousedown', () => mousedown = true));
ranges.forEach(r => r.addEventListener('mouseup', () => mousedown = false));

skipButtons.forEach(b => b.addEventListener('click', skip));

toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
