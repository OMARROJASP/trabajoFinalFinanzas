<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user.js";
import Header from "./views/Header.vue";
import Menu from "./views/Menu.vue";
import Inicio from "./views/Inicio.vue";
import Calculo from "./views/Calculo.vue";
//import Inicio from "./views/Inicio.vue";
const userStore = useUserStore();
</script>

<template>
  <div v-if="!userStore.loadingSession">
    <router-view></router-view>
  </div>

  <div
    v-else-if="userStore.loadingSession"
    class="p-3 gap-3 bg-blue-950 flex h-screen"
  >
    <Menu />

    <div class="w-3/4 bg-white">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<!--
<div class="row-span-3 bg-primary text-white">

    </div>

    <div class="col-span-2 bg-secondary text-white">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>


    <div class="row-span-2 col-span-2 bg-green-500"> <RouterView /></div>
  -->
