import { canvasConfetti, JSConfetti } from '../deps.mjs';

const logo = document.querySelector('#nav-logo');
logo?.classList.add('rocket-animation');
const confetti = new JSConfetti();

const interval = setInterval(() => {
	if (Math.random() > 0.5) {
		confetti.addConfetti({
			emojis: ['🎉', '🎊', '🎈'],
		});
	} else confetti.addConfetti();
	canvasConfetti({
		shapes: ['square', 'circle', 'star'],
		particleCount: 25,
		angle: Math.random() * 360,
		drift: Math.random() * 0.5,
		gravity: Math.random(),
	});
}, 100);

document.addEventListener('page-change', () => {
	clearInterval(interval);
	canvasConfetti.reset();
	confetti.clearCanvas();
	logo?.classList.remove('rocket-animation');
});
