<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-11/12 mx-auto flex flex-col h-[85%] justify-between"
  >
    <h2 class="font-bold my-3 uppercase text-2xl text-center">
      Credito Hipotecario
    </h2>
    <div class="grid grid-cols-2 gap-4 mb-2">
      <div class="bg-gray-200 p-3 rounded-xl">
        <h2 class="uppercase font-bold">Datos del prestamo</h2>
        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Precio de Venta</label>
          <div>
            <input v-if="precioDeVenta >= 65200 && precioDeVenta <= 464200"
                class="w-28 "
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="precioDeVenta"
            />
            <input v-else
                   class="w-28 border border-red-500 border-2 text-red-500 "
                   type="number"
                   step="0.01"
                   min="0"
                   id="input"
                   v-model="precioDeVenta"
            />

          </div>


        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Couta Inicial </label>
          <div>
            <input v-if="selectedOptionCoutaInicial === ''"
                   class="w-24"
                   type="number"
                   step="0.0000001"
                   min="0"
                   id="input"
                   v-model="cuotaInicial"
            />
            <input v-if="selectedOptionCoutaInicial === 'Porcentaje' && (cuotaInicial >= 7.5 && cuotaInicial <= 90)"
              class="w-24"
              type="number"
              step="0.0000001"
              min="0"
              id="input"
              v-model="cuotaInicial"
            />
            <input v-if="selectedOptionCoutaInicial === 'Porcentaje' && (cuotaInicial < 7.5 || cuotaInicial > 90)"
                   class="w-24 border border-red-500 border-2 text-red-500"
                   type="number"
                   step="0.0000001"
                   min="0"
                   id="input"
                   v-model="cuotaInicial"
            />
            <input v-if="selectedOptionCoutaInicial === 'Efectivo' && (cuotaInicial >= 100 && cuotaInicial <= 464200)"
                   class="w-24"
                   type="number"
                   step="0.0000001"
                   min="0"
                   id="input"
                   v-model="cuotaInicial"
            />
            <input v-if="selectedOptionCoutaInicial === 'Efectivo' && (cuotaInicial <100 || cuotaInicial > 464200)"
                     class="w-24 border border-red-500 border-2 text-red-500"
                     type="number"
                     step="0.0000001"
                     min="0"
                     id="input"
                     v-model="cuotaInicial"
          />
          </div>
          <div class="relative">
            <button @click="toggleDropdownCoutaInicial" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionCoutaInicial }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenCoutaInicial" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsCoutaInicial" :key="option.id" @click="selectOptionCoutaInicial(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>
            </div>
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
                class="w-12 h-9 text-center"
                type="number"
                step="0.00000001"
                min="0"
                id="input"
                v-model="diasXperiodo"
            />
          </div>


          <div class="relative">
            <button @click="toggleDropdownDiasPeriodo" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionDiasPeriodo }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenDiasPeriodo" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsDiasPeriodo" :key="option.id" @click="selectOptionDiasPeriodo(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>


        </div>
      </div>

      <div class="bg-gray-200 p-3 rounded-xl">


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
          <label for="inputPRECIO">TEA</label>
          <div>
            <input type="number" step="0.01" min="0" id="input" v-model="TEA" />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costes Notariales</label>
          <div>
            <input
                class="w-12 h-9 text-center"
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="costosNotariales"
            />
          </div>
          <div class="relative">
            <button @click="toggleDropdownCostesNotariales" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionCostesNotariales }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenCostesNotariales" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsCostesNotariales" :key="option.id" @click="selectOptionCostesNotariales(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>


        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Costes Registrales</label>
          <div>
            <input
                class="w-12 h-9 text-center"
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="costosRegistrales"
            />
          </div>
          <div class="relative">
            <button @click="toggleDropdownCostesRegistrales" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionCostesRegistrales }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenCostesRegistrales" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsCostesRegistrales" :key="option.id" @click="selectOptionCostesRegistrales(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>

        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Estudio de titulos</label>
          <div>
            <input
                class="w-12 h-9 text-center"
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="estudioDeTitulos"
            />
          </div>
          <div class="relative">
            <button @click="toggleDropdownEstudioTitulos" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionEstudioTitulos }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenEstudioTitulos" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsEstudioTitulos" :key="option.id" @click="selectOptionEstudioTitulos(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>


        </div>

        <div class="flex items-center justify-between my-3">
         <div>
           <label for="inputPRECIO">Tasacion</label>
         </div>
          <div>
            <input
                class="w-12 h-9 text-center"
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="tasacion"
            />
          </div>
          <div class="relative">
            <button @click="toggleDropdownTasacion" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionTasacion }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenTasacion" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsTasacion" :key="option.id" @click="selectOptionTasacion(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>


        </div>

        <div class="flex items-center justify-between my-3">
          <div>
            <label for="inputPRECIO">Comision de Activacion</label>
          </div>
          <div>
            <input
                class="w-12 h-9 text-center"
              type="number"
              step="0.01"
              min="0"
              id="input"
              v-model="comisionDeActivacion"
            />
          </div>

          <div class="relative">
            <button @click="toggleDropdownComisionAct" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ selectedOptionComisionAct }}
              <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6H4v8h12V6h-1l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isOpenComisionAct" class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul>
                <li v-for="option in optionsComisionActn" :key="option.id" @click="selectOptionComisionAct(option)" class="py-1 px-4  cursor-pointer hover:bg-gray-100">
                  {{ option.periodo }}
                </li>
              </ul>


            </div>

          </div>



        </div>




      </div>
      <div class="bg-gray-200 p-3 rounded-xl">
        <h1>Costes de los costos/ gastos periodicos</h1>

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
                step="0.001"
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
                step="0.001"
                min="0"
                id="input"
                v-model="seguroRiesgoMen"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-3">
          <label for="inputPRECIO">Tasa de Descuento</label>
          <div>
            <input
                type="number"
                step="0.001"
                min="0"
                id="input"
                v-model="tasaDeDescuento"
            />
          </div>
        </div>


      </div>
      <div class="bg-gray-200 p-3 rounded-xl">

        <div class="grid grid-cols-3 gap-1 flex items-center justify-between">
          <div>
            Plazo de gracias total
          </div>
          <div >
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
            <button class="font-bold bg-blue-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonGraciaTotal()"> SI </button>
          </div>
          <div v-if="confirGraciaTotal === false">
            <button class="font-bold bg-red-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonGraciaTotal()"> NO </button>
          </div>


        </div>


        <div class="grid grid-cols-3 gap-1 flex items-center justify-between">
          <div >
            Plazo de gracias parcial
          </div>
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
          <div  v-if="confirGraciaParcial === true">
            <button class="font-bold bg-blue-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonGraciaParcial()"> SI </button>
          </div>
          <div  v-if="confirGraciaParcial === false">
            <button class="font-bold bg-red-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonGraciaParcial()"> NO </button>
          </div>

          <div class="bg-blue-400">

          </div>
        </div>


        <div class="grid grid-cols-3 gap-1 flex items-center justify-between">
          <div >
            Moneda
          </div>
          <div>

          </div>

          <div  v-if="solesOdolares === 1 ">
            <button class="font-bold bg-blue-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonSolesDolar1()"> Soles </button>
          </div>
          <div  v-if="solesOdolares === 2">
            <button class="font-bold bg-green-800 text-white px-4 py-2 w-16 rounded-lg"
                    @click="botonSolesDolar2()"> Dolar </button>
          </div>

          <div class="bg-blue-400">

          </div>
        </div>

      </div>
    </div>
    <div v-if="next === true" class="flex justify-center" >
      <RouterLink
        to="/Resultado"
        type="submit"
        @click="add(lista)"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-lg"
        >Calcular</RouterLink
      >
    </div>

    <div v-if="next === false " class="flex justify-center" >
      <button
          class="uppercase font-bold bg-red-500 text-white px-4 py-2 rounded-lg"
      >Calcular</button>
    </div>



    <div v-if="precioDeVenta >= 65200 &&  precioDeVenta <= 93100" >
      <p>*Se le aplicara el bono del Buen Pagador(BBP) de s/25,700.00</p>
      <p>**Se le aplicara el bono verde de s/5,400.00</p>
      {{darValorDelBono()}}

    </div>

    <div v-if="precioDeVenta > 93100 &&  precioDeVenta <= 139400">
      <p>*Se le aplicara el bono del Buen Pagador(BBP) de s/21,400.00</p>
      <p>**Se le aplicara el bono verde de s/5,400.00</p>
      {{darValorDelBono()}}

    </div>

    <div v-if="precioDeVenta > 139400 &&  precioDeVenta <= 232200">
      <p>*Se le aplicara el bono del Buen Pagador(BBP) de s/19,600.00</p>
      <p>**Se le aplicara el bono verde de s/5,400.00</p>
      {{darValorDelBono()}}
      <p> el valor de periodo {{diasXperiodo}}</p>
      <p> el valor de couta inicial {{cuotaInicial}}</p>


    </div>

    <div  v-if="precioDeVenta > 232200 && precioDeVenta <= 343900">
      <p>*Se le aplicara el bono del Buen Pagador(BBP) de s/10,800.00</p>
      <p>**Se le aplicara el bono verde de s/5,400.00</p>
      {{darValorDelBono()}}
    </div>

    <div v-if="precioDeVenta > 343900 && precioDeVenta <= 464200">
      <p>**No se le aplicara el Bono del Buen Pagador(BBP) </p>
      <p>**No se le aplicara el bono verde </p>
      {{darValorDelBono()}}
    </div>


    <div v-if="precioDeVenta > 464200">
      {{darValorDelBono()}}
      <p>**No procede los Bonos MiVivienda, sobrepasa los s/464,200.00  </p>
      <p>Para continuar cambie de Precio de Venta menor a s/464,200.00  </p>

    </div>
  </form>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import {onMounted, ref} from "vue";

const useCalculo = useCalculosStore();



const next = ref(true);

const { add } = useCalculo;

const precioDeVenta = ref(250000);
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
const portes                    = ref(3.50);
const gastosAdministrativos     = ref(0);
const seguroDesgravamenMen      = ref(0.049);
const seguroRiesgoMen           = ref(0.029);

// plazos
const plazosGraciasTotal        = ref(1);
const plazosGraciasParcial      = ref(2);
const bonoVerde                 = ref(0);
const confirGraciaTotal         = ref(true);
const confirGraciaParcial       = ref(true);
const solesOdolares             = ref(1);
const tasaDeDescuento           = ref(50);


// datos adicionales
const mensajeBonoVerde = ref(false);

const botonSolesDolar1 = ()=>{
  solesOdolares.value = 2;
}

const botonSolesDolar2 = ()=>{
  solesOdolares.value = 1;
}

const darValorDelBono=()=> {

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
  }else if ( precioDeVenta.value > 464200) {
    bonoMiVivienda.value = 0;
    bonoVerde.value = 0;
    next.value = false;
  }
}

// Dropdown de las variables


const isOpenCoutaInicial = ref(false);

const  optionsCoutaInicial  =  ref([
  { id: 1 , periodo: 'Porcentaje', valor: cuotaInicial.value},
  { id: 2 , periodo: 'Efectivo', valor: cuotaInicial.value},
])
const selectedOptionCoutaInicial = ref('');


const toggleDropdownCoutaInicial =()=>{
  isOpenCoutaInicial.value = !isOpenCoutaInicial.value;
}

const  selectOptionCoutaInicial=(option)=> {
  selectedOptionCoutaInicial.value = option.periodo;
  isOpenCoutaInicial.value = false;

}

  const isOpenDiasPeriodo = ref(false);

  const selectedOptionDiasPeriodo = ref('');
  const optionsDiasPeriodo = ref([
    {id: 1, label: 30, periodo: 'Mensual'},
    {id: 2, label: 60, periodo: 'Bimestral'},
    {id: 3, label: 120, periodo: 'Trimestral'},
    {id: 4, label: 150, periodo: 'Cuatrimestral'},
    {id: 5, label: 180, periodo: 'Semestral'},
  ])

  const toggleDropdownDiasPeriodo = () => {
    isOpenDiasPeriodo.value = !isOpenDiasPeriodo.value;
  }

  const selectOptionDiasPeriodo = (option) => {
    selectedOptionDiasPeriodo.value = option.periodo;
    isOpenDiasPeriodo.value = false;
    diasXperiodo.value = option.label;
  }


const isOpenCostesNotariales = ref(false);

const  optionsCostesNotariales  =  ref([
  { id: 1 , periodo: 'Prestamo'},
  { id: 2 , periodo: 'Efectivo'},
])

const selectedOptionCostesNotariales = ref('');


const toggleDropdownCostesNotariales =()=>{
  isOpenCostesNotariales.value = !isOpenCostesNotariales.value;
  isOpenCostesRegistrales.value = false;
}

const  selectOptionCostesNotariales=(option)=> {
  selectedOptionCostesNotariales.value = option.periodo;
  isOpenCostesNotariales.value = false;

}
  const isOpenCostesRegistrales = ref(false);

  const  optionsCostesRegistrales  =  ref([
    { id: 1 , periodo: 'Prestamo'},
    { id: 2 , periodo: 'Efectivo'},
  ])
  const selectedOptionCostesRegistrales = ref('');


  const toggleDropdownCostesRegistrales =()=>{
    isOpenCostesRegistrales.value = !isOpenCostesRegistrales.value;
  }

  const  selectOptionCostesRegistrales=(option)=> {
    selectedOptionCostesRegistrales.value = option.periodo;
    isOpenCostesRegistrales.value = false;
  }

const isOpenEstudioTitulos = ref(false);

const  optionsEstudioTitulos  =  ref([
  { id: 1 , periodo: 'Prestamo'},
  { id: 2 , periodo: 'Efectivo'},
])
const selectedOptionEstudioTitulos = ref('');


const toggleDropdownEstudioTitulos =()=>{
  isOpenEstudioTitulos.value = !isOpenEstudioTitulos.value;
}

const  selectOptionEstudioTitulos=(option)=> {
  selectedOptionEstudioTitulos.value = option.periodo;
  isOpenEstudioTitulos.value = false;
}

const isOpenTasacion = ref(false);

const  optionsTasacion  =  ref([
  { id: 1 , periodo: 'Prestamo'},
  { id: 2 , periodo: 'Efectivo'},
])
const selectedOptionTasacion = ref('');


const toggleDropdownTasacion =()=>{
  isOpenTasacion.value = !isOpenTasacion.value;
}

const  selectOptionTasacion=(option)=> {
  selectedOptionTasacion.value = option.periodo;
  isOpenTasacion.value = false;
}


const isOpenComisionAct = ref(false);

const  optionsComisionActn  =  ref([
  { id: 1 , periodo: 'Prestamo'},
  { id: 2 , periodo: 'Efectivo'},
])
const selectedOptionComisionAct = ref('');


const toggleDropdownComisionAct =()=>{
  isOpenComisionAct.value = !isOpenComisionAct.value;
}

const  selectOptionComisionAct=(option)=> {
  selectedOptionComisionAct.value = option.periodo;
  isOpenComisionAct.value = false;
}




const botonGraciaTotal = ()=>{
  confirGraciaTotal.value= !confirGraciaTotal.value;
}
const botonGraciaParcial = ()=>{
  confirGraciaParcial.value=  !confirGraciaParcial.value;
}



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
    solesOdolares,
]);


onMounted(() => {
  selectOptionCoutaInicial(optionsCoutaInicial.value.at(0));
  selectOptionDiasPeriodo(optionsDiasPeriodo.value.at(0));
  selectOptionCostesNotariales(optionsCostesNotariales.value.at(0));
  selectOptionCostesRegistrales(optionsCostesRegistrales.value.at(0));
  selectOptionEstudioTitulos(optionsEstudioTitulos.value.at(0));
  selectOptionTasacion(optionsTasacion.value.at(0));
  selectOptionComisionAct(optionsComisionActn.value.at(0));
})
</script>


<style scoped></style>
