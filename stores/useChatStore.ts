import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export interface Agent {
  _id?: string;
  name: string;
  description: string;
  avatar: string;
  instructions: string;
  model: string;
  assistantId?: string;
  createdBy?: string;
  visibility: "public" | "private";
  tools: Array<{ type: string }>;
}

export interface Chat {
  _id?: string;
  name: string;
  createdBy?: string;
  agent: string;
  threadId?: string;
  visibility: "public" | "private";
}

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    currentAgent: null as Agent | null | undefined,
    currentChat: null as Chat | null | undefined,
    chats: [] as Chat[],
    agents: [] as Agent[],
  }),

  actions: {
    async getAgent(id: string) {
      const api = useApi();
      const response = await api.get(`/agents/${id}`);
      return response.data;
    },
    async getAgents() {
      const api = useApi();
      const response = await api.get("/agents");
      return response.data;
    },
    async fetchAgents() {
      const api = useApi();
      const response = await api.get("/agents");
      this.agents = response.data;
    },
    async addAgent(agent: Agent) {
      const api = useApi();
      const { data } = await api.post("/agents", agent);
      return data;
    },
    async updateAgent(agent: Agent) {
      const api = useApi();
      const { data } = await api.put(`/agents/${agent._id}`, agent);
      return data;
    },
    async fetchChats(agentId: string) {
      const api = useApi();
      const response = await api.get(`/chats?agent=${agentId}`);
      this.chats = response.data;
    },
    async getChatsByAgent(agentId: string) {
      const api = useApi();
      const response = await api.get(`/chats?agent=${agentId}`);
      return response.data;
    },
    async createChat(chat: Chat) {
      const api = useApi();
      const response = await api.post("/chats", chat);
      return response.data;
    },
    async getChats(agentId: string) {
      const api = useApi();
      const response = await api.get(`/chats?agent=${agentId}`);
      return response.data;
    },
    async getChat(id: string) {
      const api = useApi();
      const response = await api.get(`/chats/${id}`);
      return response.data;
    },
    async getThread(id: string) {
      const api = useApi();
      const response = await api.get(`/threads/${id}`);
      return response.data;
    }
  },
});
