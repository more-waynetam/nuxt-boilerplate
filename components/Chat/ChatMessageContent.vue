<template>
  <div
    v-if="message.content[0]?.type == 'text'"
    class="bg-white rounded-lg px-3 py-1 mx-2 mt-3"
  >
    <template
      v-for="(p, index) in parseContent(message.content[0]?.text.value)"
    >
      <p v-if="p.type == 'text'" class="my-2 text-pre-wrap">{{ p.content }}</p>
      <div v-else-if="p.type == 'midjourney'" class="mb-2">
        <v-card
          :rounded="2"
          variant="outlined"
          class="bg-grey-lighten-4 rounded-lg"
        >
          <v-card-text>{{ p.content }}</v-card-text>
        </v-card>
        <p>
          <v-btn
            variant="text"
            @click="$emit('midjourney',p.content)"
            size="x-small"
            color="blue"
            >midjourney</v-btn
          >
          <v-btn variant="text" @click="$emit('dalle-3',p.content)" size="x-small" color="green">DALLE-3</v-btn>
          <v-btn variant="text" @click="$emit('stable-diffusion',p.content)" size="x-small" color="red"
            >stable diffusion</v-btn
          >
        </p>
      </div>
    </template>
  </div>
  <div v-else class="bg-white rounded-lg px-3 py-1 mx-2 mt-3">
    {{ message.content }}
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import type { IMessage } from "~/models/openai.model";
import { useChatgptStore } from "~/stores/useChatgptStore";
const chatgptStore = useChatgptStore();

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    required: true,
  },
});

const parseContent = (content?: string) => {
  if (!content) return [];
  const paragraphs = chatgptStore.parseContent(content);
  return paragraphs;
};

const emit = defineEmits(["midjourney","stable-diffusion","dalle-3"]);
</script>
