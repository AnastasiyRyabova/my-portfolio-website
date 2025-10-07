export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}мин`;
};
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating?: number | null): string {
  if (rating === undefined || rating === null || isNaN(rating)) {
    return 'Нет оценки';
  }
  return rating.toFixed(1).replace('.', ',');
}
