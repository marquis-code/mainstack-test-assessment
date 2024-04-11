import { transactionApiFactory } from "@/apiFactory/modules/transaction";

interface Transaction {
  amount: number;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: string;
  type: string;
  date: string;
}

export const useTransaction = () => {
  const loading = ref(false);
  const transactions = ref<Transaction[]>([]); // This would be your actual transactions data
  const filteredTransactions = ref<Transaction[]>([]);

  const getTransactions = async () => {
    loading.value = true;
    try {
      const response =
        await transactionApiFactory.$_retrieve_transactions_list();
      transactions.value = response.data;
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

 const filterTransactions = (dateFrom: string, dateTo: string, statuses: string[], types: string[], productNames: string[]) => {
   if(transactions.value.length){
    filteredTransactions.value = transactions.value.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const isWithinDateRange = transactionDate >= startDate && transactionDate <= endDate;
      const isStatusMatch = statuses.length === 0 || statuses.includes(transaction.status.toLowerCase().trim());
      const isTypeMatch = types.length === 0 || (transaction.metadata && types.includes(transaction.metadata.type));
      const isProductNameMatch = productNames.length === 0 || (transaction.metadata?.product_name && productNames.includes(transaction.metadata.product_name));
      return isWithinDateRange && isStatusMatch && isTypeMatch && isProductNameMatch;
    });
   }
  }

  return { getTransactions, filterTransactions, filteredTransactions, loading, transactions };
};
