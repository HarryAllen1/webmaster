import { createApp } from '../deps.js';
import { CART_KEY } from '../js/constants.mjs';
import { plans } from '../js/plans.mjs';
import { goto, routerLink } from '../js/router.mjs';

/** @type {[string, number][]} */
const items = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');

/**
 * @typedef {[import('../js/types.d.ts').Product, number]} QuantityData
 */

const app = createApp({
	name: '',
	policyNumber: '',
	agree: false,
	items: items.map(
		/** @return {[import('../js/types.d.ts').Product, number]} */
		(i) => [plans.find((p) => p.name === i[0]) ?? plans[0], i[1]]
	),
	numberFormatter: new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}),
	clearCart() {
		if (!confirm('Are you sure you want to clear your cart?')) return;
		this.items = [];
		localStorage.setItem(CART_KEY, '[]');
	},
	/**
	 * @param {string} name
	 * @param {string} c
	 */
	changeQuantity(name, c) {
		const count = parseInt(c);
		this.items.find(
			/** @param {QuantityData} v */
			(v) => v[0].name === name
		)[1] = count;

		localStorage.setItem(
			CART_KEY,
			JSON.stringify(
				this.items.map(
					/** @param {QuantityData} v */
					(v) => [v[0].name, v[1]]
				)
			)
		);
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: this.items.reduce(
					/**
					 * @param {number} acc
					 * @param {[string, number]} v
					 */
					(acc, v) => acc + v[1],
					0
				),
			},
		});
		document.dispatchEvent(event);
	},
	/**
	 * @param {string} name
	 */
	removeItem(name) {
		this.items = this.items.filter(
			/** @param {QuantityData} v */
			(v) => v[0].name !== name
		);

		localStorage.setItem(
			CART_KEY,
			JSON.stringify(
				this.items.map(
					/** @param {QuantityData} v */
					(v) => [v[0].name, v[1]]
				)
			)
		);
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: this.items.reduce(
					/**
					 * @param {number} acc
					 * @param {[string, number]} v
					 */
					(acc, v) => acc + v[1],
					0
				),
			},
		});
		document.dispatchEvent(event);
	},
	goto,
	routerLink,
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
