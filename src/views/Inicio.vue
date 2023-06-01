<template>
  <div class="contenedor d-flex justify-content-around">
    <div class="menu">
      <form @submit.prevent="handleSubmit" class="m-2 p-4 rounded">
        <div class="d-flex justify-content-around">
          <input
            class="text-center"
            type="email"
            placeholder="Enter your email"
            v-model.trim="email"
          />
        </div>

        <div class="d-flex justify-content-around">
          <input
            class="text-center"
            type="password"
            placeholder="Enter your password"
            v-model.trim="password"
          />
        </div>
        <div class="cuenta">
          <h4>¿no tienes una cuenta?</h4>

          <RouterLink to="/registrarse" class="btn btn-lg p-0 text-primary"
            ><h4>Registrate</h4>
          </RouterLink>
        </div>

        <div class="d-flex justify-content-around">
          <button class="text-center btn btn-primary" type="submit">
            Iniciar Sesion
          </button>
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
const email = ref("");
const password = ref("");

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
