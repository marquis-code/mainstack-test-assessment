import { axiosInstance } from "@/apiFactory/core/axios.config";
export const userApiFactory = {
    $_retrieve_user() {
      const url = '/user'
      return axiosInstance.get(url)
   }
  }
  