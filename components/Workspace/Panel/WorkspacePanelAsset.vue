<template>
     <v-expansion-panel title="Assets" :rounded="0" :elevation="0">
          <v-expansion-panel-text>
            <p v-if="!assets?.length" class="my-5 text-disabled">
              No asset found.
            </p>
            <v-btn block color="primary" flat>Add asset</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
</template>
<script setup lang="ts">
const props=defineProps({
  assets:{
    type:Object,
    required:false
  }
})
</script>