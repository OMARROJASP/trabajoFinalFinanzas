

<script setup>

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
      <router-link to="/Contacto">Contacto</router-link>
    </div>

    <hr class="border w-1/2" />

    <div class="flex flex-col items-center gap-10 uppercase">
      <p>Ayuda</p>
      <p>Configuración</p>
      <p>Cerrar Sesión</p>
    </div>
  </aside>
</template>

<style scoped></style>
