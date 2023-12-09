<!--
 * @Description: login with user
 * @Author: Lewis
 * @Date: 2022-06-02 15:12:57
 * @LastEditTime: 2023-12-08 16:19:08
 * @LastEditors: Ian
-->
<template>
  <div
    class="flex justify-content-center"
    :style="{ 'background-color': 'black' }"
  >
    <Toast />
    <Dialog
      v-model:visible="visible"
      modal
      :class="{ 'custom-dialog': true }"
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
import { useToast } from "primevue/usetoast";

export default {
  name: "LoginUsername",
  setup(props, context) {
    const store = useStore();
    // eslint-disable-next-line no-unused-vars
    const router = useRouter();
    const visible = ref(true);
    const username = ref("");
    const password = ref("");
    const isShowPass = ref(false);
    const submitted = ref(false);
    const toast = useToast();

    function handleLoginSubmit() {
      submitted.value = true;
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
          setTimeout(() => {
            router.go("/");
          }, 100);
        })
        .catch((err) => {
          console.log("err", err);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Invalid user. Try again...",
            life: 3000,
          });
        });
    }

    function handleIsShowPassword() {
      isShowPass.value = !isShowPass.value;
    }

    return {
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

<style lang="scss">
.p-component-overlay {
  background-color: gray !important; /* Set the background color here */
  opacity: 10; /* Adjust the opacity as needed */
}
</style>
