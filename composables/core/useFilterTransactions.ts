// composables/useFilterTransactions.ts
interface Transaction {
  title: string;
  user: string;
  type: string;
  date: string;
  status: string;
  amount: string;
}

interface FilterCriteria {
  title?: string;
  user?: string;
  type?: string;
  date?: string;
  status?: string;
  amount?: string;
}

export function useFilterTransactions(transactions: Ref<Transaction[]>) {
  const filterTransactions = (criteria: FilterCriteria): Transaction[] => {
    return transactions.value.filter((transaction) => {
      return Object.entries(criteria).every(([key, value]) => {
        if (!value) return true; // Skip filtering for empty criteria
        // Special handling for amount to compare numerical values
        if (key === 'amount') {
          const transactionAmount = parseFloat(transaction.amount.replace(/USD\s*/, ''));
          const criteriaAmount = parseFloat(value);
          return transactionAmount === criteriaAmount;
        }
        return transaction[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  return { filterTransactions };
}
