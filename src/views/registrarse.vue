<template>
  <div>
    <div class="bg-blue-500">
      <div
          class="w-11/12 mx-auto flex flex-col min-h-screen justify-center items-center"
      >
        <form
            @submit.prevent="handleSubmit"
            class="m-2 p-8 bg-white rounded-lg flex items-center flex-col gap-5"
        >
          <h1 class="text-4xl font-bold uppercase">Register</h1>

          <div class="flex items-center">
            <label class="uppercase font-bold text-xl w-56">Email: </label>

            <input
                class="text-center border-2 py-2 md:px-20 lg:px-32 md:w-full rounded-full my-5"
                type="email"
                placeholder="Enter your email"
                v-model.trim="email"
            />
          </div>

          <div class="flex items-center">
            <label class="uppercase font-bold text-xl w-56">Password: </label>
            <input
                class="text-center border-2 my-5 md:px-20 lg:px-32 md:w-full py-2 rounded-full"
                type="password"
                placeholder="Enter your password"
                v-model.trim="password"
            />
          </div>

          <div class="flex items-center">
            <label class="uppercase font-bold text-xl">Repeat Password: </label>
            <input
                class="text-center border-2 my-5 md:px-20 lg:px-32 md:w-full py-2 rounded-full"
                type="password"
                placeholder="Repeat your password"
                v-model.trim="rePassword"
            />
          </div>

          <div>
            <button
                class="text-center bg-blue-500 uppercase font-bold text-white border rounded-full py-2 px-10"
                type="submit"
            >
              Log In
            </button>
          </div>

          <!--  <RouterLink to="/" :disabled="userStore.loadingUser">Crear usuario</RouterLink>
          <button to="/" type="submit" :disabled="userStore.loadingUser"  >Crear usuario</button>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import router from "../router";

const userStore = useUserStore();
const dataBaseStore = useDatabaseStore();

const email = ref("");
const password = ref("");
const rePassword = ref("");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("llena los campos");
  }

  if (password.value !== rePassword.value) {
    return alert("las contraseñas son diferentes");
  }
  await userStore.registerUser(email.value, password.value);
  //await dataBaseStore.addUsers(name.value, email.value);
};
</script>


<style scoped>
.contenedor {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 87, 126);
  display: flex;
}

* {
  margin: 0;
  padding: 10px;
}

.menu1 {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.menu2 {
  height: 100%;
  width: 50%;
  margin: 0;
  padding: 0;
  background-color: white;
  display: flex;
  text-align: center;
  justify-content: center;
}

.banco {
  width: auto;
  height: 100%;
  padding: 0;
}

.Opciones img {
  margin-top: 20px;
  width: 100%;
  height: auto;
}

.Opciones form {
  padding-top: 50px;
  text-align: center;
}

.Opciones h1 {
  padding-top: 30px;
  padding-bottom: 30px;
}
.Opciones form input {
  border-radius: 10px;
  padding: 10px;
  border: none;
  background-color: rgb(237, 237, 242);
}

.Opciones form button {
  margin-top: 20px;
  margin-bottom: 10px;
}

.Opciones form h4 p {
  color: rgb(76, 118, 226);
}

.Opciones {
  align-items: center;
  background: white;
  margin: 10px;
  float: left;
  width: 50%;
}
</style>
