<template>
    <v-dialog>
          <v-form v-model="isValid">
            <v-card maxWidth="320" class="mx-auto w-100">
              <v-card-title>
                {{ $t("chat.add-chat") }}
              </v-card-title>
              <v-card-text>
                <v-select
                  v-model="assistantField"
                  :items="/* @ts-ignore */ assistants"
                  :label="$t('chat.assistant')"
                  itemTitle="name"
                  itemValue="_id"
                  variant="outlined"
                  dense
                  class="mt-5"
                  :rules="[(v:any) => !!v || 'Assistant is required']"
                ></v-select>
                <v-text-field
                  v-model="nameField"
                  :label="$t('chat.chat-name')"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                  :rules="[(v:any) => !!v || 'Chat name is required']"
                ></v-text-field>
                <v-chip-group filter mandatory v-model="visiblityField">
                  <v-chip value="public" color="secondary">Public</v-chip>
                  <v-chip value="private" color="secondary">Private</v-chip>
                  <v-chip value="visible" color="secondary">Visible</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('cancel')">{{
                  $t("common.cancel")
                }}</v-btn>
                <v-btn
                  :disabled="!isValid"
                  color="primary"
                  @click="handleForm"
                  >{{ $t("common.ok") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
</template>
<script setup lang="ts">
import type { IThread } from '~/models/openai.model';

const chatgptStore=useChatgptStore();
const isValid=ref(false)
const assistantField:Ref<string|null>=ref(null)
const nameField:Ref<string|null>=ref(null)
const visiblityField:Ref<string|null>=ref(null)

const handleForm=()=>{
    if(!isValid.value) return;
  const thread={
    name:nameField.value,
    assistantId:assistantField.value,
    visibility:visiblityField.value
  }
  emits("submit",thread);
}

const initForm=(thread?:IThread)=>{
  if(thread){
    assistantField.value=thread.assistantId;
    nameField.value=thread.name;
    visiblityField.value=thread.visibility;
  }else{
    assistantField.value=null;
    nameField.value=null;
    visiblityField.value=null;
  }
}

const {data:assistants}=useAsyncData(async ()=>{
  return await chatgptStore.getAssistants();
})

const emits=defineEmits(["submit","cancel"])

defineExpose({
  initForm
})
</script>