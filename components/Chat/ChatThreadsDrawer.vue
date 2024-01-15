<template>
  <v-navigation-drawer width="244" :elevation="0" :permanent="true">
    <v-sheet width="100%" class="pa-4">
      <p v-if="!threadsPending && threads.length == 0">
        {{ $t("chat.no-chats") }}
      </p>
      <v-list class="my-5" v-if="!threadsPending && threads.length > 0">
        <v-list-item
          class="rounded-xl"
          v-for="(thread, index) in threads"
          :class="{
            'bg-primary': chatgptStore.currentThread?._id == thread._id,
          }"
          :key="index"
          @click="chatgptStore.currentThread = thread"
          :title="thread.name"
          link
        ></v-list-item>
      </v-list>
      <v-btn rounded color="primary" variant="outlined" block>
        {{ $t("chat.add-chat") }}
        <v-dialog activator="parent" v-model="showNewChatDialog">
          <v-form v-model="isValid">
            <v-card maxWidth="320" class="mx-auto w-100">
              <v-card-title>
                {{ $t("chat.add-chat") }}
              </v-card-title>
              <v-card-text>
                <v-select
                  v-model="assistantField"
                  :items="/* @ts-ignore */ assistants"
                  :label="$t('chat.assistant')"
                  itemTitle="name"
                  itemValue="_id"
                  variant="outlined"
                  dense
                  class="mt-5"
                  :rules="[(v:any) => !!v || 'Assistant is required']"
                ></v-select>
                <v-text-field
                  v-model="nameField"
                  :label="$t('chat.chat-name')"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                  :rules="[(v:any) => !!v || 'Chat name is required']"
                ></v-text-field>
                <v-chip-group filter mandatory v-model="visiblityField">
                  <v-chip value="public" color="secondary">Public</v-chip>
                  <v-chip value="private" color="secondary">Private</v-chip>
                  <v-chip value="visible" color="secondary">Visible</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="showNewChatDialog = false">{{
                  $t("common.cancel")
                }}</v-btn>
                <v-btn
                  :disabled="!isValid"
                  color="primary"
                  @click="handleForm"
                  >{{ $t("common.ok") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-btn>
    </v-sheet>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { AxiosError } from "axios";
import { useAsyncData } from "nuxt/app";
import type { Ref } from "vue";
import { ref } from "vue";
import type { IAssistant, IThread } from "~/models/openai.model";
import { useChatgptStore } from "~/stores/useChatgptStore";

const chatgptStore = useChatgptStore();
const isValid = ref(false);
const nameField = ref("");
const assistantField = ref("");
const visiblityField: Ref<"public" | "private" | "visible"> = ref("private");
const showNewChatDialog = ref(false);

const assistants = ref<Array<IAssistant>>([]);
const threads = ref<Array<IThread>>([]);

const {
  data: assistantsData,
  pending: assistantsPending,
  refresh: assistantsRefresh,
} = useAsyncData("assistants", async () => {
  const result = await chatgptStore.getAssistants();
  assistants.value = result;
  return result;
});

const {
  data: threadsData,
  pending: threadsPending,
  refresh: threadsRefresh,
} = useAsyncData("threads", async () => {
  const result = await chatgptStore.getThreads();
  if (chatgptStore.currentThread == null) {
    chatgptStore.currentThread = result[0];
  }
  threads.value = result;
  return threads;
});

const handleForm = async () => {
  if (!isValid.value) return;
  try {
    await chatgptStore.createThread({
      name: nameField.value,
      visibility: visiblityField.value,
      assistantId: assistantField.value,

    });
    nameField.value = "";
    assistantField.value = "";
    threadsRefresh();
    showNewChatDialog.value = false;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error=e as AxiosError;
      if (error.response?.status == 400) {
        const data:any=error.response?.data;
        if(data?.message){
          alert(data.message);
        }
      }
    } else {
      console.log(e);
    }
  }
};
</script>
