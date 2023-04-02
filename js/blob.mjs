export const initBlob = () => {
	if ('ontouchstart' in document.documentElement) return;
	const blob = document.createElement('div');
	blob.id = 'blob';

	document.body.prepend(blob);
	globalThis.addEventListener('mousemove', ({ clientX, clientY }) => {
		if (clientX > window.innerWidth || clientY > window.innerHeight) return;
		blob.animate(
			{
				left: `${clientX}px`,
				top: `${clientY + 50}px`,
			},
			{
				duration: 3000,
				fill: 'forwards',
			}
		);
	});

	document.querySelectorAll('button, a').forEach((el) => {
		addBlobListeners(el);
	});
	document.addEventListener('page-change', () => {
		document.querySelectorAll('#main button, #main a').forEach((el) => {
			addBlobListeners(el);
		});
	});
	document.addEventListener('vue:mounted', console.log);
};

/**
 * @param {Element} el
 */
export const addBlobListeners = (el) => {
	const blob = document.querySelector('#blob');

	el.addEventListener('mouseenter', () => {
		blob?.animate(
			[
				{
					transform: 'scale(1)',
					filter: 'brightness(1) blur(8vmax)',
				},
				{
					transform: 'scale(1.2)',
					filter: 'brightness(1.5) blur(8vmax)',
				},
			],
			{
				duration: 250,
				fill: 'forwards',
			}
		);
	});
	el.addEventListener('mouseleave', () => {
		blob?.animate(
			[
				{
					transform: 'scale(1.2)',
					filter: 'brightness(1.5) blur(8vmax)',
				},
				{
					transform: 'scale(1)',
					filter: 'brightness(1) blur(8vmax)',
				},
			],
			{
				duration: 250,
				fill: 'forwards',
			}
		);
	});
};
