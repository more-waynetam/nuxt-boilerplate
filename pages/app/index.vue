<template>
  <v-sheet>
    <v-row>
      <v-col>
        <v-card min-width="320" height="200" class="d-flex flex-column">
          <v-card-text>
            <h2 class="text-h3">{{  $t('common.assistant') }}</h2>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn to="/app/lab" size="x-large" color="primary">{{ $t('common.enter') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="primary" min-width="320" height="200" class="d-flex flex-column bg-primary">
          <v-card-text>
            <h2 class="text-h3">{{ $t('common.chatgpt') }}fffff</h2>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn to="/app/chatgpt" size="x-large" color="primary">{{ $t('common.enter') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-width="320" height="200" class="d-flex flex-column">
          <v-card-text>
            <h2 class="text-h3">{{ $t('common.setting') }}</h2>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="justify-end">
            <v-btn size="x-large" color="primary">{{ $t('common.enter') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
// @ts-ignore
definePageMeta({
  title: "Home",
  description: "Home page",
  layout: "full-height",
});
</script>
