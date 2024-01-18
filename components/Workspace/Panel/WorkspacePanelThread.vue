<template>
  <v-expansion-panel title="Threads" :rounded="0" :elevation="0">
    <v-expansion-panel-text>
      <p v-if="!threads?.length" class="my-5 text-disabled">No thread found.</p>
      <v-list v-else class="mb-5 mx-n6">
        <template v-for="(thread, index) in threads" :key="index">
          
          <v-list-item :title="thread.name" :class="{'bg-secondary':chatgptStore.currentThread?._id==thread._id}">
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-list>
      <v-btn block color="primary" flat @click="addThreadHandler"
        >Add thread</v-btn
      >
      <ChatThreadsDialog
        ref="threadsDialog"
        v-model="showThreadsDialog"
        @submit="submitThreadHandler"
        @cancel="showThreadsDialog = false"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { useChatgptStore } from "@/stores/useChatgptStore";
import type { IThread } from "~/models/openai.model";

const chatgptStore = useChatgptStore();
const workspaceStore = useWorkspaceStore();
const showThreadsDialog = ref(false);
const threadsDialog = ref();

const addThreadHandler = () => {
  showThreadsDialog.value = true;
  threadsDialog.value?.initForm({
    name: "new chat",
    visibility: "private",
  });
};

const props = defineProps({
  workspaceId: {
    type: String,
    required: true,
  },
});

const {
  data: threads,
  refresh,
  pending,
} = useAsyncData("threads", async () => {
  const result = await workspaceStore.getWorkspaceThreads(props.workspaceId);
  return result;
});

const submitThreadHandler = async (thread: IThread) => {
  const res = await chatgptStore.createThread(thread);
  if (res?._id) {
    const res2 = await workspaceStore.addWorkspaceThread(
      props.workspaceId,
      res._id
    );
    chatgptStore.currentThread = res;
    refresh();
  }
  showThreadsDialog.value = false;
};
</script>
