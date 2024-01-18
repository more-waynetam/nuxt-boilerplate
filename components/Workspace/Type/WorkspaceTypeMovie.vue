<template>
    <div>movie:{{ extra }}</div>
</template>
<script setup lang="ts">

const props=defineProps({
  extra:{
    type:Object,
    required:false
  }
})

</script>