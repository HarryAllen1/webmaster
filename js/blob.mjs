export const initBlob = () => {
	const blob = document.createElement('div');
	blob.id = 'blob';

	document.body.prepend(blob);
	globalThis.addEventListener('mousemove', ({ clientX, clientY }) => {
		if (clientX > window.innerWidth || clientY > window.innerHeight) return;
		console.log(clientX, clientY);
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
