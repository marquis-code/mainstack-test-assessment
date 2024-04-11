import axios, { AxiosResponse } from "axios";
// import { useLogin } from "@/composables/modules/auth/login";

export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}
export const axiosInstance = axios.create({
  baseURL: "https://fe-task-api.mainstack.io/",
});

axiosInstance.interceptors.request.use((config: any) => {
//   const { token } = useLogin();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token.value}`;
//   }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: CustomAxiosResponse) => {
    return response;
  },
  (error) => {
    if (typeof error.response === "undefined") {
      useNuxtApp().$toast.error("kindly check your network connection", {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    } else {
      useNuxtApp().$toast.error(error.response
        , {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    }
  }
);
