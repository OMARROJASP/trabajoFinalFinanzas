<script setup>
import { useUserStore } from "../stores/user.js";
import { useDatabaseStore } from "../stores/database.js";

import { ref } from "vue";
const databaseStore = useDatabaseStore();
const userStore = useUserStore();

const email = ref("");
const name = ref();
const costumer = ref();
const cuadro = ref(false);

const editarDatos = () => {
  cuadro.value = true;
};
//costumer.value = await databaseStore.leerDatos()
</script>
<template>
  <div class="h-[85%] flex justify-center items-center flex-col gap-3">
    <h2 class="font-bold uppercase text-xl">
      Email :
      <span class="font-normal lowercase">{{ userStore.userData.email }}</span>
    </h2>

    <h2 class="font-bold uppercase text-xl">
      Nombre :
      <p class="font-normal lowercase">{{
          userStore.userData.displayName
        }}</p>
    </h2>

    <router-link
        to="/editar"
        class="bg-blue-500 font-bold text-white py-2 px-5 rounded-lg"
    >
      Editar Perfil</router-link
    >
  </div>
</template>

<style scoped></style>
