<template>
  <v-card width="400" min-height="600" class="pb-5">
    <v-card-text>
      <p class="text-body text-center text-disabled mt-2">
        {{ $t("auth.loginSubtitle") }}
      </p>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          label="Name"
          variant="outlined"
          density="compact"
          class="mt-5"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          density="compact"
          class="mt-5"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          variant="outlined"
          density="compact"
          class="mt-2"
          :rules="passwordRules"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          density="compact"
          class="mt-2"
          :rules="passwordRules"
          type="password"
        ></v-text-field>
        <p class="text-danger" v-for="(error, index) in errorMessages">
          {{ error }}
        </p>
        <v-btn
          class="mt-5"
          block
          color="primary"
          variant="flat"
          @click="registerEvent"
          :disabled="!valid"
          :loading="loading"
        >
          {{ $t("auth.register") }}
        </v-btn>
        <v-btn
          class="mt-5"
          block
          color="primary"
          variant="outlined"
          to="/auth/login"
        >
          {{ $t("auth.login") }}
        </v-btn>
        
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/useAuthStore";
import { AxiosError } from "axios";
import type { Ref } from "vue";

const router = useRouter();
const name=ref("Wayne Tam");
const email = ref("tamwayne@gmail.com");
const password = ref("00000000");
const confirmPassword = ref("00000000");
const loading = ref(false);
const nameRules = [(v: string) => !!v || "Name is required"];
const emailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const passwordRules = [(v: string) => !!v || "Password is required"];
const valid = ref(false);

const errorMessages: Ref<string[]> = ref([]);

const registerEvent = async () => {
  loading.value = true;
  try {
    const result = await useAuthStore().signUp(name.value, email.value, password.value);
    router.push("/");
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    const response = axiosError.response;
    const data: any = response?.data;
    if (data?.message instanceof Array) errorMessages.value = data.message;
    else if (typeof data.message === "string")
      errorMessages.value = [data.message];
    loading.value = false;
  }
};

//@ts-ignore
definePageMeta({
  layout: "full-height",
  auth:'guest-only'
});
</script>
