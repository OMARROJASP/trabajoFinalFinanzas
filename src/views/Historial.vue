<template>
  <main class="px-5">
    <table class="w-full bg-blue-100 mt-5 table-auto">
      <thead className="bg-blue-600 text-white capitalize">
        <tr>
          <th scope="col" class="p-2">#</th>
          <th scope="col" class="p-2">saldo Inicial</th>
          <th scope="col" class="p-2">Interes</th>
          <th scope="col" class="p-2">couta</th>
          <th scope="col" class="p-2">amortizacion</th>
          <th scope="col" class="p-2">saldo final</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataBaseStore.documents">
          <td>{{ item.precioDeVenta }}</td>
          <td>{{ item.coutaInicial }}</td>
          <td>{{ item.prestamo }}</td>
          <td>{{ item.FrecuenciaDePagos }}</td>
          <td>{{ item.numeroAnos }}</td>
          <td>{{ item.NdePeriodos }}</td>
          <td>{{ item.TEA }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { useDatabaseStore } from "../stores/database";
import { useUserStore } from "../stores/user";

const dataBaseStore = useDatabaseStore();
const userStore = useUserStore();
</script>

<style scoped></style>
