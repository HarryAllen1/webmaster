import { createApp } from 'https://esm.sh/petite-vue@0.4.1';
import { plans } from '../js/plans.mjs';

const app = createApp({
	items: JSON.parse(localStorage.getItem('cart') ?? '[]').map(
		/** @param {string} i */
		(i) => plans.find((p) => p.name === i),
	),
	clearCart() {
		if (!confirm('Are you sure you want to clear your cart?')) return;
		this.items = [];
		localStorage.setItem('cart', '[]');
	},
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
