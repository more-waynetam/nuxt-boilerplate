import { defineStore } from "pinia";

export const useWorkspaceStore = defineStore("workspaceStore", {
  state: () => ({}),
  actions: {
    getWorkspaces: async () => {
      const api = useApi();
      const url = `/workspaces`;
      const response = await api.get(url, {
        params: { sorts: "createdAt:-1" },
      });
      const workspaces = response.data;
      return workspaces;
    },
    getWorkspace: async (id: string,isPopulate:boolean=true) => {
      const api = useApi();
      const url = `/workspaces/${id}`;
      const response = await api.get(url,{params:{isPopulate}});
      const workspace = response.data;
      return workspace;
    },
    addWorkspaceThread: async (workspaceId: string, threadId: string) => {
      const api = useApi();
      const url = `/workspaces/${workspaceId}/threads`;
      const response = await api.post(url, { threadId });
      const workspace = response.data;
      return workspace;
    },
    getWorkspaceThreads: async (workspaceId: string) => {
      console.log('workspaceId',workspaceId);
      const api = useApi();
      const url = `/workspaces/${workspaceId}/threads`;
      const response = await api.get(url);
      const threads = response.data;
      return threads;
    }
  },
});
