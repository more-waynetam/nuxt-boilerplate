<template>
  <v-dialog width="728" persistent>
    <v-form v-model="isValid">
      <v-card title="assistant form">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" class="text-center">
              <v-avatar size="150" class="bg-grey-lighten-2"> </v-avatar>
              <v-btn color="primary" block variant="tonal" class="mt-5"
                >Upload</v-btn
              >
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field
                label="Name"
                v-model="nameField"
                variant="solo-filled"
                flat
                :rules="[(v) => !!v || 'Name is required']"
              ></v-text-field>
              <v-textarea
                label="Description"
                v-model="descField"
                variant="solo-filled"
                flat
                :rules="[(v) => !!v || 'Description is required']"
              ></v-textarea>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>

            <v-col cols="12" md="6">
              <v-chip-group :multiple="true" v-model="toolsField" filter>
                <v-chip color="primary" value="code_interpreter"
                  >Code Interpreter</v-chip
                >
                <v-chip color="primary" value="retrieval">Retrieval</v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Model"
                v-model="modelField"
                flat
                variant="solo-filled"
                :items="(models as any)"
                item-title="id"
                item-value="id"
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Introduction"
                v-model="introField"
                variant="solo-filled"
                flat
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="ma-2">
          <v-btn color="disabled" @click="$emit('cancel')">Close</v-btn>
          <v-btn color="primary" :disabled="isSaving || !isValid" @click="handleSave">
            Save
            <v-progress-circular
              indeterminate
              color="white"
              size="24"
              class="ml-2"
              v-if="isSaving"
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import type { Ref } from "vue";
import { ref } from "vue";
import type { IAssistant } from "~/models/openai.model";
import { useChatgptStore } from "~/stores/useChatgptStore";

const chatgptStore = useChatgptStore();
const nameField = ref("");
const descField:Ref<string|undefined> = ref("");
const introField = ref("");
const modelField = ref("");
const isValid = ref(false);
const toolsField:Ref<Array<string>> = ref([]);
const assistantId = ref();
const isSaving = ref(false);

const { data: models } = useAsyncData(async () => {
  const allModels = await chatgptStore.getModelList();
  const gptModels = allModels.filter((model: any) =>
    model.id.startsWith("gpt")
  );
  return gptModels;
});

const handleSave = async () => {
  isSaving.value = true;
  const assistant:IAssistant = {
    _id: assistantId.value,
    name: nameField.value,
    description: descField.value,
    instructions: introField.value,
    llmModel: modelField.value,
    avatar: "",
    visibility: "public",
    tools: toolsField.value.map((tool) => ({ type: tool })),
  };
  emits('submit',assistant)
};

const initForm = (assistant?: IAssistant) => {
  if (!assistant) {
    assistant = {
      name: "defaultName",
      description: "",
      instructions: "",
      llmModel: "gpt-4-1106-preview",
      avatar: "",
      visibility: "public",
      tools: [],
    };
  }

  assistantId.value = assistant._id;
  nameField.value = assistant.name;
  descField.value = assistant.description;
  introField.value = assistant.instructions;
  modelField.value = assistant.llmModel;
  toolsField.value = assistant.tools.map((tool: any) => tool.type);
  isSaving.value = false;
};

const emits=defineEmits([
  'submit',
  'cancel'
])

defineExpose({
  initForm,
});
</script>
