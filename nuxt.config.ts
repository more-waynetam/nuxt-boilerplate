import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
    "~/assets/css/main.scss",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NEXT_PUBIC_API_BASE_URL || "http://localhost:3001",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
});
