import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore=useAuthStore();
    if(to.meta.auth=='guest')return;
    else if(to.meta.auth=='guest-only') {
        if(authStore.currentUser!=null) {
            return navigateTo('/');
        }
    }else{
        if(!authStore.currentUser) {
            return navigateTo('/auth/login');
        }
    }
  })