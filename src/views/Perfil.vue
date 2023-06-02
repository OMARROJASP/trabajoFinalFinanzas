
<script setup>
import {useDatabaseStore} from "../stores/database.js";

import { ref } from "vue";
const  databaseStore = useDatabaseStore();

const email = ref("");
const name = ref();
const costumer = ref()

costumer.value = await databaseStore.leerDatos()

</script>
<template>
  <div>
    <h2>Nombre : {{costumer.name}}</h2>

  </div>
</template>

<style scoped>

</style>
