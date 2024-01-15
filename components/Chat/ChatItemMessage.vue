<template>
  <div class="d-flex" :class="roleCss(message)">
    <div v-if="message.role == 'user'">
      <ChatMessageContent :message="message" class="bg-primary" />
      <p class="mx-3 my-1 text-caption text-right">
        {{ $moment.unix(message.created_at).fromNow() }}
      </p>
    </div>
    <div v-else>
      <ChatMessageContent
        :message="message"
        @midjourney="(content:string) => $emit('midjourney', content)"
        @dalle-3="(content:string) => $emit('dalle-3', content)"
        @stable-diffusion="(content:string) => $emit('stable-diffusion', content)"
      />
      <p class="mx-3 my-1 text-caption text-left">
        {{ $moment.unix(message.created_at).fromNow() }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ChatMessageContent } from "#build/components";
import type { PropType } from "vue";
import { defineProps } from "vue";
import type { IMessage } from "~/models/openai.model";

const roleCss = (message: IMessage) => {
  return message.role == "user" ? "justify-end" : "justify-start";
};

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    required: true,
  },
});
const emits = defineEmits(["midjourney", "stable-diffusion", "dalle-3"]);
</script>
