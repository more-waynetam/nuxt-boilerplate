<template>
  <v-card variant="flat" class="bg-white">
    <v-card-text class="d-flex flex-column align-center py-5">
      <v-avatar size="100" color="secondary">
        <v-img :src="agent.avatar" />
      </v-avatar>
      <h2 class="mt-6">{{ agent.name }}</h2>
      <p class="my-2 text-center text-disabled">{{ agent.instructions }}</p>
      <v-btn
      v-if="showActions"
        class="mt-10 text-white"
        rounded
        block
        variant="flat"
        color="primary"
        :to="`/app/chatgpt/${agent._id}`"
        >select</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { VCard } from "vuetify/lib/components/index.mjs";
defineProps({
  agent: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});
</script>
