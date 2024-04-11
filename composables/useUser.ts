import { userApiFactory } from "@/apiFactory/modules/user";
export const useUser = () => {
  const loading = ref(false);
  const user = ref({}) as Record<string, any>;
  const getUser = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.$_retrieve_user();
      user.value = response.data;
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  return { getUser, loading, user };
};
