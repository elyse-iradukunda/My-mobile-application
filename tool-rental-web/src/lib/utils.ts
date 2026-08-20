export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency: string = 'RWF'): string {
  return new Intl.NumberFormat('en-RW', { style: 'currency', currency }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}
