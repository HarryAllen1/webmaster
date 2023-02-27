/**
 * @param {number} ms
 * @returns A promise that resolves after ms
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
