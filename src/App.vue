<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from "./views/Header.vue";
import Menu from "./views/Menu.vue"
import Calculo from "./views/Calculo.vue"
//import Inicio from "./views/Inicio.vue";
</script>


<template>
  <div class="flex">
    <div class="w-1/2 bg-gray-200 p-4">
      <Menu></Menu>
    </div>
    <div class="w-1/2 bg-gray-300">
      <Header></Header>
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



