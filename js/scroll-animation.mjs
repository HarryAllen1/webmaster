const observer = new IntersectionObserver((entries) => {
	entries.forEach((e) => {
		if (e.isIntersecting) {
			/** @type {HTMLElement} */
			// @ts-ignore we only observe actual html elements
			const target = e.target;
			const animations = target?.dataset.aos;
			if (animations) {
				target.classList.add(
					...animations.replaceAll(/\s{2,}/g, ' ').split(' '),
					'animating'
				);
			}
		} else {
			/** @type {HTMLElement} */
			// @ts-ignore we only observe actual html elements
			const target = e.target;
			const animations = target?.dataset.aos;
			if (animations && !target.dataset.aosOnce) {
				target.classList.remove(...animations.split(' '), 'animating');
			}
		}
	});
});

document.querySelectorAll('[data-aos]').forEach((el) => {
	observer.observe(el);
});
