import { walletApiFactory } from "@/apiFactory/modules/wallet";
export const useWallet = () => {
  const loading = ref(false);
  const wallet = ref({}) as Record<string, any>;
  const getWallet = async () => {
    loading.value = true;
    try {
      const response =
        await walletApiFactory.$_retrieve_wallet_data();
         wallet.value = response.data;
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  return { getWallet, loading, wallet };
};
