// https://codepen.io/Prachl/pen/jjKzEy
// modified for ES6 and added types
// omitted throttle function since idgaf about performance

/** @param {number} intensity */
export const parallax = (intensity = -0.4) => {
	return () => {
		const scrolled = window.pageYOffset;
		const coords = scrolled * intensity + 'px';
		/** @type {NodeListOf<HTMLElement>} */
		const elements = document.querySelectorAll('.parallax');
		for (const el of elements)
			el.style.transform = 'translateY(' + coords + ')';
	};
};
