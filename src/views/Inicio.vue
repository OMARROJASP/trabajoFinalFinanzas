<template>
  <div
    class="h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col justify-center items-center h-96 p-10 rounded-xl gap-5 w-4/12 bg-[#ffffff8c] relative"
    >
      <div>
        <img
          class="absolute -top-[80px] right-[38%]"
          width="150"
          src="../assets/logo.svg"
          alt=""
        />
      </div>

      <div class="flex items-center">
        <div class="p-[13px] bg-white rounded-l-lg">
          <span class="text-blue-900 material-symbols-outlined">
            account_circle
          </span>
        </div>
        <input
          class="p-4 rounded-r-lg bg-blue-900 text-white"
          type="email"
          placeholder="Enter your email"
          v-model.trim="email"
        />
      </div>

      <div class="flex items-center">
        <div class="p-[13px] bg-white rounded-l-lg">
          <span class="text-blue-900 material-symbols-outlined">
            password
          </span>
        </div>
        <input
          class="p-4 rounded-r-lg bg-blue-900 text-white"
          type="password"
          placeholder="Enter your password"
          v-model.trim="password"
        />
      </div>

      <div
        class="flex items-center gap-1 text-white font-bold hover:text-blue-900"
      >
        <RouterLink to="/registrarse">¿No tienes Cuenta? Crea una</RouterLink>
        <span class="material-symbols-outlined"> arrow_right_alt </span>
      </div>

      <div>
        <button
          type="submit"
          class="bg-white text-blue-900 font-bold px-5 py-2 w-full rounded-lg hover:bg-blue-900 hover:text-white transition-all"
        >
          Iniciar Sesion
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router/dist/vue-router";
import router from "../router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const email = ref("maximo2611@gmail.com");
const password = ref("123123");

const register = () => {
  router.push(`/registrarse`);
};

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return alert("llena los campos");
  }

  await userStore.loginUser(email.value, password.value);
};
</script>

<style scoped></style>
