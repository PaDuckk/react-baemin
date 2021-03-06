export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount)
}
