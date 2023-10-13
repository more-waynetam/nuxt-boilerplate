<template>
    <div class="my-5">
        <h1 class="text-3xl font-bold mb-5">
            {{ $t('welcome') }}
        </h1>
        <HomeList />
    </div>
</template>
<script setup lang="ts">
import HomeList from '@/components/Home/HomeList.vue'
</script>