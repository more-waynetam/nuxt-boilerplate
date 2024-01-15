<template>
  <v-card variant="flat" class="bg-white">
    <v-card-text class="d-flex flex-column align-center py-5">
      <v-avatar size="100" class="bg-red">
        <v-img :src="assistant.avatar" />
      </v-avatar>
      <h2 class="mt-6">{{ assistant.name }}</h2>
      <p class="my-2 text-center text-disabled">{{ assistant.description }}</p>
      <v-btn
        class="mt-10 text-white"
        rounded
        block
        variant="flat"
        color="primary"
        @click="$emit('edit', assistant)"
        >Edit</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { VCard } from "vuetify/lib/components/index.mjs";
defineProps({
  assistant: {
    type: Object,
    required: true,
  }
});

const emits=defineEmits(["edit"])
</script>
