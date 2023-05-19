export const initGPay = () => {
	/** @type {any} */
	const button = document.querySelector('google-pay-button');
	button.paymentRequest = {
		apiVersion: 2,
		apiVersionMinor: 0,
		allowedPaymentMethods: [
			{
				type: 'CARD',
				parameters: {
					allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
					allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER'],
					billingAddressRequired: true,
				},
				tokenizationSpecification: {
					type: 'PAYMENT_GATEWAY',
					parameters: {
						gateway: 'example',
						gatewayMerchantId: 'exampleGatewayMerchantId',
					},
				},
			},
		],
		merchantInfo: {
			merchantId: '12345678901234567890',
			merchantName: 'Demo Merchant',
		},
		transactionInfo: {
			totalPriceStatus: 'FINAL',
			totalPriceLabel: 'Total',
			totalPrice: '100.00',
			currencyCode: 'USD',
			countryCode: 'US',
		},
	};

	button.addEventListener('loadpaymentdata', () => {
		location.href = '/thanks';
	});
};
