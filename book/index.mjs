import { createApp } from 'https://esm.sh/petite-vue@0.4.1';
import Toastify from 'https://esm.sh/toastify-js@1.12.0';
import { CART_KEY } from '../js/constants.mjs';
import { plans } from '../js/plans.mjs';

const app = createApp({
	toastMessage: '',
	/**
	 * @param {PointerEvent} e
	 */
	addToCart(e) {
		/** @type {[string, number][]} */
		const currentCart = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
		/**
		 * @type {HTMLButtonElement}
		 */
		// @ts-ignore: javascript moment
		const target = e.target;
		const name = target.parentElement?.parentElement?.querySelector('#name')
			?.textContent ?? '';

		const productIndex = currentCart.findIndex((v) => v[0] === name);
		if (productIndex === -1) {
			currentCart.push([name, 1]);
		} else {
			if (
				currentCart[productIndex][1] >=
					(plans.find((i) => i.name === name)?.maxPeople ?? 0)
			) {
				return Toastify({
					text: `Max number of ${name} bookings reached.`,
					style: {
						background: 'var(--bs-danger)',
					},
					position: 'center',
					gravity: 'bottom',
					close: true,
				}).showToast();
			}
			currentCart[productIndex][1]++;
		}
		Toastify({
			text: `Added 1 ${name} flight to cart for ${target.parentElement
				?.parentElement?.querySelector('#price')
				?.textContent}`,
			style: {
				background: 'var(--bs-blue)',
			},
			position: 'center',
			gravity: 'bottom',
			close: true,
		}).showToast();
		localStorage.setItem(CART_KEY, JSON.stringify(currentCart));
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: currentCart.reduce((acc, v) => acc + v[1], 0),
			},
		});

		document.dispatchEvent(event);
	},
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
