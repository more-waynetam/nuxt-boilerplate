import type { WorkspaceItem } from '#build/components';
<template>
  <v-row>
    <v-col
      ><h1 class="text-h1">{{ $t("common.workspace") }}</h1></v-col
    >
  </v-row>
  <v-row>
    <v-col>
      <v-btn variant="outlined">new</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="(workspace, index) in workspaces?.data" :key="workspace._id"
    cols="3"
      ><WorkspaceItem :workspace="workspace"></WorkspaceItem
    ></v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useWorkspaceStore } from "~/stores/useWorkspaceStore";

const workspaceStore = useWorkspaceStore();

const { data: workspaces } = useAsyncData(async () => {
  const _workspace= await workspaceStore.getWorkspaces();
  return _workspace;
});
</script>
