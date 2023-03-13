import { createApp, reactive } from 'https://esm.sh/petite-vue@0.4.1';
import { plans } from '../js/plans.mjs';

/** @type {[import('../js/types').Product, import('../js/types').Product]} */
const selectedPlan = reactive([plans[0], plans[1], plans[2]]);

const app = createApp({
	plans,
	selectedPlan,
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
