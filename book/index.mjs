import { createApp } from 'https://esm.sh/petite-vue@0.4.1';
import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify-es.min.js';

const app = createApp({
	toastMessage: '',
	/**
	 * @param {PointerEvent} e
	 */
	addToCart(e) {
		const currentCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
		/**
		 * @type {HTMLButtonElement}
		 */
		// @ts-ignore: we know what it is
		const target = e.target;
		Toastify({
			text: `Added 1 ${
				target.parentElement?.parentElement?.querySelector('#name')?.textContent
			} flight to cart for ${
				target.parentElement?.parentElement?.querySelector('#price')
					?.textContent
			}`,
			style: {
				background: 'var(--bs-blue)',
			},
			position: 'right',
			gravity: 'bottom',
			close: true,
		}).showToast();
		currentCart.push(
			target.parentElement?.parentElement?.querySelector('#name')?.textContent
		);
		localStorage.setItem('cart', JSON.stringify(currentCart));
		// emit add-to-cart event
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: JSON.parse(localStorage.getItem('cart') ?? '[]').length,
			},
		});
		document.dispatchEvent(event);
	},
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
