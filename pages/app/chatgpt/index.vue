<template>
  <ChatAppBar @thread-drawer="isThreadDrawerOpen=!isThreadDrawerOpen" @extra-drawer="isExtraDrawerOpen=!isExtraDrawerOpen" />
  <ChatThreadsDrawer v-model="isThreadDrawerOpen" />
  <ChatExtraDrawer :assets="assets" v-model="isExtraDrawerOpen"></ChatExtraDrawer>
  <v-main>
    <ChatMessages
      :items="openaiItems || []"
      @midjourney="handleMidjourney"
      @dalle-3="handleDallE"
    />
  </v-main>
  <v-footer app height="72">
    <ChatInput @send="sendMessage" />
  </v-footer>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import ChatMessages from "~/components/Chat/ChatMessages.vue";
import {
  type IThread,
  type IMessage,
  type IOpenaiItem,
  type IRun,
DallESize,
} from "~/models/openai.model";
import { useChatgptStore } from "~/stores/useChatgptStore";
import { useAssetStore } from "~/stores/useAssetStore";
import { useDisplay } from "vuetify/lib/framework.mjs";

const display=ref(useDisplay())
const isThreadDrawerOpen = ref(display.value.mdAndUp);
const isExtraDrawerOpen = ref(display.value.mdAndUp);



const chatgptStore = useChatgptStore();
const assetStore = useAssetStore();
const {
  data: openaiItems,
  pending: messagesPending,
  refresh: messagesRefresh,
} = useAsyncData(
  "messages",
  async () => {
    const thread: IThread | null = chatgptStore.currentThread;
    const result = await chatgptStore.getMessages(thread?._id);
    const items: IOpenaiItem[] = result.map((item: IMessage) => {
      return {
        data: item,
        type: "message",
      } as IOpenaiItem;
    });
    return items;
  },
  {
    watch: [chatgptStore],
  }
);

const sendMessage = async (message: string) => {
  const thread: IThread | null = chatgptStore.currentThread;
  if (thread && thread._id) {
    const resMessage = await chatgptStore.addMessage(thread._id, message);

    openaiItems.value?.unshift({ type: "message", data: resMessage });

    const run = await chatgptStore.runThread(thread._id);
    openaiItems.value?.unshift({ type: "run", data: run });
    checkSteps();
  }
};

const checkSteps = async () => {
  if (!chatgptStore.currentThread) return;
  if (!openaiItems.value?.[0]) return;
  const lastItem = openaiItems.value[0];
  const thread = chatgptStore.currentThread;
  if (lastItem && lastItem.type == "run" && thread?._id) {
    let lastRun: IRun = lastItem.data;
    lastRun = await chatgptStore.getRun(thread._id, lastRun.id);
    if (!thread?._id || !lastRun?.id) return;
    const steps = await chatgptStore.getSteps(thread._id, lastRun.id);
    openaiItems.value[0].data = { steps, ...lastRun };
    if (lastRun.status == "completed") {
      openaiItems.value.shift();
      const firstMessage: IMessage = openaiItems.value[0].data;
      const result = await chatgptStore.getMessages(thread._id, {
        limit: 1,
        before: firstMessage.id,
      });
      if (result.length > 0) {
        const items: IOpenaiItem[] = result.map((item: IMessage) => {
          return {
            data: item,
            type: "message",
          } as IOpenaiItem;
        });
        openaiItems.value.unshift(...items);
      }
    } else if (lastRun.status == "failed") {
    } else if (lastRun.status == "cancelled") {
    } else if (lastRun.status == "expired") {
    } else if (lastRun.status == "requires_action") {
    } else {
      setTimeout(() => {
        checkSteps();
      }, 1000);
    }
  }
};

const { data: assets, refresh: assetsRefresh } = useAsyncData(
  "assets",
  async () => {
    const thread: IThread | null = chatgptStore.currentThread;
    if (thread && thread?._id) {
      const result = await assetStore.getAssets(thread._id);
      return result;
    }
  },
  {
    watch: [chatgptStore],
  }
);

const handleMidjourney = (content: string) => {
  const threadId = chatgptStore.currentThread?._id;
  const sse = useSse(`/midjourney/sse?threadId=${threadId}&prompt=${content}`);
  assets.value?.data?.unshift({
    uri: "/",
    progress: "pending",
    name: content,
    provider: "midjourney",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "midjourney",
    threadId: threadId,
  });
  const asset = toRef(assets.value?.data?.[0]);
  sse.onmessage = (e: any) => {
    const updatedAsset = JSON.parse(e.data);
    asset.value.progress = updatedAsset.progress;
    asset.value.uri = updatedAsset.uri;
    asset.value.updatedAt = updatedAsset.updatedAt;
    asset.value._id = updatedAsset._id;
    asset.value.extra = updatedAsset.extra;

    if (updatedAsset.progress === "done") {
      console.log("done");
      sse.close();
    }else{
      console.log("progress",updatedAsset.progress);
    }
  };
  sse.onopen = (e: any) => {
    console.log("start");
  };

  sse.onerror = (e: any) => {
    console.log("error");
    sse.close();
  };

  sse.onclose = (e: any) => {
    console.log("close");
  };
};

const handleDallE = (content: string,size:DallESize=DallESize.$1024x1024) => {
  if(! chatgptStore?.currentThread?._id) return;
  const threadId = chatgptStore.currentThread._id;
  assets.value?.data?.unshift({
    uri: "/",
    progress: "pending",
    name: content,
    provider: "dalle-3",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "dalle-3",
    threadId: threadId,
  });
  const asset = toRef(assets.value?.data?.[0]);
  chatgptStore.dallE(threadId, content,size).then((res) => {
    asset.value.uri = res.uri;
    asset.value.createdAt = res.createdAt;
    asset.value._id = res._id;
    asset.value.extra = res.extra;
    asset.value.progress = "done";
  });
};


// @ts-ignore
definePageMeta({
  title: "ChatGPT",
  description: "ChatGPT page",
  layout: "blank",
});
</script>
