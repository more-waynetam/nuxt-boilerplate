<template>
  <v-text-field
    v-model="message"
    bg-color="white"
    flat
    hide-details
    density="compact"
    variant="solo-filled"
    rounded="pill"
    append-inner-icon="mdi-microphone"
    class="message-input"
  >
    <template v-slot:append>
      <v-btn color="secondry" variant="plain" icon="mdi-note-edit"></v-btn>
      <v-btn
        :disabled="!isVaild"
        color="primary"
        variant="plain"
        icon="mdi-send"
        @click="handleSend"
      ></v-btn>
    </template>
  </v-text-field>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
const message = ref<string>("");
const isVaild = computed(() => {
  return message.value.length > 0;
});

const emits = defineEmits(["send"]);

const handleSend = () => {
  if (isVaild.value) {
    emits("send", message.value);
    message.value = "";
  }
};
</script>
<style scoped lang="scss">
</style>

