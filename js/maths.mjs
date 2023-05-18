/**
 * @param {number} cx
 * @param {number} cy
 * @param {number} ex
 * @param {number} ey
 * @returns angle in radians
 */
export const angle = (cx, cy, ex, ey) => Math.atan2(ey - cy, ex - cx);
