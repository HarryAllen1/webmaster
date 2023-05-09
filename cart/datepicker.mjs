import {
	Datepicker,
	DateRangePicker,
} from 'https://esm.sh/flowbite-datepicker@1.2.2/js/main.js?bundle';
import Events from 'https://esm.sh/flowbite@1.6.5/lib/esm/dom/events.js?bundle';

/**
 * @param {Element} datepickerEl
 */
const getDatepickerOptions = (datepickerEl) => {
	const buttons = datepickerEl.hasAttribute('datepicker-buttons');
	const autohide = datepickerEl.hasAttribute('datepicker-autohide');
	const format = datepickerEl.hasAttribute('datepicker-format');
	const orientation = datepickerEl.hasAttribute('datepicker-orientation');
	const title = datepickerEl.hasAttribute('datepicker-title');

	const options = {};
	if (buttons) {
		options.todayBtn = true;
		options.clearBtn = true;
	}
	if (autohide) {
		options.autohide = true;
	}
	if (format) {
		options.format = datepickerEl.getAttribute('datepicker-format');
	}
	if (orientation) {
		options.orientation = datepickerEl.getAttribute('datepicker-orientation');
	}
	if (title) {
		options.title = datepickerEl.getAttribute('datepicker-title');
	}

	return options;
};

export function initDatepickers() {
	document.querySelectorAll('[datepicker]').forEach(function (datepickerEl) {
		new Datepicker(datepickerEl, getDatepickerOptions(datepickerEl));
	});

	document
		.querySelectorAll('[inline-datepicker]')
		.forEach(function (datepickerEl) {
			new Datepicker(datepickerEl, getDatepickerOptions(datepickerEl));
		});

	document
		.querySelectorAll('[date-rangepicker]')
		.forEach(function (datepickerEl) {
			new DateRangePicker(datepickerEl, getDatepickerOptions(datepickerEl));
		});
}

const events = new Events('DOMContentLoaded', [initDatepickers]);
events.init();
