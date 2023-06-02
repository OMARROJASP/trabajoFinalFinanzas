<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-11/12 mx-auto flex flex-col h-[85%] justify-between"
  >
    <h2 class="font-bold my-3 uppercase text-2xl text-center">
      Credito Hipotecario
    </h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#acacac] p-3 rounded-xl">
        <h2 class="uppercase font-bold">Datos del prestamo</h2>
        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Precio de Venta</label>
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="precioDeVenta"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Frecuencia de Pagos</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="FrecuenciaDePagos"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Couta Inicial %</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="coutaInicial"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Bono MiVivienda</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="BonoVivienda"
            />
          </div>
        </div>
      </div>

      <div class="bg-[#acacac] p-3 rounded-xl">
        <h2 class="uppercase font-bold">Costes/gastos Iniciales</h2>
        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costos Notariales</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="CostosNotariales"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costos Registrales</label>
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="CostosRegistrales"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Tasacion</label>
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="Tasacion"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-around">
      <button
        type="submit"
        @click="add(lista)"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-lg"
      >
        Agregar
      </button>
      <RouterLink
        to="/Resultado"
        type="button"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-lg"
        >Calcular</RouterLink
      >
    </div>
  </form>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import { ref } from "vue";

const useCalculo = useCalculosStore();

const { add } = useCalculo;

const precioDeVenta = ref(1800000);
const FrecuenciaDePagos = ref(0.2);
const coutaInicial = ref(1440000);
const BonoVivienda = ref(180);
const CostosNotariales = ref(4);
const CostosRegistrales = ref(8);
const Tasacion = ref(9);
const ComisionDeEstudio = ref(9);
const ComisionDeActivacion = ref(10);
const ComisionPeriodica = ref(11);
const Portes = ref(12);
const GastosAdministrativos = ref(13);
const seguroDeRiesgo = ref(14);

// falta 1
const lista = ref([
  precioDeVenta,
  FrecuenciaDePagos,
  coutaInicial,
  BonoVivienda,
  CostosNotariales,
  CostosRegistrales,
  Tasacion,
  ComisionDeEstudio,
  ComisionDeActivacion,
  ComisionPeriodica,
  Portes,
  GastosAdministrativos,
  seguroDeRiesgo,
]);
</script>

<style scoped></style>
