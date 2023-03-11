import { createApp } from 'https://esm.sh/petite-vue@0.4.1';

createApp({
	toastMessage: '',
	/**
	 * @param {PointerEvent} e
	 */
	addToCart(e) {
		const currentCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
		// currentCart.push(e.target);
		/**
		 * @type {HTMLButtonElement}
		 */
		// @ts-ignore: we know what it is
		const target = e.target;
		this.toastMessage = `Added 1 ${
			target.parentElement?.querySelector('#name')?.textContent
		} flight to cart for ${
			target.parentElement?.querySelector('#price')?.textContent
		}`;
		localStorage.setItem('cart', JSON.stringify(currentCart));
		new globalThis.bootstrap.Toast('#addToCartToast').show();
	},
}).mount('#main');
