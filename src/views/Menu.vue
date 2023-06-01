<script setup>
import {useUserStore} from "../stores/user.js";
const userStore = useUserStore()



</script>

<template>
  <aside
    class="flex flex-col bg-blue-600 text-white w-1/4 justify-evenly items-center text-lg"
  >
    <div>
      <img src="../assets/logo.png" alt="Logo" />
    </div>

    <div class="flex flex-col items-center gap-10">
      <router-link to="/">Inicio</router-link>
      <router-link to="/Calculo">Calculo</router-link>
      <button to="/Historial" @click="userStore.signOutUser" type="submit" >Historial</button>
    </div>

    <hr class="border w-1/2" />

    <div class="flex flex-col items-center gap-10 uppercase">
      <button to="/Configuracion" @click="userStore.signOutUser" type="submit" >Configuracion</button>
      <button to="/Ayuda" @click="userStore.signOutUser" type="submit" >Ayuda</button>
      <button to="/Inicio" @click="userStore.signOutUser" type="submit" >Cerrar Sesion</button>


    </div>
  </aside>
</template>

<style scoped></style>
