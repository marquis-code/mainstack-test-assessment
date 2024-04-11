import { axiosInstance } from "@/apiFactory/core/axios.config";
export const transactionApiFactory = {
  $_retrieve_transactions_list() {
    const url = 'transactions';
    return axiosInstance.get(url);
  }
};
