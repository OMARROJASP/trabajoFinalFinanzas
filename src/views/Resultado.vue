<template>
  <h2 class="font-bold my-3 uppercase text-2xl text-center">Resultados</h2>
  <main class="px-5">
    <div class="flex justify-between">
      <button
        @click="calcularConFor()"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Calcular
      </button>

      <button
        @click="cambiarSolesDolares()"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Convertir a Dolares
      </button>
    </div>

    <table class="w-full bg-blue-100 table-auto">
      <thead className="bg-blue-600 text-white capitalize">
        <tr>
          <th scope="col" class="p-2">#</th>
          <th scope="col" class="p-2">N de dias</th>
          <th scope="col" class="p-2">tasa ajustada</th>
          <th scope="col" class="p-2">saldo incial</th>
          <th scope="col" class="p-2">Interes</th>
          <th scope="col" class="p-2">Couta</th>
          <th scope="col" class="p-2">Amortizacion</th>
          <th scope="col" class="p-2">Seguro de Amortizacion</th>
          <th scope="col" class="p-2">Seguro de Riesgo</th>
          <th scope="col" class="p-2">Costes / Gastos</th>
          <th scope="col" class="p-2">saldo final</th>
          <th scope="col" class="p-2">Flujo</th>
          <th scope="col" class="p-2">Flujo TEA</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in list2">
          <td class="p-1 text-center">{{ item.id }}</td>
          <td class="p-1 text-center">s/{{ item.saldoI }}</td>
          <td class="p-1 text-center">s/{{ item.inter }}</td>
          <td class="p-1 text-center">s/{{ item.cou }}</td>
          <td class="p-1 text-center">s/{{ item.amort }}</td>
          <td class="p-1 text-center">s/{{ item.saldoF }}</td>
        </tr>
      </tbody>
      <tbody></tbody>
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

const precioDeVenta1 = ref(datos.value.at(0));
const coutaInicial = ref(datos.value.at(1));
const prestamo = ref(datos.value.at(2));
const FrecuenciaDePagos = ref(datos.value.at(3));
const numeroAnos = ref(datos.value.at(4));
const NdePeriodos = ref(datos.value.at(5));
const TEA1 = ref(datos.value.at(6));
console.log(datos.value.at(0));
console.log(datos.value.at(0).value);
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

// aqui esta las variables q usaremos

const precioDeVenta          = ref(datos.value.at(0));
const cuotaInicial           = ref(datos.value.at(1));
const nDeanios               = ref(datos.value.at(2));
const diasXperiodo           = ref(datos.value.at(3));
const diasXanios             = ref(datos.value.at(4));
const bonoMiVivienda         = ref(datos.value.at(5));
const TEA                    = ref(datos.value.at(6));
const costosNotariales       = ref(datos.value.at(7));
const costosRegistrales      = ref(datos.value.at(8));
const estudioDeTitulos       = ref(datos.value.at(9));
const tasacion               = ref(datos.value.at(10));
const comisionDeActivacion   = ref(datos.value.at(11));
const comisionPeridica       = ref(datos.value.at(12));
const portes                 = ref(datos.value.at(13));
const gastosAdministrativos  = ref(datos.value.at(14));
const seguroDesgravamenMen   = ref(datos.value.at(15));
const seguroRiesgoMen        = ref(datos.value.at(16));



const CoutaInicial = ref();
const SaldoInicial = ref();
const Credito = ref();
const NPeriodosxAnios = ref();
const NTotalPeriodos = ref();
const TNMajustadaAlPlazo = ref();
const TNAajustadaAlPlazo = ref();
const ValorCouta = ref();
const ValorActualDelSaldo=ref();
const ValorActualExtra = ref();

const Interes = ref();
const Amortizacion = ref();
const SeguroDeDesgravamen = ref();
const SeguroContraTodoRiesgo = ref();
const CostesGastos = ref();
const DesembolsoTotal = ref();

const TasaDeDescuentoDiaria = ref();
const TCEAdeInteresDiaria = ref();
const TCEAdeLaOperacion = ref();
const VANoperacion = ref();

// variables del cronograma
const SaldoInicialCrono   = ref();
const InteresCrono        = ref()
const CoutaCrono          = ref();
const AmortCrono          = ref();
const SegDesgravamenCrono = ref();
const segRiesgoCrono      = ref();
const CostesRiesgos       = ref();
const SaldoFinalCrono     = ref();
const FlujoCrono          = ref();
const FlujoTEACrono       = ref();
const ValorActualCrono    = ref();

// empezamos con las operaciones
CoutaInicial.value = (cuotaInicial.value/100)*precioDeVenta.value;
SaldoInicial.value = precioDeVenta.value - CoutaInicial.value;
Credito.value = SaldoInicial.value;
NPeriodosxAnios.value = 360/diasXperiodo.value;
NTotalPeriodos.value = NPeriodosxAnios.value*nDeanios.value;
// hacer q lo revisen
TNAajustadaAlPlazo.value = NPeriodosxAnios.value*(Math.sqrt(1+TEA.value,1/NTotalPeriodos.value) - 1)
TNMajustadaAlPlazo.value = (TNAajustadaAlPlazo.value/360)*30;
ValorCouta.value = Credito.value*TNMajustadaAlPlazo.value*
    ((1+TNMajustadaAlPlazo.value)**NTotalPeriodos.value) /
    ((1+TNMajustadaAlPlazo.value)**(NTotalPeriodos.value-1));
// comienza el cronograma

for(var i =0; i <= NTotalPeriodos.value; i++){
  if(i!=0){
      SaldoInicialCrono.value = SaldoInicial.value;
      InteresCrono.value=-SaldoInicialCrono.value*TNMajustadaAlPlazo.value;
      CoutaCrono.value = ValorCouta.value;
      AmortCrono.value = SaldoInicialCrono.value-CoutaCrono.value;

  }else if(i==0){
    CostesGastos.value;
  }else{
    console.log("Hay error")
  }
}






























//////
const calculosIniciales = () => {
  CI.value = coutaInicial.value * 100 * precioDeVenta1.value;
  prestamos.value = precioDeVenta1.value - CI.value;

  NPxA.value = 360 / FrecuenciaDePagos.value;
  N.value = NPxA.value + numeroAnos.value;
};

const aux = ref(1);
const hallosInterest = () => {
  if (saldoInicialClass.value != 0) {
    saldoInicialClass.value = SaldoFinalCLass.value;

    //calculo del TEA a TES
    TES.value =
      Math.pow(1 + TEA1.value / 100, FrecuenciaDePagos.value / 360) - 1;

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
      Math.pow(1 + TEA1.value / 100, FrecuenciaDePagos.value / 360) - 1;

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

const cambiarSolesDolares = () => {
  list2.value.splice(0, list2.value.length);
  console.log(list2.value.length);
  precioDeVenta.value = datos.value.at(0).value / 3.67;
  console.log(precioDeVenta.value);
  coutaInicial.value = datos.value.at(1).value / 3.67;
  console.log(coutaInicial.value);
  prestamo.value = datos.value.at(2).value;
  console.log(prestamo.value);
  FrecuenciaDePagos.value = datos.value.at(3).value;
  console.log(FrecuenciaDePagos.value);
  numeroAnos.value = datos.value.at(4).value;
  console.log(numeroAnos.value);
  NdePeriodos.value = datos.value.at(5).value;
  console.log(NdePeriodos.value);
  TEA.value = datos.value.at(6).value;
  console.log(TEA.value);
  aux.value = 1;

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

const cambiarDolaresSoles = () => {};
</script>

<style scoped></style>
