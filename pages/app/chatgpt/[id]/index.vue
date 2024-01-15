<template>
  <ChatAppBar/>
  <ChatThreadsDrawer :agent="agent"/>
  <v-main> </v-main>
  <ChatSavedDrawer />
  <v-footer app height="72">
    <v-text-field
      bg-color="white"
      flat
      hide-details
      density="compact"
      variant="solo-filled"
      rounded="pill"
      append-inner-icon="mdi-microphone"
    >
      <template v-slot:append>
        <v-btn color="secondry" variant="plain" icon="mdi-note-edit"></v-btn>
        <v-btn color="primary" variant="plain" icon="mdi-send"></v-btn>
      </template>
    </v-text-field>
  </v-footer>
</template>
<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";
import { useChatStore, type Agent } from "~/stores/useChatStore";
const chatStore = useChatStore();
const route = useRoute();
const agentId = route.params.id as string;

const {data:agent}=useAsyncData(async()=>{
  return await chatStore.getAgent(agentId);
});

// @ts-ignore
definePageMeta({
  title: "ChatGPT",
  description: "ChatGPT page",
  layout: "blank",
});
</script>
