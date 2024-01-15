import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import tc from '@/locales/tc.json'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'tc',
    messages: {
      en,tc
    }
  })
  //@ts-ignore
  vueApp.use(i18n)
})