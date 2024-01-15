import moment from 'moment';
import { defineNuxtPlugin } from 'nuxt/app'
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            moment: moment
        }
    }
})