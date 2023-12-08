<!--
 * @Description: login with user
 * @Author: Lewis
 * @Date: 2022-06-02 15:12:57
 * @LastEditTime: 2023-12-07 22:45:05
 * @LastEditors: Ian
-->
<template>
  <div class="flex justify-content-center">
    <Toast />
    <Dialog
      v-model:visible="visible"
      modal
      :closable="false"
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="flex flex-column px-8 py-5 gap-4" style="border-radius: 12px">
        <Image
          width="35"
          height="40"
          fill="none"
          src="https://cdn-icons-png.flaticon.com/512/12/12139.png"
          class="block mx-auto"
        >
        </Image>
        <div class="inline-flex flex-column gap-2">
          <label for="api" class="font-semibold">Username</label>
          <InputText
            id="api"
            class="p-3"
            v-model="username"
            :class="!username ? 'p-invalid' : ''"
          ></InputText>
        </div>
        <div class="inline-flex flex-column gap-2">
          <label for="api" class="font-semibold">Password</label>
          <InputText
            id="api"
            class="p-3"
            type="password"
            v-model="password"
            :class="!password ? 'p-invalid' : ''"
          ></InputText>
        </div>
        <div class="flex align-items-center gap-2">
          <Button
            label="Proceed"
            @click="handleLoginSubmit"
            class="p-3 w-full border-1"
          ></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";

export default {
  name: "LoginUsername",
  validations() {
    return {
      username: {
        required: helpers.withMessage("common.canNotEmpty", required),
      },
      password: {
        required: helpers.withMessage("common.canNotEmpty", required),
      },
    };
  },
  setup(props, context) {
    const store = useStore();
    // eslint-disable-next-line no-unused-vars
    const router = useRouter();
    const v$ = useVuelidate();
    const visible = ref(true);
    const username = ref("");
    const password = ref("");
    const isShowPass = ref(false);
    const submitted = ref(false);
    const toast = useToast();

    function handleLoginSubmit() {
      submitted.value = true;
      if (username.value.length <= 0 || password.value.length <= 0) {
        setTimeout(() => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "API Key is valid. Proceeding...",
            life: 3000,
          });
        }, 1000);
      }
      let params = {
        username: username.value,
        password: password.value,
      };
      store
        .dispatch("auth/login", params)
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Successfully login. Proceeding...",
            life: 3000,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    function handleIsShowPassword() {
      isShowPass.value = !isShowPass.value;
    }

    return {
      v$,
      visible,
      username,
      password,
      isShowPass,
      submitted,
      handleLoginSubmit,
      handleIsShowPassword,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-btn {
  padding: 0 7px;
}
.login-oa-btn {
  height: 42px;
  margin: 0 7px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.show-pass {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
@media only screen and (max-width: 768px) {
  .login-form__with-username {
    width: 100% !important;
  }
}
</style>
