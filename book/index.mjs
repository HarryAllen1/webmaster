import { createApp, Toastify } from '../deps.mjs';
import { CART_KEY } from '../js/constants.mjs';
import { currencyFormatter } from '../js/number_formatter.mjs';
import { plans } from '../js/plans.mjs';
import { goto } from '../js/router.mjs';

const app = createApp({
	toastMessage: '',
	currencyFormatter,
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
		const name =
			target.parentElement?.parentElement
				?.querySelector('#name')
				?.textContent?.trim() ?? '';

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
						background: 'rgb(239 68 68) /* bg-red-500 */',
					},
					position: 'center',

					gravity: 'bottom',
					close: true,
					onClick: () => goto('/cart'),
				}).showToast();
			}
			currentCart[productIndex][1]++;
		}
		Toastify({
			text: `Added 1 ${name} flight to cart for ${
				target.parentElement?.parentElement?.querySelector('#price')
					?.textContent
			}`,
			style: {
				background: 'rgb(59 130 246) /* bg-blue-500 */',
			},
			position: 'center',
			gravity: 'bottom',
			close: true,
			onClick: () => goto('/cart'),
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
document.addEventListener('page-change', app.unmount);
