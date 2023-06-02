
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

.contenedor {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 87, 126);
}

* {
  margin: 0;
  padding: 10px;
}

.menu1 {
  width: 25%;
  background-color: rgb(32, 78, 161);
  padding: 10px;
  text-align: center;
  padding: 20px;
  height: 100%;
}
.menu2 {
  width: 75%;
  height: 100%;
  text-align:  center;
  padding-top: 0;
}
.tituloSuperior{
  display: flex;
  justify-content: space-between;
  height: 10%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: rgb(172, 172, 172);
  color: white;
  align-items: center;

}

.logo{
  display: flex;
  display: inline-block;

  vertical-align: middle;
  padding-left: 5%;


}

.foto {
  border-radius: 55%;

}

.form-check{
  display: flex;
  justify-content: space-between;
  padding-left: 20%;
  padding-right: 20%;

}

.fondo {
  background-color: black;
  height: 91%;

}

.datos{
  display: flex;
  justify-content: space-between;
}


.dentro{
  background-color: white;
  height: 100%;

}

</style>
