import { defineStore } from "pinia";

export const useAssetStore = defineStore("assetStore", {
  state: () => ({
    
  }),
  actions: {
    getAssets: async (threadId:string) => {
      const api = useApi();
      const url = `/assets`;
      const response = await api.get(url, {params:{threadId,sorts:'createdAt:-1'}});
      const assets = response.data;
      return assets;
    }

  },
});
