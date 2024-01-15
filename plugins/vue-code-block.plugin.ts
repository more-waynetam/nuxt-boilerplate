import { defineNuxtPlugin } from 'nuxt/app'
import { createVCodeBlock } from '@wdns/vue-code-block';


export default defineNuxtPlugin(({ vueApp }) => {
 const VCodeBlock=createVCodeBlock({})
 //@ts-ignore
  vueApp.use(VCodeBlock)
})