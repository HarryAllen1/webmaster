import JSConfetti from 'https://esm.sh/js-confetti@0.11.0';

const logo = document.querySelector('#nav-logo');
logo?.classList.add('rocket-animation');
const confetti = new JSConfetti();

const interval = setInterval(() => {
	if (Math.random() > 0.5)
		confetti.addConfetti({
			emojis: ['🎉', '🎊', '🎈'],
		});
	else confetti.addConfetti();
}, 100);

document.addEventListener('page-change', () => {
	clearInterval(interval);
	confetti.clearCanvas();
	logo?.classList.remove('rocket-animation');
});
