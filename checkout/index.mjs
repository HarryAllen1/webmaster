import { createApp, JSConfetti } from '../deps.mjs';
import { CART_KEY } from '../js/constants.mjs';
import { plans } from '../js/plans.mjs';
import { goto, routerLink } from '../js/router.mjs';
import { sleep } from '../js/utils.mjs';
import { currencyFormatter } from '../js/number_formatter.mjs';

/** @type {[string, number][]} */
const items = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');

/**
 * Implements the Luhn algorithm.
 *
 * @param {string} number
 * @return {boolean}
 */
const isValidCardNumber = (number) => {
	if (
		!number ||
		parseInt(number) === 0 ||
		number.length !== 16 ||
		/[^0-9-\s]+/.test(number)
	) {
		return false;
	}
	let nCheck = 0,
		nDigit = 0,
		bEven = false;

	number = number.replace(/\D/g, '');

	for (let n = number.length - 1; n >= 0; n--) {
		const cDigit = number.charAt(n);
		nDigit = parseInt(cDigit, 10);

		if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

		nCheck += nDigit;
		bEven = !bEven;
	}

	return nCheck % 10 === 0;
};

const app = createApp({
	firstName: '',
	lastName: '',
	card: '',
	expiration: '',
	cvv: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	country: '',
	agree: false,
	items: items.map(
		/** @return {[import('../js/types.d.ts').Product, number]} */
		(i) => [plans.find((p) => p.name === i[0]) ?? plans[0], i[1]]
	),
	numberFormatter: currencyFormatter,

	async submit() {
		const target = document.querySelector('form');
		if (!isValidCardNumber(this.card)) {
			document.querySelector('#card')?.classList.add('is-invalid');
		} else {
			document.querySelector('#card')?.classList.remove('is-invalid');
		}
		if (this.cvv.length !== 3 || !/^[0-9]+$/.test(this.cvv)) {
			document.querySelector('#cvv')?.classList.add('is-invalid');
		} else {
			document.querySelector('#cvv')?.classList.remove('is-invalid');
		}
		target?.classList.add('was-validated');
		if (!target?.checkValidity()) return;

		localStorage.removeItem(CART_KEY);
		const event = new CustomEvent('add-to-cart', {
			detail: {
				count: 0,
			},
		});

		document.dispatchEvent(event);
		const jsConfetti = new JSConfetti();
		jsConfetti.addConfetti();
		const logo = document.querySelector('#nav-logo');
		logo?.classList.add('rocket-animation');
		await sleep(2000);
		logo?.classList.remove('rocket-animation');
		goto('/thanks');
	},
	routerLink,
});
app.mount('#main');
document.addEventListener('page-change', app.unmount);
