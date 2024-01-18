<template>
  <v-expansion-panel title="Assistants" :rounded="0" :elevation="0">
    <v-expansion-panel-text>
      <p v-if="!assistants?.length" class="my-5 text-disabled">
        No assistant found.
      </p>
      <v-list v-else class="mb-5 mx-n6">
        <v-divider></v-divider>
        <template v-for="(assistant, index) in assistants" :key="index">
          <v-list-item
            :title="assistant.name">
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-list>
      <v-btn block color="primary" flat>Add assistant</v-btn>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
const props = defineProps({
  assistants: {
    type: Object,
    required: false,
  },
});
</script>
