// Placeholder utilities can be added here
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
