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
};
