<script setup>
import { useUserStore } from "../stores/user.js";
import { useDatabaseStore } from "../stores/database.js";

import { ref } from "vue";
const databaseStore = useDatabaseStore();
const userStore = useUserStore();

const email = ref("");
const name = ref();
const costumer = ref();
const cuadro = ref(false)

const editarDatos=()=>{
cuadro.value = true
}
//costumer.value = await databaseStore.leerDatos()
</script>
<template>
  <div>


    <h2> email : {{userStore.userData.email}}</h2>
    <div v-if="userStore.userData.displayName == null">
      nombre : Ingrese Nombre
    </div>
    <div v-else>
      nombre : {{userStore.userData.email}}
    </div>

    <router-link to="/editar" class="bg-yellow-400"> Editar Perfil</router-link>
    </div>



</template>

<style scoped>

</style>
