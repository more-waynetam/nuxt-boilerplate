<template>
    <v-app-bar :elevation="0">
        <v-app-bar-title class="text-h5">tomatoLAB</v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="mx-2">
            <p class="text-caption">Welcome</p>
            <p class="text-body">{{ authStore?.currentUser?.name }}</p>
        </div>
        <v-avatar class="mx-2 bg-white">W</v-avatar>
    </v-app-bar>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';
const authStore = useAuthStore();
</script>