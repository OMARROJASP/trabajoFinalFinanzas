<template>
<div>
  <table class="w-full bg-blue-100 table-auto">
    <thead className="bg-blue-600 text-white capitalize">
    <tr>
      <th scope="col" class="p-2">precio De Venta</th>
      <th scope="col" class="p-2">N° de años</th>
      <th scope="col" class="p-2">Bono Mi Vivienda</th>
      <th scope="col" class="p-2">Bono Verde</th>
      <th scope="col" class="p-2">Opciones</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item in dataBaseStore.documents">
      <td class="p-1 text-center">s/{{ item.precioDeVenta }}</td>
      <td class="p-1 text-center">{{ item.nDeanios }}</td>
      <td class="p-1 text-center">s/{{ item.bonoMiVivienda }}</td>
      <td class="p-1 text-center">s/{{ item.bonoVerde }}</td>
      <button class="bg-blue-600">Ver Mas</button>
    </tr>
    </tbody>
  </table>
</div>

</template>

<script setup>
import { useDatabaseStore } from "../stores/database";
import { useUserStore } from "../stores/user";
import {onBeforeMount, ref} from "vue";

const dataBaseStore = useDatabaseStore();
const userStore = useUserStore();

onBeforeMount(async () => {
console.log("vamos")
  await dataBaseStore.getPrestamo();
});

const indice = ref(1);

const sumar = () => {
  indice.value++;
}

</script>

<style scoped></style>
