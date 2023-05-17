// https://codepen.io/Prachl/pen/jjKzEy
// modified for ES6 and added types

/**
 * @template {(...args: unknown[]) => unknown} T
 * @param {T} fn
 * @param {number} wait
 * @param {Parameters<T>} args
 */
export const throttle = (fn, wait, ...args) => {
	let time = Date.now();
	return () => {
		if (time + wait - Date.now() < 0) {
			fn(args);
			time = Date.now();
		}
	};
};

export const parallax = () => {
	const scrolled = window.pageYOffset;
	const coords = scrolled * 0.4 + 'px';
	/** @type {NodeListOf<HTMLElement>} */
	const elements = document.querySelectorAll('.parallax');
	for (const el of elements) el.style.transform = 'translateY(' + coords + ')';
};
