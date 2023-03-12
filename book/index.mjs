import { createApp } from 'https://esm.sh/petite-vue@0.4.1';
// @deno-types="npm:@types/bootstrap"

createApp({
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
		this.toastMessage = `Added 1 ${
			target.parentElement?.parentElement?.querySelector('#name')?.textContent
		} flight to cart for ${
			target.parentElement?.parentElement?.querySelector('#price')?.textContent
		}`;
		currentCart.push(
			target.parentElement?.parentElement?.querySelector('#name')?.textContent
		);
		localStorage.setItem('cart', JSON.stringify(currentCart));
		new globalThis.bootstrap.Toast('#addToCartToast').show();
		// emit add-to-cart event
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: currentCart.length + 1,
			},
		});
		document.dispatchEvent(event);
	},
}).mount('#main');
