
<script setup>
import {useUserStore} from "../stores/user.js";
import {useDatabaseStore} from "../stores/database.js";

import { ref } from "vue";
const  databaseStore = useDatabaseStore();
const userStore = useUserStore()

const email = ref("");
const name = ref();
const costumer = ref()

//costumer.value = await databaseStore.leerDatos()

</script>
<template>
  <div>


    <h2> email : {{userStore.userData.email}}</h2>
    <h2> nombre : {{userStore.userData.displayName}}</h2>


  </div>
</template>

<style scoped>

</style>
