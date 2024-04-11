export function useNumberFormatter() {
    const formatMoney = (money: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(money);
    };
  
    return { formatMoney };
  }
  