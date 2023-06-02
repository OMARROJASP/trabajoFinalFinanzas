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
          <label for="inputPRECIO">Couta Inicial %</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="cuotaInicial"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">N° de Años</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="nDeanoas"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Dias Periodo</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="diasXperiodo"
            />
          </div>
        </div>
      </div>

      <div class="bg-[#acacac] p-3 rounded-xl">
        <h2 class="uppercase font-bold">Costes/gastos Iniciales</h2>
        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Dias por Año</label>
          <div>
            <input
              type="number"
              step="0.00000001"
              min="0"
              id="input"
              v-model="diasXanoas"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Bono fondo mi Vivienda</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="bonoMiVivienda"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">TEA</label>
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="TEA"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costes Notariales</label>
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="costosNotariales"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costes Registrales</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="costosRegistrales"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Estudio de titulos</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="estudioDeTitulos"
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
                v-model="tasacion"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Comision de Activacion</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="comisionDeActivacion"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Comision Periodica</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="comisionPeridica"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Portes</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="portes"
            />
          </div>
        </div>


        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Gastos Administrativos</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="gastosAdministrativos"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">%Seguro desgv. mensual</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="seguroDesgravamenMen"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">%Riesgo desgv. mensual</label>
          <div>
            <input
                type="number"
                step="0.01"
                min="0"
                id="input"
                v-model="seguroRiesgoMen"
            />
          </div>
        </div>



      </div>
    </div>
    <div class="flex justify-around">

      <RouterLink
        to="/Resultado"
        type="submit"
        @click="add(lista)"

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
const cuotaInicial = ref(0.2);
const nDeanoas = ref(1440000);
const diasXperiodo = ref(180);
const diasXanoas = ref(4);
const bonoMiVivienda = ref(4);
const TEA = ref(12);
const costosNotariales= ref(13);
const costosRegistrales = ref(8);
const estudioDeTitulos = ref(9);
const tasacion = ref(9);
const comisionDeActivacion = ref(10);
const comisionPeridica = ref(14);
const portes = ref(14);
const gastosAdministrativos = ref(14);
const seguroDesgravamenMen = ref(11);
const seguroRiesgoMen = ref(9);




// falta 1
const lista = ref([
  precioDeVenta,
  cuotaInicial,
  nDeanoas,
  diasXperiodo,
  diasXanoas,
  bonoMiVivienda,
  TEA,
  costosNotariales,
  costosRegistrales,
  estudioDeTitulos,
  tasacion,
  comisionDeActivacion,
  comisionPeridica,
  portes,
  gastosAdministrativos,
  seguroDesgravamenMen,
  seguroRiesgoMen
]);
</script>

<style scoped></style>
