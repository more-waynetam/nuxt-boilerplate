<template>
  <v-card variant="flat" class="bg-white rounded-lg">
    <v-img :src="workspace.avatar" class="bg-grey-lighten-2 mt-n5" height="150px" cover />
    <v-card-text class="d-flex flex-column align-center py-5">
      <h2 class="mt-6">{{ workspace.name }}</h2>
      <p class="my-2 text-center text-disabled">{{ workspace.description }}</p>
      <v-btn
        class="mt-10 text-white"
        rounded
        block
        variant="flat"
        color="primary"
        :to="`/app/workspace/${workspace._id}`"
        >Open</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { VCard } from "vuetify/lib/components/index.mjs";
defineProps({
  workspace: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["edit"]);
</script>
