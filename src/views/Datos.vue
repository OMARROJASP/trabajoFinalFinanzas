<script setup>
import { useUserStore } from "../stores/user.js";
import { useDatabaseStore } from "../stores/database.js";

import { ref } from "vue";
import router from "../router";
const databaseStore = useDatabaseStore();
const userStore = useUserStore();

const email = ref("");
const name = ref("");
const apellido = ref("");

const handleSubmit = async () => {
  if (!name.value) {
    alert("llena los campos");
  }
  const error = await userStore.updateUser(
      name.value
      // aqui se va a agregar una foto
  );

  router.push("/home");

  /*
   await databaseStore.addUsers(name.value, apellido.value);
  console.log(name.value);
   */
};
</script>
<template>
  <div class="fondo">
    <div class="dentro">
      <form
          @submit.prevent="handleSubmit"
          class="m-2 p-4 rounded h-screen flex justify-center items-center flex-col"
      >
        <div>
          <input
              class="bg-green-400"
              type="text"
              placeholder="Ingrese tu nombre y apellido"
              v-model.trim="name"
          />
        </div>

        <div>
          <button class="bg-blue-500" type="submit">Guardar Informacion</button>
        </div>
      </form>
    </div>
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
  text-align: center;
  padding-top: 0;
}
.tituloSuperior {
  display: flex;
  justify-content: space-between;
  height: 10%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: rgb(172, 172, 172);
  color: white;
  align-items: center;
}

.logo {
  display: flex;
  display: inline-block;

  vertical-align: middle;
  padding-left: 5%;
}

.foto {
  border-radius: 55%;
}

.form-check {
  display: flex;
  justify-content: space-between;
  padding-left: 20%;
  padding-right: 20%;
}

.fondo {
  background-color: black;
  height: 91%;
}

.datos {
  display: flex;
  justify-content: space-between;
}

.dentro {
  background-color: white;
  height: 100%;
}
</style>
