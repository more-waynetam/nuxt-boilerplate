<template>
  <v-main>
    <v-app-bar color="grey-lighten-4" flat height="72">
      <v-container>
        <v-toolbar>
          <v-app-bar-nav-icon
            @click="$router.go(-1)"
            icon="mdi-arrow-left"
            color="primary"
          ></v-app-bar-nav-icon>
          <v-toolbar-title class="text-h5">{{
            $t("common.lab")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn variant="plain" prepend-icon="mdi-cog">
            setting
          </v-btn>
        </v-toolbar>
      </v-container>
    </v-app-bar>
    <v-container class="flex align-middle justify-center fill-height">
      <v-row class="fill-height">
        <v-col>
          <v-card class="fill-height flex-column">
            <v-card-text>
              <v-text-field variant="underlined" label="message"></v-text-field>
            </v-card-text>
            <v-card-text></v-card-text>
          </v-card>
        </v-col>
        <v-col> </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const $router = useRouter();
const { t: $t } = useI18n();

// @ts-ignore
definePageMeta({
  title: "Lab",
  description: "Lab page",
  layout: "blank",
});
</script>
