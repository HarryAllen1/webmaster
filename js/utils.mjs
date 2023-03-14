/**
 * @param {number} ms
 * @returns A promise that resolves after ms
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {string} str
 */
export const toStartCase = (str) =>
	str.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');
