<template>
    <v-expansion-panel title="Members" :rounded="0" :elevation="0">
          <v-expansion-panel-text>
            <p v-if="!members?.length" class="my-5 text-disabled">
              No member found.
            </p>
            <v-list v-else class="my-5">
                <v-list-item v-for="(member,index) in members">{{ member.user }}</v-list-item>
            </v-list>
            <v-btn block color="primary" flat>Add member</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
</template>
<script setup lang="ts">
const props=defineProps({
  members:{
    type:Object,
    required:false
  }
})
</script>