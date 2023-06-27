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
  <div>
    <div
        class="min-h-screen flex justify-center items-center flex-col bg-blue-500"
    >
      <form
          @submit.prevent="handleSubmit"
          class="flex flex-col items-center bg-white p-5 rounded-lg"
      >
        <h1 class="text-xl font-bold">Data</h1>

        <div>
          <input
              class="text-center border-2 my-5 md:px-20 lg:px-32 md:w-full py-2 rounded-lg"
              type="text"
              placeholder="Ingrese tu nombre y apellido"
              v-model.trim="name"
          />
        </div>

        <div>
          <button
              class="font-bold uppercase bg-blue-500 py-2 px-20 text-white rounded-lg"
              type="submit"
          >
            Guardar Informacion
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>