<template>
  <div class="d-flex justify-start">
    <div>
      <div class="bg-white rounded-lg px-3 py-1 mx-2 mt-3">
        {{ run.status }} ...
        <v-progress-circular indeterminate color="primary" size="small"></v-progress-circular>
      </div>
      <p class="mx-3 my-1 text-caption text-left">
        {{ $moment.unix(run.created_at).fromNow() }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps } from "vue";
import type { IRun } from "~/models/openai.model";
const props = defineProps({
  run: {
    type: Object as PropType<IRun>,
    required: true,
  },
});
</script>
