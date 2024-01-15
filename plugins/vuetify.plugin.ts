import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify: any = createVuetify({
    ssr: false,
    components,
    directives,
    defaults: {
      VCard: {
      },
    },
    theme: {
      themes: {
        light: {
          colors: {
            "on-background":"#636B70",
            background: "#E8EDED",
            "main-bg": "#E8EDED",
            primary: "#FF614C",
            secondary: "#BFDC36",
            accent: "#FF5722",
            error: "#FE7A15",
            info: "#D3DD18",
            success: "#D3DD18",
            warning: "#F8D90F",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
