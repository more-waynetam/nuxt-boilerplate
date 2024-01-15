import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/useApi";
import type { IAsset } from "~/models/asset.model";
import type { DallESize, IAssistant, IMessage, IParagraph, IThread } from "~/models/openai.model";

export const useChatgptStore = defineStore("chatgptStore", {
  state: () => ({
    currentThread: null as IThread | null,
  }),
  actions: {
    createAssistant: async (assistant: IAssistant): Promise<IAssistant | null> => {
      try {
        const api = useApi();
        const url = `/openai/assistants`;
        const response = await api.post(url, assistant);
        const newAssistant = response.data;
        return newAssistant;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    updateAssistant: async (assistant: IAssistant): Promise<IAssistant | null> => {
      try {
        const api = useApi();
        const url = `/openai/assistants/${assistant._id}`;
        assistant._id = undefined;
        const response = await api.patch(url, assistant);
        const newAssistant = response.data;
        return newAssistant;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getAssistant: async (assistantId: string): Promise<IAssistant | null> => {
      try {
        const api = useApi();
        const url = `/openai/assistants/${assistantId}`;
        const response = await api.get(url);
        const assistant = response.data;
        return assistant;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getAssistants: async (): Promise<Array<IAssistant>> => {
      try {
        const api = useApi();
        const url = `/openai/assistants`;
        const response = await api.get(url);
        const assistants = response.data;
        return assistants;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    getThreads: async (): Promise<Array<IThread>> => {
      const api = useApi();
      const url = `/openai/threads`;
      const response = await api.get(url);
      const threads = response.data;
      return threads;
    },

    createThread: async (thread: IThread): Promise<IThread | null> => {
      const api = useApi();
      const url = `/openai/threads`;
      const response = await api.post(url, thread);
      const newThread = response.data;
      return newThread;
    },
    getMessages: async (
      threadId: string | undefined,
      params:{limit: number,
        after?:string,
        before?:string}= {limit: 20}
      
    ): Promise<Array<IMessage>> => {
      if (!threadId) {
        return [];
      }
      const api = useApi();
      const url = `/openai/threads/${threadId}/messages`;
      const response = await api.get(url,{params});
      const messages = response.data;
      return messages;
    },
    getRun: async (threadId: string,runId:string): Promise<any> => {
      const api = useApi();
      const url = `/openai/threads/${threadId}/runs/${runId}`;
      const response = await api.get(url);
      const run = response.data;
      return run;
    },
    getSteps: async (threadId: string,runId:string): Promise<any> => {
      const api = useApi();
      const url = `/openai/threads/${threadId}/runs/${runId}/steps`;
      const response = await api.get(url);
      const steps = response.data;
      return steps;
    },
    getModelList: async () => {
      const api = useApi();
      const url = `/openai/models`;
      const response = await api.get(url);
      const models = response.data;
      return models;
    },
    addMessage: async (
      threadId: string,
      content: string,
      role: string = "user"
    ) => {
      const api = useApi();
      const url = `/openai/threads/${threadId}/messages`;
      const response = await api.post(url, { content, role });
      const newMessage = response.data;
      return newMessage;
    },
    runThread: async (threadId: string) => {
      const api = useApi();
      const url = `/openai/threads/${threadId}/runs`;
      const response = await api.post(url);
      const run = response.data;
      return run;
    },
    parseContent:(contents: string, markerStart: string="```", markerEnd: string="```"): IParagraph[] =>{
      // Split the content by new lines to separate paragraphs
      const lines = contents.split('\n');
    
      let paragraphs: IParagraph[] = [];
      let currentType = 'text';
      let currentContent: string[] = [];
    
      // Helper function to flush current content to paragraphs
      const flushContent = () => {
        if (currentContent.length > 0) {
          paragraphs.push({
            content: currentContent.join('\n'),
            type: currentType
          });
          currentContent = [];
        }
      };
    
      for (const line of lines) {
        if (line.startsWith(markerStart)) {
          // Flush the content we have so far as a paragraph
          flushContent();
    
          // Set the new type based on the marker
          currentType = line.substring(markerStart.length).trim();
          continue;
        } else if (line.startsWith(markerEnd)) {
          // Flush the content as a paragraph of the current type
          flushContent();
    
          // Reset type to text
          currentType = 'text';
          continue;
        }
    
        // Accumulate lines for the current paragraph
        currentContent.push(line);
      }
    
      // Flush any remaining content
      flushContent();
    
      return paragraphs;
    },
    dallE:async (threadId:string,prompt:string,size:DallESize):Promise<IAsset>=>{
      const api = useApi();
      const url = `/openai/threads/${threadId}/dall-e`;
      const result= await api.post(url,{prompt,size});
      return result.data;
    }
  },
});
