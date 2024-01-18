
<template>
  <v-navigation-drawer width="300" :elevation="0" :permanent="true">
    <div v-if="workspace">
        <v-img min-height="150px" class="bg-grey-lighten-1"></v-img>
      <v-row class="pa-4">
        <v-col>
          <h2 class="text-h5">{{ workspace.name }}</h2>
          <p class="text-caption">{{ workspace.description }}</p>
        </v-col>
      </v-row>
      <v-expansion-panels v-model="open" variant="accordion">
        <WorkspacePanelAssistant :assistants="workspace.assistants"></WorkspacePanelAssistant>
        <WorkspacePanelAsset :assets="workspace.assets"></WorkspacePanelAsset>
        <v-expansion-panel title="Extra" :rounded="0" :elevation="0">
          <v-expansion-panel-text>
            <WorkspaceTypeMovie
              v-if="workspace.type === 'movie'"
              :extra="workspace.extra"
            ></WorkspaceTypeMovie>
            <WorkspaceTypeDefault
              v-else
              :extra="workspace.extra"
            ></WorkspaceTypeDefault>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <WorkspacePanelMember :members="workspace.members"></WorkspacePanelMember>
        <WorkspacePanelThread :threads="workspace.threads" :workspaceId="workspace._id"></WorkspacePanelThread>
      </v-expansion-panels>
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
const open: Ref<Array<String>> = ref([]);
const props = defineProps({
  workspace: {
    type: Object,
    required: false,
  },
});
</script>
