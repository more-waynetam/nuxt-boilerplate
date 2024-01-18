<template>
  <v-sheet>
    <v-row>
      <v-col>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              to="/app/assistants"
              v-bind="props"
              :color="isHovering ? 'secondary' : 'background'"
              min-width="320"
              height="200"
              class="d-flex flex-column"
            >
              <v-card-text>
                <h2 class="text-h3">{{ $t("common.assistant") }}</h2>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="justify-end">
                <v-btn size="x-large" color="primary">{{
                  $t("common.enter")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              to="/app/chatgpt"
              v-bind="props"
              :color="isHovering ? 'secondary' : 'background'"
              min-width="320"
              height="200"
              class="d-flex flex-column"
            >
              <v-card-text>
                <h2 class="text-h3">{{ $t("common.chatgpt") }}</h2>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="justify-end">
                <v-btn size="x-large" color="primary">{{
                  $t("common.enter")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              to="/app/workspace"
              v-bind="props"
              :color="isHovering ? 'secondary' : 'background'"
              min-width="320"
              height="200"
              class="d-flex flex-column"
            >
              <v-card-text>
                <h2 class="text-h3">{{ $t("common.workspace") }}</h2>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="justify-end">
                <v-btn size="x-large" color="primary">{{
                  $t("common.enter")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";

const authStore = useAuthStore();

// @ts-ignore
definePageMeta({
  title: "Home",
  description: "Home page",
  layout: "full-height",
});
</script>
