<template>
  <ChatAppBar :title="workspace?.name" />
  <WorkspaceDrawer :workspace="workspace" />
  <v-main>
    <ChatMessages
      :items="[]"
    />
  </v-main>
  <ChatExtraDrawer :assets="workspace?.assets"></ChatExtraDrawer>
</template>
<script setup lang="ts">
const workspaceStore = useWorkspaceStore();
const route = useRoute();
const workspaceId = route.params.id as string;
const chatgptStore=useChatgptStore();
const { data: workspace } = useAsyncData(async () => {
  const _workspace= await workspaceStore.getWorkspace(workspaceId);
  if(!chatgptStore.currentThread){
    chatgptStore.currentThread=_workspace.threads[0];
  }
  return _workspace;
});

definePageMeta({
  title: "ChatGPT",
  description: "ChatGPT page",
  layout: "blank",
});
</script>
