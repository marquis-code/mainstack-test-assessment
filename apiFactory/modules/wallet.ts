import { axiosInstance } from "@/apiFactory/core/axios.config";
export const walletApiFactory = {
  $_retrieve_wallet_data () {
    const url = "/wallet";
    return axiosInstance.get(url);
  }
}
