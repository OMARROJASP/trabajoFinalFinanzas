<template>
  <h2 class="font-bold my-3 uppercase text-2xl text-center">Resultados</h2>
  <main class="px-5">
    <div class="flex justify-between">
      <button
        @click="CalculoGraciaTotalParcial()"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Calcular
      </button>

      <button

        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Convertir a Dolares
      </button>
    </div>

    <div>
    <div>
      <p>Intereses                : {{InteresTotal}}</p>
      <p>Amortizacion del capital : {{AmortizacionTotal}} </p>
      <p>seguro de desgravamen : {{SeguroDeDesgravamenTotal}}</p>
      <p>seguro de todo riesgo : {{SeguroContraTodoRiesgoTotal}}</p>
      <p>Costos / Gatasos  : {{CostesGastosTotal}}</p>
      <p>Desembolso total : {{DesembolsoTotal}}</p>
    </div>
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
        <tr v-for="item in list1">
          <td class="p-1 text-center">{{ item.id }}</td>
          <td class="p-1 text-center">{{ item.nDias }}</td>
          <td class="p-1 text-center">{{ item.tasaAjustada }}</td>
          <td class="p-1 text-center">s/{{ item.saldoInicial }}</td>
          <td class="p-1 text-center">s/{{ item.Interes }}</td>
          <td class="p-1 text-center">s/{{ item.Couta }}</td>
          <td class="p-1 text-center">s/{{ item.Amortizacion }}</td>
          <td class="p-1 text-center">s/{{ item.SeguroDesgravemen }}</td>
          <td class="p-1 text-center">s/{{ item.SeguroRiesgo }}</td>
          <td class="p-1 text-center">s/{{ item.CostesRiesgos }}</td>
          <td class="p-1 text-center">s/{{ item.SaldoFinal }}</td>
          <td class="p-1 text-center">s/{{ item.Flujo }}</td>
        </tr>
      </tbody>
      <tbody></tbody>
    </table>
  </main>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";

const useCalculo = useCalculosStore();

const { datos } = storeToRefs(useCalculo);

let list1 = ref([]);


// variables necesarias
const  costosNotarialesBool           = ref(false); // cuando es prestamo = false
const  costosRegistralesBool          = ref(false);
const  estudioTitulosBool             = ref(false);
const  TasacionBool                   = ref(false);
const  comisionActivacionBool         = ref(false);
const  variableCostesGastosIniciales  = ref(0);
const  frecuenciaDePago               = ref(30); // es mensual cambiar luego
const  TEP                            = ref();
const  arriba                         = ref();
const  abajo                          = ref();
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
const seguroDesgravamenPer   = ref(datos.value.at(15));
const seguroRiesgoPer        = ref(datos.value.at(16));
const plazosGraciasTotal     = ref(datos.value.at(17));
const plazosGraciasParcial   = ref(datos.value.at(18));
const bonoVerde              = ref(datos.value.at(19));
const confirGraciaTotal      = ref(false);
const confirGraciaParcial    = ref(false);


// resultado del financiamiento
const CoutaInicial              = ref();
const SaldoFinanciar            = ref();
const Credito                   = ref();
const NPeriodosxAnios           = ref();
const NTotalPeriodos            = ref();
const TNPajustadaAlPlazo        = ref();
const TNAajustadaAlPlazo        = ref();
const ValorCouta                = ref();
const ValorActualDelSaldo       =ref();
const ValorActualExtra          = ref();

// resultado totales

const InteresTotal                  = ref(0);
const AmortizacionTotal             = ref(0);
const SeguroDeDesgravamenTotal      = ref(0);
const SeguroContraTodoRiesgoTotal   = ref(0);
const CostesGastosTotal             = ref(0);
const DesembolsoTotal               = ref(0);

// Ressultado de indicadore de rentabilidad

const TasaDeDescuentoDiaria      = ref();
const TCEAdeInteresDiaria        = ref();
const TCEAdeLaOperacion          = ref();
const VANoperacion               = ref();
const DiasPorPeriodo             = ref();

// variables del cronograma
const SaldoInicialCrono   = ref();
const InteresCrono        = ref()
const CoutaCrono          = ref();
const AmortCrono          = ref();
const SegDesgravamenCrono = ref();
const segRiesgoCrono      = ref();
const CostesRiesgosCrono  = ref();
const SaldoFinalCrono     = ref();
const FlujoCrono          = ref();
const FlujoTEACrono       = ref();
const ValorActualCrono    = ref();

onMounted(() => {
  calculosIniciales();
})


// empezamos con las operaciones

// esto tiene q iniciar primero
const sumaCostosGastosIniciales=()=>{

    if(!costosNotarialesBool.value)   {variableCostesGastosIniciales.value=+ costosNotariales.value}
    if(!costosRegistralesBool.value)  {variableCostesGastosIniciales.value=+ costosRegistrales.value}
    if(!estudioTitulosBool.value)     {variableCostesGastosIniciales.value=+ estudioDeTitulos.value}
    if(!TasacionBool.value)           {variableCostesGastosIniciales.value=+ tasacion.value}
    if(!comisionActivacionBool.value) {variableCostesGastosIniciales.value=+ comisionDeActivacion.value}

}

const  calculosIniciales= ()=>{

  console.log( "COUTA INICIAL0   " + cuotaInicial.value);
  console.log( "el valor del periodo " + diasXperiodo.value)
  TEA.value = TEA.value/100;
  console.log( "el TEa esta aqui sera igual" +TEA.value);
  // transformar TASA ANUAL A TASA EFECTIVA PERIODO
  TEP.value = (1 + TEA.value)**(diasXperiodo.value/diasXanios.value) -1;
  console.log( "el TEP esta aqui sera igual" +TEP.value);


  sumaCostosGastosIniciales();

  if(cuotaInicial.value < 90){
    CoutaInicial.value = (cuotaInicial.value/100)*precioDeVenta.value;
    console.log( "COUTA INICIAL1   " + CoutaInicial.value);
  }else {
    CoutaInicial.value = cuotaInicial.value;
    console.log( "COUTA INICIAL2   " + CoutaInicial.value);
  }
  //SaldoFinanciar.value = precioDeVenta.value - CoutaInicial.value - bonoMiVivienda.value - bonoVerde.value;
  SaldoFinanciar.value = precioDeVenta.value - CoutaInicial.value;
  console.log( "SaldoFinanciar   " + SaldoFinanciar.value);

  Credito.value = SaldoFinanciar.value + variableCostesGastosIniciales.value ;
  console.log( "Credito  " + Credito.value);

  NPeriodosxAnios.value = diasXanios.value/diasXperiodo.value;
  console.log( "NPeriodosxAnios   " + NPeriodosxAnios.value);

  NTotalPeriodos.value = NPeriodosxAnios.value*nDeanios.value;
  console.log( "NTotalPeriodos  "  + NTotalPeriodos.value);
  console.log( "diasXperiodo   " + diasXperiodo.value)
  const  v1 = ref();
  const  v2 = ref();
  v1.value = 1 + TEA.value;
  v2.value = 1 / 12;
  TNPajustadaAlPlazo.value = (diasXperiodo.value/30)* (Math.pow(v1.value, v2.value) - 1);
  console.log( "diasXperiodo******************   " + diasXperiodo.value/30);

  console.log( "TEA******************   " +  + TEA.value);
  console.log( "diasXperiodo******************   " +  + TEA.value);

  console.log( "TNPajustadaAlPlazo  "  + TNPajustadaAlPlazo.value);

  TNAajustadaAlPlazo.value =  Math.sqrt(1 + TNPajustadaAlPlazo.value, NPeriodosxAnios.value)-1;
  console.log( "TNAajustadaAlPlazo  "  + TNAajustadaAlPlazo.value);



  // estamos trabajando con Capitalizacion Mensual
/*
  TNPajustadaAlPlazo.value =Math.sqrt(1 + TEA.value, 1 / NTotalPeriodos.value) - 1;
  console.log( "TNPajustadaAlPlazo  "  + TNPajustadaAlPlazo.value);
  TNAajustadaAlPlazo.value = Math.sqrt(1 + TNPajustadaAlPlazo.value, NPeriodosxAnios.value)-1;
  console.log( "TNAajustadaAlPlazo  "  + TNAajustadaAlPlazo.value);
 */

  console.log(TNPajustadaAlPlazo.value);
  console.log(TNAajustadaAlPlazo.value);


  const arriba = ref();
  const abajo = ref();
  arriba.value =TEP.value * Math.pow(1 + TEP.value, NTotalPeriodos.value);
  abajo.value =Math.pow(1 + TEP.value, NTotalPeriodos.value) - 1;


  ValorCouta.value = Credito.value*(arriba.value/abajo.value);
  console.log( "arriba   " + arriba.value)
  console.log( "abajo   " + abajo.value)
  console.log( "ValorCouta   " + ValorCouta.value);

  ValorActualDelSaldo.value =  0.0000;
  console.log( "ValorActualDelSaldo   " + ValorActualDelSaldo.value);

  ValorActualExtra.value = Credito.value;
  console.log( "ValorActualExtra   " + ValorActualExtra.value);

}


const ElegirCalculo=()=> {

  if(confirGraciaTotal.value === false && confirGraciaParcial.value === false ){
    CalculoNormal();
  }

  else if(confirGraciaTotal.value === true && confirGraciaParcial.value === true ){
    CalculoGraciaTotalParcial();
  }
  else if(confirGraciaTotal.value === true && confirGraciaParcial.value === false ){
    CalculoGraciaTotal();
  }
  else if(confirGraciaTotal.value === false && confirGraciaParcial.value === true ){
    CalculoGraciasParcial();
  }

}


const  CalculoGraciaTotalParcial = () => {

  for(let i =0; i <= NTotalPeriodos.value; i++) {
    if(i!==0  ) {
      if(i == 7  ){
        TEA.value = 0.10;
        console.log("nueva  TEA" + TEA.value);
        TEP.value = (1 + TEA.value)**(diasXperiodo.value/diasXanios.value) -1;
        console.log("nueva TEP" + TEP.value);
      }
      InteresCrono.value = ValorActualCrono.value * TEP.value;
      console.log("InteresCrono   " + InteresCrono.value);


      if(i <= plazosGraciasTotal.value){
        console.log(i)
        CoutaCrono.value = 0;
        AmortCrono.value = 0;
       // AmortCrono.value =CoutaCrono.value - InteresCrono.value;
        console.log( "AmortCrono    " + AmortCrono.value);
        SaldoFinalCrono.value = ValorActualCrono.value + InteresCrono.value;
        console.log( "SaldoFinalCrono   " + SaldoFinalCrono.value);


      }else if (i <= plazosGraciasParcial.value + plazosGraciasTotal.value ){
        console.log("1")
        CoutaCrono.value = InteresCrono.value;
        AmortCrono.value = 0;
        // AmortCrono.value =CoutaCrono.value - InteresCrono.value;
        console.log( "AmortCrono    " + AmortCrono.value);
        SaldoFinalCrono.value = ValorActualCrono.value;
        console.log( "SaldoFinalCrono   " + SaldoFinalCrono.value);


      }
     else {
        console.log(i)
       const arribaC = ref();
       const abajoC = ref();
       arribaC.value = TEP.value * (1+TEP.value)**(NTotalPeriodos.value - i + 1);
        console.log( "arriba " + arribaC.value)
       abajoC.value = ((1 + TEP.value)**(NTotalPeriodos.value - i + 1))-1;
        console.log("abajo "  + abajoC.value)
        CoutaCrono.value = ValorActualCrono.value*(arribaC.value/abajoC.value);
        console.log("valor actual" +  ValorActualCrono.value)
        console.log("crono value" +  CoutaCrono.value)
        AmortCrono.value = CoutaCrono.value - InteresCrono.value;
        console.log("AmortCrono.value " + AmortCrono.value )
        SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;
        console.log("SaldoFinalCrono.value" + SaldoFinalCrono.value)

      }


      console.log( "SaldoFinalCrono   " + SaldoFinalCrono.value);

      FlujoCrono.value = CoutaCrono.value;
      console.log( "FlujoCrono   " + FlujoCrono.value);

      list1.value.push({
        id: i,
        nDias: 30,
        tasaAjustada:TEP.value.toFixed(7),
        saldoInicial: ValorActualCrono.value.toFixed(2),
        Interes: InteresCrono.value.toFixed(2),
        Couta: CoutaCrono.value.toFixed(2),
        Amortizacion: AmortCrono.value.toFixed(2),
        SeguroDesgravemen: 0,
        SeguroRiesgo: 0,
        CostesRiesgos: 0,
        SaldoFinal: SaldoFinalCrono.value.toFixed(2),
        Flujo: FlujoCrono.value.toFixed(2),
        //toFixed(2)
      })
      ValorActualCrono.value = SaldoFinalCrono.value;
      ValorActualExtra.value = SaldoFinalCrono.value;
      ValorActualDelSaldo.value = SaldoFinalCrono.value;
    }
    else if(i===0){
      FlujoCrono.value = Credito.value;
      FlujoTEACrono.value = Credito.value;
      ValorActualCrono.value = Credito.value;
      console.log(ValorActualCrono.value)
      SaldoInicialCrono.value = Credito.value;
      list1.value.push({
        id: i,
        nDias: 30,
        tasaAjustada:TEP.value.toFixed(7),
        saldoInicial: 0,
        Interes: 0,
        Couta: 0,
        Amortizacion: 0,
        SeguroDesgravemen: 0,
        SeguroRiesgo: 0,
        CostesRiesgos: 0,
        SaldoFinal: 0,
        Flujo: SaldoInicialCrono.value.toFixed(2),
        //toFixed(2)
      })
    }else{
      console.log("Hay error")
    }

  }

}

const  CalculoGraciaTotal = () => {

}

const  CalculoGraciasParcial = () => {

}


const  CalculoNormal=()=>{
  // limpiar lista
  list1.value.splice(0, list1.value.length);


  // resultado totales




  // comienza el cronograma


   for(let i =0; i <= NTotalPeriodos.value; i++){



     if(i!==0  ) {


       InteresCrono.value = ValorActualCrono.value * TEP.value;
       console.log("InteresCrono   " + InteresCrono.value);

       CoutaCrono.value = ValorCouta.value;
       console.log("CoutaCrono   " + CoutaCrono.value);



       SegDesgravamenCrono.value = ValorActualCrono.value * (seguroDesgravamenPer.value / 100);
       console.log("SegDesgravamenCrono   " + SegDesgravamenCrono.value);

       segRiesgoCrono.value = ValorActualCrono.value * (seguroRiesgoPer.value / 100);
       console.log("segRiesgoCrono   " + segRiesgoCrono.value);

       CostesRiesgosCrono.value = comisionPeridica.value + portes.value + gastosAdministrativos.value;
       console.log("CostesRiesgosCrono   " + CostesRiesgosCrono.value);

       AmortCrono.value =CoutaCrono.value - InteresCrono.value
           -  SegDesgravamenCrono.value
           -  segRiesgoCrono.value
           -  CostesRiesgosCrono.value;
       console.log( "AmortCrono    " + AmortCrono.value);

       SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;
       console.log( "SaldoFinalCrono   " + SaldoFinalCrono.value);

       FlujoCrono.value = CoutaCrono.value;
       console.log( "FlujoCrono   " + FlujoCrono.value);

       list1.value.push({
         id: i,
         nDias: 30,
         tasaAjustada:TEP.value.toFixed(7),
         saldoInicial: SaldoInicialCrono.value.toFixed(2),
         Interes: InteresCrono.value.toFixed(2),
         Couta: CoutaCrono.value.toFixed(2),
         Amortizacion: AmortCrono.value.toFixed(2),
         SeguroDesgravemen: SegDesgravamenCrono.value.toFixed(2),
         SeguroRiesgo: segRiesgoCrono.value.toFixed(2),
         CostesRiesgos: CostesRiesgosCrono.value.toFixed(2),
         SaldoFinal: SaldoFinalCrono.value.toFixed(2),
         Flujo: FlujoCrono.value.toFixed(2),
         //toFixed(2)
       })
       ValorActualCrono.value = SaldoFinalCrono.value;
       ValorActualExtra.value = SaldoFinalCrono.value;
       ValorActualDelSaldo.value = SaldoFinalCrono.value;


     }else if(i===0){
       FlujoCrono.value = Credito.value;
       FlujoTEACrono.value = Credito.value;
       ValorActualCrono.value = Credito.value;
       SaldoInicialCrono.value = Credito.value;
       list1.value.push({
         id: i,
         nDias: 30,
         tasaAjustada:TEP.value.toFixed(7),
         saldoInicial: 0,
         Interes: 0,
         Couta: 0,
         Amortizacion: 0,
         SeguroDesgravemen: 0,
         SeguroRiesgo: 0,
         CostesRiesgos: 0,
         SaldoFinal: 0,
         Flujo: SaldoInicialCrono.value.toFixed(2),
         //toFixed(2)
       })
     }else{
       console.log("Hay error")
     }
   }


   const ar1= ref();
   const ab1= ref();
   const axu = ref()
   axu.value = 1 + (TNPajustadaAlPlazo.value + seguroDesgravamenPer.value )
   ar1.value = ((TNPajustadaAlPlazo.value +  seguroDesgravamenPer.value)* ValorActualDelSaldo.value );
   ab1.value = 1 - Math.pow(axu.value, -NTotalPeriodos.value  )
   ValorActualExtra.value =ar1.value/ab1.value;
  console.log( "TNPajustadaAlPlazo" + TNPajustadaAlPlazo.value )
  console.log( "seguroDesgravamenPer" + seguroDesgravamenPer.value )
  console.log( "ValorActualDelSaldo" + ValorActualDelSaldo.value )
  console.log( "NTotalPeriodos" + NTotalPeriodos.value )

  console.log( "axu" + axu.value )

  console.log( "ar1" + ar1.value )
  console.log( "ab1" + ab1.value )

   ValorCouta.value = ValorCouta.value + ValorActualExtra.value;
  console.log( "el valor de valor exacto " + ValorActualExtra.value )

}


/*
while (ValorActualExtra.value.toFixed(4)  !== 0.0000);
 */

</script>

<style scoped></style>
