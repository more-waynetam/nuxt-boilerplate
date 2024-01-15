<template>
    <v-card
          class="mx-2 my-4"
          :elevation="0"
        >
          <v-progress-linear
            v-if="asset.progress != 'done'"
            indeterminate
            color="primary"
          ></v-progress-linear>
          <v-card-subtitle>{{ asset?.provider }}</v-card-subtitle>
          <v-card-text v-if="asset.progress != 'pending'">
            <a :href="asset.uri"  target="_blank"><v-img :src="asset.uri"></v-img></a>
          </v-card-text>
          <v-card-text>
            <p class="text-caption">{{ asset?.name }}</p>
          </v-card-text>
          <v-card-text
            ><p>{{ asset?.progress }}</p>{{ $moment(asset?.createdAt).fromNow()  }}</v-card-text
          >
        </v-card>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import type { IAsset } from "~/models/asset.model";
const props = defineProps({
  asset: {type:  Object as ()=>IAsset, required: true},
});

</script>