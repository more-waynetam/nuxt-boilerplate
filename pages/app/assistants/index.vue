<template>
  <v-row>
    <v-col><h1 class="text-h2 text-uppercase">Assistant</h1></v-col>
  </v-row>
  <v-row>
    <v-col><v-btn variant="outlined" @click="showAssistantForm()">new</v-btn></v-col>
    <AssistantFormDialog
          ref="dialogFormRef"
          @submit="submitHandle"
          @cancel="cancelHandle"
          v-model="dialog"
          width="auto"
        ></AssistantFormDialog>
  </v-row>
  <v-row>
    <v-col
      cols="1"
      md="4"
      lg="3"
      v-for="(assistant, index) in assistants"
      :key="index"
      ><assistant-item :assistant="assistant" @edit="showAssistantForm(assistant)"></assistant-item>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import AssistantFormDialog from "~/components/Assistant/AssistantFormDialog.vue";
import { VRow, VCol, VBtn } from "vuetify/components";
import type { IAssistant } from "~/models/openai.model";
import { useChatgptStore } from "~/stores/useChatgptStore";
const dialog = ref(false);
const dialogFormRef=ref();
const chatgptStore = useChatgptStore();

const { data: assistants,refresh } = useAsyncData(async () => {
  return await chatgptStore.getAssistants();
});

const showAssistantForm = (assistant?:IAssistant) => {
  dialog.value = true;
  dialogFormRef.value?.initForm(assistant);
};

const submitHandle = async (assistant: IAssistant) => {
  if(assistant._id) {
    await chatgptStore.updateAssistant(assistant);
  }else{
    await chatgptStore.createAssistant(assistant);
  }
  dialog.value = false;
  refresh();
};

const cancelHandle = () => {
  dialog.value = false;
};
</script>
