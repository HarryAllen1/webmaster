import { createApp, reactive } from '../deps.mjs';
import { currencyFormatter } from '../js/number_formatter.mjs';
import { plans } from '../js/plans.mjs';
import { toStartCase } from '../js/utils.mjs';

const selectedPlan = reactive([plans[0], plans[1], plans[2]]);

const app = createApp({
	plans,
	selectedPlan,
	formatter: currencyFormatter,
	toStartCase,
});
app.mount('#main');
document.addEventListener('page-change', () => {
	app.unmount();
});
customElements.define(
	'wm-divider',
	class extends HTMLElement {
		constructor() {
			super();
			this.innerHTML = `
				<span class="flex flex-row items-center my-4">
					<div class="flex-1 h-[1px] bg-gray"></div>
					<p class="mx-4 mb-0">${this.getAttribute('label')}</p>
					<div class="flex-1 h-[1px] bg-gray"></div>
				</span>`;
		}
	}
);
