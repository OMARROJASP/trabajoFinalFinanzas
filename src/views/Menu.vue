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
      <router-link to="/home">Inicio</router-link>
      <router-link to="/Calculo">Calculo</router-link>
      <router-link to="/Historial" type="submit" >Historial</router-link>
    </div>

    <hr class="border w-1/2" />

    <div class="flex flex-col items-center gap-10 uppercase">
      <router-link to="/Configuracion"  type="submit" >Configuracion</router-link>
      <router-link to="/Ayuda"  type="submit" >Ayuda</router-link>
      <button to="/" @click="userStore.signOutUser" type="submit" >Cerrar Sesion</button>


    </div>
  </aside>
</template>

<style scoped></style>
