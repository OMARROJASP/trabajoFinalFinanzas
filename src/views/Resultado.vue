<template>
  <h2 class="font-bold my-3 uppercase text-2xl text-center">Resultados</h2>
  <h3>{{ as1 }}</h3>

  <!--
 <RouterLink to="/home/prestamo/calculo/calculoII" type="button" class="text-white bg-info mt-3 w-25 ">Calcular</RouterLink>
  -->
  <main class="px-5">
    <button
      @click="calcularConFor()"
      class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-lg"
    >
      Calcular
    </button>

    <table class="w-full bg-blue-100 mt-5 table-auto">
      <thead className="bg-blue-600 text-white capitalize">
        <tr>
          <th scope="col" className="p-2">#</th>
          <th scope="col" className="p-2">saldo Inicial</th>
          <th scope="col" className="p-2">Interés</th>
          <th scope="col" className="p-2">cuota</th>
          <th scope="col" className="p-2">amortización</th>
          <th scope="col" className="p-2">saldo final</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in list2">
          <td class="p-1 text-center">{{ item.id }}</td>
          <td class="p-1 text-center">{{ item.saldoI }}</td>
          <td class="p-1 text-center">{{ item.inter }}</td>
          <td class="p-1 text-center">{{ item.cou }}</td>
          <td class="p-1 text-center">{{ item.amort }}</td>
          <td class="p-1 text-center">{{ item.saldoF }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const useCalculo = useCalculosStore();

const { datos } = storeToRefs(useCalculo);

const list1 = ref([]);
// aqui se realizaron ejemplo previos

const precioDeVenta = ref(datos.value.at(0));
const coutaInicial = ref(datos.value.at(1));
const prestamo = ref(datos.value.at(2));
const FrecuenciaDePagos = ref(datos.value.at(3));
const numeroAnos = ref(datos.value.at(4));
const NdePeriodos = ref(datos.value.at(5));
const TEA = ref(datos.value.at(6));

const CI = ref();
const prestamos = ref();
const NPxA = ref();
const N = ref();
const TeaConvertido = ref();
const arriba = ref();
const abajo = ref();

const TES = ref();
const saldoInicialClass = ref(0);
const InteresClass = ref();
const CoutaClass = ref();
const AmortizacionClass = ref();
const SaldoFinalCLass = ref();

const calculosIniciales = () => {
  CI.value = coutaInicial.value * 100 * precioDeVenta.value;
  prestamos.value = precioDeVenta.value - CI.value;

  NPxA.value = 360 / FrecuenciaDePagos.value;
  N.value = NPxA.value + numeroAnos.value;
};

const aux = ref(1);
const hallosInterest = () => {
  if (saldoInicialClass.value != 0) {
    saldoInicialClass.value = SaldoFinalCLass.value;

    //calculo del TEA a TES
    TES.value =
      Math.pow(1 + TEA.value / 100, FrecuenciaDePagos.value / 360) - 1;

    // hallando el Interes
    InteresClass.value = TES.value * saldoInicialClass.value;
    // hallando la cuota
    arriba.value =
      TES.value * Math.pow(1 + TES.value, NdePeriodos.value - aux.value + 1);
    abajo.value =
      Math.pow(1 + TES.value, NdePeriodos.value - aux.value + 1) - 1;
    CoutaClass.value = saldoInicialClass.value * (arriba.value / abajo.value);
    // Amotizacion
    AmortizacionClass.value = CoutaClass.value - InteresClass.value;
    // saldo final
    SaldoFinalCLass.value = saldoInicialClass.value - AmortizacionClass.value;
    aux.value++;
  } else if (saldoInicialClass.value == 0) {
    //calculo del TEA a TES
    TES.value =
      Math.pow(1 + TEA.value / 100, FrecuenciaDePagos.value / 360) - 1;

    // hallando el Interes
    InteresClass.value = TES.value * prestamo.value;
    // hallando la cuota
    arriba.value = TES.value * Math.pow(1 + TES.value, 8);
    abajo.value = Math.pow(1 + TES.value, 8) - 1;
    CoutaClass.value = prestamo.value * (arriba.value / abajo.value);
    // Amotizacion
    AmortizacionClass.value = CoutaClass.value - InteresClass.value;
    // saldo final
    SaldoFinalCLass.value = prestamo.value - AmortizacionClass.value;
    aux.value++;
    saldoInicialClass.value = SaldoFinalCLass.value;
  }
};

const list2 = ref([]);
const calcularConFor = () => {
  for (let j = 1; j <= NdePeriodos.value; j++) {
    hallosInterest();
    list2.value.push({
      id: j,
      saldoI: saldoInicialClass.value.toFixed(2),
      inter: InteresClass.value.toFixed(2),
      cou: CoutaClass.value.toFixed(2),
      amort: AmortizacionClass.value.toFixed(2),
      saldoF: SaldoFinalCLass.value.toFixed(2),
    });
  }
};
</script>

<style scoped></style>
