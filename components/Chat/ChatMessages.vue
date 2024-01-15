<template>
  <div class="fill-height d-flex flex-column-reverse">
    <div ref="bottomEl" class="text-grey-lighten-2">.</div>
    <template v-for="(item, index) in items" :key="index">
      <ChatItemMessage
        v-if="item.type == 'message'"
        :message="item.data"
        @midjourney="(content:string) => $emit('midjourney', content)"
        @dalle-3="(content:string) => $emit('dalle-3', content)"
        @stable-diffusion="(content:string) => $emit('stable-diffusion', content)"
      ></ChatItemMessage>
      <ChatItemRun
        v-else-if="item.type == 'run'"
        :run="item.data"
      ></ChatItemRun>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { ChatItemRun } from "#build/components";
import { defineProps } from "vue";
import { VListItemSubtitle } from "vuetify/lib/components/index.mjs";
import type { IOpenaiItem } from "~/models/openai.model";

const bottomEl= ref<HTMLElement | null>(null);

const props = defineProps({
  items: {
    type: Array<IOpenaiItem>,
    required: true,
  }
});

watch(()=>props.items,() => {
  if (bottomEl.value) {
    nextTick(() => {
      console.log("scrolling to bottom");
      bottomEl.value?.scrollIntoView({ behavior: "smooth"});
    });
  }
});

const emits = defineEmits(["midjourney", "stable-diffusion", "dalle-3"]);
</script>
