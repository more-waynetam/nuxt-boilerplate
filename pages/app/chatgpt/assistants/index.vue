<template>
  <v-sheet style="width: 100%">
    <v-card color="background" min-height="400" width="100%" max-width="960" class="mx-auto">
      <v-card-title class="my-5"
        ><h1>{{ $t("chat.assistant") }}</h1></v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col
            class="flex-grow"
            v-for="(agent, index) in chatStore.agents"
            :key="index"
            cols="4"
          >
            <AgentItem :agent="agent" @edit="handleAgentForm(agent)" />
          </v-col>
          <v-col class="align-stretch" cols="4">
            <v-card
              variant="outlined"
              class="h-100"
              @click="handleAgentForm()"
              min-height="250"
            >
              <v-card-text
                class="justify-center align-center d-flex fill-height"
              >
                <v-icon color="disabled" size="100">mdi-plus</v-icon>
              </v-card-text>
            </v-card>
            <AgentFormDialog
              ref="formDialog"
              v-model="isShowAgentForm"
              @addSucccess="handleAgentFormSuccess"
              @cancel="handleAgentFormClose"
              @updateSuccess="handleAgentFormSuccess"
            ></AgentFormDialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import type { Ref } from "vue";
import { ref } from "vue";
import { useChatStore } from "~/stores/useChatStore";
const chatStore = useChatStore();
const isShowAgentForm = ref(false);
const formDialog: Ref<any> = ref(null);

const handleAgentForm = (agent?: any) => {
  isShowAgentForm.value = true;
  formDialog.value?.initForm(agent);
};

const handleAgentFormClose = () => {
  isShowAgentForm.value = false;
};

const handleAgentFormSuccess = async (agent: any) => {
  chatStore.fetchAgents();
  isShowAgentForm.value = false;
};

const { data: agents } = useAsyncData(async () => {
  await chatStore.fetchAgents();
  return chatStore.agents;
});


// @ts-ignore
definePageMeta({
  title: "ChatGPT Assistants",
  description: "Select assistants",
  layout: "full-height",
});
</script>
