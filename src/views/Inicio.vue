<template>
  <div class="h-screen flex items-center justify-center bg-blue-600">
    <div class="bg-white p-10 rounded-xl flex flex-col gap-5">
      <h1 class="text-4xl font-bold">Nombre del proyecto</h1>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col items-center gap-3"
      >
        <div>
          <input
            type="email"
            class="border-2 rounded-lg p-2 border-blue-600"
            placeholder="Enter your email"
            v-model.trim="email"
          />
        </div>

        <div>
          <input
            type="password"
            class="border-2 rounded-lg p-2 border-blue-600"
            placeholder="Enter your password"
            v-model.trim="password"
          />
        </div>

        <div class="flex flex-col items-center w-full gap-3 font-bold">
          <h4 class="hover:text-blue-800 cursor-pointer">
            ¿No Tienes Una Cuenta?
          </h4>

          <div class="w-full flex justify-around text-white">
            <button
              type="submit"
              class="uppercase bg-blue-800 px-4 py-2 rounded-lg"
            >
              Iniciar Sesion
            </button>

            <button class="uppercase bg-blue-800 px-4 py-2 rounded-lg">
              <RouterLink to="/registrarse">Registrate</RouterLink>
            </button>
          </div>
        </div>
      </form>
    </div>
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
