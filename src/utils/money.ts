export const toCents = (price: string): number =>
  Math.round(parseFloat(price.replace("$", "")) * 100);

export const formatCents = (cents: number): string =>
  `$${(cents / 100).toFixed(2)}`;

export function calculateOrderTotals(prices: string[], taxRate = 0.08) {
  const itemTotal = prices.reduce((sum, p) => sum + toCents(p), 0);
  const tax = Math.round(itemTotal * taxRate);
  return { itemTotal, tax, total: itemTotal + tax };
}