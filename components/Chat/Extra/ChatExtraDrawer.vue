<template>
  <v-navigation-drawer location="right" :elevation="0" :width="400">
    <v-row class="d-flex flex-column-reverse">
      <v-col>
        <div ref="bottomEl" class="text-grey-lighten-2">.</div>
      </v-col>
      <v-col 
        cols="12"
        v-for="(asset, index) in assets?.data"
          :key="index"
        >
        <ChatExtraMidjourney v-if="asset.provider=='midjourney'" :asset="asset"></ChatExtraMidjourney>
        <ChatExtraDallE v-else-if="asset.provider=='dalle-3'" :asset="asset"></ChatExtraDallE>
        <div v-else>{{ asset }}</div>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
<script setup lang="ts">

const bottomEl= ref<HTMLElement | null>(null);

const props = defineProps({
  assets: Object,
});

watch(()=>props.assets,() => {
  if (bottomEl.value) {
    nextTick(() => {
      console.log("extra scrolling to bottom");
      bottomEl.value?.scrollIntoView({ behavior: "smooth"});
    });
  }
});
</script>
