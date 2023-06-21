<template>
  <div class="bg-[#acacac] p-3 rounded-xl">
    <div class="gap-1 flex items-center justify-between">
      <div>Plazo de gracias total</div>
      <div>
        <input
          class="w-16 h-9"
          type="number"
          step="0.01"
          min="0"
          placeholder="plazos"
          id="input"
          v-model="plazosGraciasTotal"
        />
      </div>
      <div v-if="confirGraciaTotal === true">
        <button
          class="font-bold bg-blue-800 text-white px-4 py-2 w-16 rounded-lg"
          @click="botonGraciaTotal()"
        >
          SI
        </button>
      </div>
      <div v-if="confirGraciaTotal === false">
        <button
          class="font-bold text-white px-4 py-2 w-16 rounded-lg"
          @click="botonGraciaTotal()"
        >
          NO
        </button>
      </div>

      <!-- <div class="bg-blue-400">
            <div class="relative">
              <svg
                @click="mensajeDiasPeriodo"
                class="w-6 h-6 text-blue-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v2m0 4h.01m0 4h-.01M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16z"
                ></path>
              </svg>
              <div
                v-if="mostrarDiasPeriodo"
                class="absolute bg-white p-2 rounded shadow-lg"
              >
                <span class="text-blue-500 font-bold"
                  >Aqui pondrias informacion para el precio de venta</span
                >
              </div>
            </div>
          </div> -->
    </div>

    <div class="gap-1 flex items-center justify-between">
      <div>Plazo de gracias parcial</div>
      <div>
        <input
          class="w-16 h-9"
          type="number"
          step="0.01"
          min="0"
          id="input"
          placeholder="plazos"
          v-model="plazosGraciasParcial"
        />
      </div>
      <div v-if="confirGraciaParcial === true">
        <button
          class="font-bold bg-blue-800 text-white px-4 py-2 w-16 rounded-lg"
          @click="botonGraciaParcial()"
        >
          SI
        </button>
      </div>
      <div v-if="confirGraciaParcial === false">
        <button
          class="font-bold bg-red-800 text-white px-4 py-2 w-16 rounded-lg"
          @click="botonGraciaParcial()"
        >
          NO
        </button>
      </div>

      <!-- <div class="bg-blue-400">
            <div class="relative">
              <svg
                @click="mensajeDiasPeriodo"
                class="w-6 h-6 text-blue-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v2m0 4h.01m0 4h-.01M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16z"
                ></path>
              </svg>
              <div
                v-if="mostrarDiasPeriodo"
                class="absolute bg-white p-2 rounded shadow-lg"
              >
                <span class="text-blue-500 font-bold"
                  >Aqui pondrias informacion para el precio de venta</span
                >
              </div>
            </div>
          </div> -->
    </div>
  </div>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import { onMounted, ref } from "vue";

const useCalculo = useCalculosStore();

const next = ref(true);

const { add } = useCalculo;

const precioDeVenta = ref(25000);
const cuotaInicial = ref(20);
const nDeanoas = ref(2);
const diasXperiodo = ref();
const diasXanoas = ref(360);
const bonoMiVivienda = ref(0);
const TEA = ref(9);
const costosNotariales = ref(0);
const costosRegistrales = ref(0);
const estudioDeTitulos = ref(0);
const tasacion = ref(0);
const comisionDeActivacion = ref(0);
const comisionPeridica = ref(0);
const portes = ref(3.5);
const gastosAdministrativos = ref(0);
const seguroDesgravamenMen = ref(0.049);
const seguroRiesgoMen = ref(0.029);

// plazos
const plazosGraciasTotal = ref(1);
const plazosGraciasParcial = ref(2);
const bonoVerde = ref(0);
const confirGraciaTotal = ref(true);
const confirGraciaParcial = ref(true);

// datos adicionales
const mensajeBonoVerde = ref(false);

const mostrarPrecioVenta = ref(false);
const mostrarCoutaInicial = ref(false);
const mostrarNanios = ref(false);
const mostrarDiasPeriodo = ref(false);

const mensajePrecioVenta = () => {
  mostrarPrecioVenta.value = !mostrarPrecioVenta.value;
};
const mensajeCoutaInicial = () => {
  mostrarCoutaInicial.value = !mostrarCoutaInicial.value;
};

const mensajeNanios = () => {
  mostrarNanios.value = !mostrarNanios.value;
};

const mensajeDiasPeriodo = () => {
  mostrarDiasPeriodo.value = !mostrarDiasPeriodo.value;
};

const darValorDelBono = () => {
  if (precioDeVenta.value >= 65200 && precioDeVenta.value <= 93100) {
    bonoMiVivienda.value = 25700;
    bonoVerde.value = 5400;
    next.value = true;
  } else if (precioDeVenta.value > 93100 && precioDeVenta.value <= 139400) {
    bonoMiVivienda.value = 21400;
    bonoVerde.value = 5400;
    next.value = true;
  } else if (precioDeVenta.value > 139400 && precioDeVenta.value <= 232200) {
    bonoMiVivienda.value = 19600;
    bonoVerde.value = 5400;
    next.value = true;
  } else if (precioDeVenta.value > 232200 && precioDeVenta.value <= 343900) {
    bonoMiVivienda.value = 10800;
    bonoVerde.value = 5400;
    next.value = true;
  } else if (precioDeVenta.value > 343900 && precioDeVenta.value <= 464200) {
    bonoMiVivienda.value = 0;
    bonoVerde.value = 0;
    next.value = true;
  } else if (precioDeVenta.value > 464200) {
    bonoMiVivienda.value = 0;
    bonoVerde.value = 0;
    next.value = false;
  }
};

const isOpenCoutaInicial = ref(false);

const optionsCoutaInicial = ref([
  { id: 1, periodo: "Porcentaje", valor: cuotaInicial.value },
  { id: 2, periodo: "Efectivo", valor: cuotaInicial.value },
]);
const selectedOptionCoutaInicial = ref("");

const selectOptionCoutaInicial = (option) => {
  selectedOptionCoutaInicial.value = option.periodo;
  isOpenCoutaInicial.value = false;
};

const isOpenDiasPeriodo = ref(false);

const selectedOptionDiasPeriodo = ref("");
const optionsDiasPeriodo = ref([
  { id: 1, label: 30, periodo: "Mensual" },
  { id: 2, label: 60, periodo: "Bimestral" },
  { id: 3, label: 120, periodo: "Trimestral" },
  { id: 4, label: 150, periodo: "Cuatrimestral" },
  { id: 5, label: 180, periodo: "Semestral" },
]);

const toggleDropdownDiasPeriodo = () => {
  isOpenDiasPeriodo.value = !isOpenDiasPeriodo.value;
};

const selectOptionDiasPeriodo = (option) => {
  selectedOptionDiasPeriodo.value = option.periodo;
  isOpenDiasPeriodo.value = false;
  diasXperiodo.value = option.label;
};

const isOpenCostesNotariales = ref(false);

const optionsCostesNotariales = ref([
  { id: 1, periodo: "Prestamo" },
  { id: 2, periodo: "Efectivo" },
]);

const selectedOptionCostesNotariales = ref("");

const toggleDropdownCostesNotariales = () => {
  isOpenCostesNotariales.value = !isOpenCostesNotariales.value;
  isOpenCostesRegistrales.value = false;
};

const selectOptionCostesNotariales = (option) => {
  selectedOptionCostesNotariales.value = option.periodo;
  isOpenCostesNotariales.value = false;
};
const isOpenCostesRegistrales = ref(false);

const optionsCostesRegistrales = ref([
  { id: 1, periodo: "Prestamo" },
  { id: 2, periodo: "Efectivo" },
]);
const selectedOptionCostesRegistrales = ref("");

const toggleDropdownCostesRegistrales = () => {
  isOpenCostesRegistrales.value = !isOpenCostesRegistrales.value;
};

const selectOptionCostesRegistrales = (option) => {
  selectedOptionCostesRegistrales.value = option.periodo;
  isOpenCostesRegistrales.value = false;
};

const isOpenEstudioTitulos = ref(false);

const optionsEstudioTitulos = ref([
  { id: 1, periodo: "Prestamo" },
  { id: 2, periodo: "Efectivo" },
]);
const selectedOptionEstudioTitulos = ref("");

const toggleDropdownEstudioTitulos = () => {
  isOpenEstudioTitulos.value = !isOpenEstudioTitulos.value;
};

const selectOptionEstudioTitulos = (option) => {
  selectedOptionEstudioTitulos.value = option.periodo;
  isOpenEstudioTitulos.value = false;
};

const isOpenTasacion = ref(false);

const optionsTasacion = ref([
  { id: 1, periodo: "Prestamo" },
  { id: 2, periodo: "Efectivo" },
]);
const selectedOptionTasacion = ref("");

const toggleDropdownTasacion = () => {
  isOpenTasacion.value = !isOpenTasacion.value;
};

const selectOptionTasacion = (option) => {
  selectedOptionTasacion.value = option.periodo;
  isOpenTasacion.value = false;
};

const isOpenComisionAct = ref(false);

const optionsComisionActn = ref([
  { id: 1, periodo: "Prestamo" },
  { id: 2, periodo: "Efectivo" },
]);
const selectedOptionComisionAct = ref("");

const toggleDropdownComisionAct = () => {
  isOpenComisionAct.value = !isOpenComisionAct.value;
};

const selectOptionComisionAct = (option) => {
  selectedOptionComisionAct.value = option.periodo;
  isOpenComisionAct.value = false;
};

const botonGraciaTotal = () => {
  confirGraciaTotal.value = !confirGraciaTotal.value;
};
const botonGraciaParcial = () => {
  confirGraciaParcial.value = !confirGraciaParcial.value;
};

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
  seguroRiesgoMen,
  plazosGraciasTotal,
  plazosGraciasParcial,
  bonoVerde,
  confirGraciaTotal,
  confirGraciaParcial,
]);

onMounted(() => {
  selectOptionCoutaInicial(optionsCoutaInicial.value.at(0));
  selectOptionDiasPeriodo(optionsDiasPeriodo.value.at(0));
  selectOptionCostesNotariales(optionsCostesNotariales.value.at(0));
  selectOptionCostesRegistrales(optionsCostesRegistrales.value.at(0));
  selectOptionEstudioTitulos(optionsEstudioTitulos.value.at(0));
  selectOptionTasacion(optionsTasacion.value.at(0));
  selectOptionComisionAct(optionsComisionActn.value.at(0));
});
</script>
