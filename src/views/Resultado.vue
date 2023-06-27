<template>
  <h2 class="font-bold my-3 uppercase text-2xl text-center">Resultados</h2>
  <main class="px-5">
    <div class="flex justify-between">
      <button
        @click="ElegirCalculo()"
        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Calcular
      </button>

      <button

        class="uppercase font-bold bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        @click="guardarDatos()"
      >
       Guardar Reporte de Pago
      </button>
    </div>

    <div>
    <div>
      <p>Intereses                : {{InteresTotal.toFixed(2)}}</p>
      <p>Amortizacion del capital : {{AmortizacionTotal.toFixed(2)}} </p>
      <p>seguro de desgravamen    : {{SeguroDeDesgravamenTotal.toFixed(2)}}</p>
      <p>seguro de todo riesgo    : {{SeguroContraTodoRiesgoTotal.toFixed(2)}}</p>
      <p>Costos / Gatasos         : {{CostesGastosTotal.toFixed(2)}}</p>
      <p>Desembolso total         : {{DesembolsoTotal.toFixed(2)}}</p>
      <p>VAN operaciones          : {{VANoperacion}}</p>
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
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in list1">
          <td class="p-1 text-center">{{ item.id }}</td>
          <td class="p-1 text-center">{{ item.nDias }}</td>
          <td class="p-1 text-center">{{ item.tasaAjustada }}</td>
          <td class="p-1 text-center">{{moneda}} {{ item.saldoInicial }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.Interes }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.Couta }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.Amortizacion }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.SeguroDesgravemen }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.SeguroRiesgo }}</td>
          <td class="p-1 text-center">{{moneda}} {{ item.CostesRiesgos }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.SaldoFinal }}</td>
          <td class="p-1 text-center">{{moneda}}{{ item.Flujo }}</td>
        </tr>
      </tbody>
      <tbody></tbody>
    </table>
  </main>
</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import {useDatabaseStore} from "../stores/database";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";

const useCalculo = useCalculosStore();
const dataBaseStore = useDatabaseStore();

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
const  aux                            = ref(1);
const  arriba                         = ref();
const  abajo                          = ref();
const  TEAaux                         = ref();
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
const confirGraciaTotal      = ref(datos.value.at(20));
const confirGraciaParcial    = ref(datos.value.at(21));
const solesOdolar            = ref(datos.value.at(22));
const tasaDeDescuento        = ref(datos.value.at(23));

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
const FlujoActualCrono    = ref();
const VanCrono            = ref(0);


onMounted(() => {
  calculosIniciales();
  ElegirCalculo();

})


const moneda = ref();
const cambioMoneda = () =>{
  if(solesOdolar.value === 1){
    moneda.value = "s/";
  }else if(solesOdolar.value === 2){
    moneda.value = "$";
  }
}
const guardarDatos = async ()=>{
  TEA.value =TEA.value*100;
  try {

    await dataBaseStore.addPrestamo(
        precioDeVenta.value,
        cuotaInicial.value,
        nDeanios.value,
        diasXperiodo.value,
        diasXanios.value,
        bonoMiVivienda.value,
        TEAaux.value,
        costosNotariales.value,
        costosRegistrales.value,
        estudioDeTitulos.value,
        tasacion.value,
        comisionDeActivacion.value,
        comisionPeridica.value,
        portes.value,
        gastosAdministrativos.value,
        seguroDesgravamenPer.value,
        seguroRiesgoPer.value,
        plazosGraciasTotal.value,
        plazosGraciasParcial.value,
        bonoVerde.value,
        confirGraciaTotal.value,
        confirGraciaParcial.value,
    )
  }catch (e){
    console.log("hubo un problema al guardar");
  }
  TEA.value =TEA.value/100;

}

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

  TEAaux.value = TEA.value;

  TEA.value = TEA.value/100;

  // transformar TASA ANUAL A TASA EFECTIVA PERIODO
  TEP.value = (1 + TEA.value)**(diasXperiodo.value/diasXanios.value) -1;



  sumaCostosGastosIniciales();

  if(cuotaInicial.value < 90){
    CoutaInicial.value = (cuotaInicial.value/100)*precioDeVenta.value;

  }else {
    CoutaInicial.value = cuotaInicial.value;

  }
 SaldoFinanciar.value = precioDeVenta.value - CoutaInicial.value - bonoMiVivienda.value - bonoVerde.value;
  //SaldoFinanciar.value = precioDeVenta.value - CoutaInicial.value;


  Credito.value = SaldoFinanciar.value + variableCostesGastosIniciales.value ;

  NPeriodosxAnios.value = diasXanios.value/diasXperiodo.value;


  NTotalPeriodos.value = NPeriodosxAnios.value*nDeanios.value;

  const  v1 = ref();
  const  v2 = ref();
  v1.value = 1 + TEA.value;
  v2.value = 1 / 12;
  TNPajustadaAlPlazo.value = (diasXperiodo.value/30)* (Math.pow(v1.value, v2.value) - 1);

  TNAajustadaAlPlazo.value =  Math.sqrt(1 + TNPajustadaAlPlazo.value, NPeriodosxAnios.value)-1;




  // estamos trabajando con Capitalizacion Mensual
/*
  TNPajustadaAlPlazo.value =Math.sqrt(1 + TEA.value, 1 / NTotalPeriodos.value) - 1;
  console.log( "TNPajustadaAlPlazo  "  + TNPajustadaAlPlazo.value);
  TNAajustadaAlPlazo.value = Math.sqrt(1 + TNPajustadaAlPlazo.value, NPeriodosxAnios.value)-1;
  console.log( "TNAajustadaAlPlazo  "  + TNAajustadaAlPlazo.value);
 */

   const arriba = ref();
  const abajo = ref();
  arriba.value =TEP.value * Math.pow(1 + TEP.value, NTotalPeriodos.value);
  abajo.value =Math.pow(1 + TEP.value, NTotalPeriodos.value) - 1;


  ValorCouta.value = Credito.value*(arriba.value/abajo.value);

  ValorActualDelSaldo.value =  0.0000;
  ValorActualExtra.value = Credito.value;

}


const ElegirCalculo=()=> {
  cambioMoneda();
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
  list1.value.splice(0, list1.value.length);
  for(let i =0; i <= NTotalPeriodos.value; i++) {
    InteresCrono.value = ValorActualCrono.value * TEP.value;
   if(i!== 0){

     console.log("InteresCrono   " + InteresCrono.value);


     if(i <= plazosGraciasTotal.value){
       console.log(i)
       CoutaCrono.value = 0;
       AmortCrono.value = 0;

       SaldoFinalCrono.value = ValorActualCrono.value + InteresCrono.value ;
       //+ SegDesgravamenCrono.value+segRiesgoCrono.value + CostesRiesgosCrono.value

     }
     else if (i <= plazosGraciasParcial.value + plazosGraciasTotal.value ){
       console.log("1")
       CoutaCrono.value = InteresCrono.value;
       AmortCrono.value = 0;
       // AmortCrono.value =CoutaCrono.value - InteresCrono.value;

       SaldoFinalCrono.value = ValorActualCrono.value;
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
       CoutaCrono.value = CoutaCrono.value;

       AmortCrono.value =CoutaCrono.value - InteresCrono.value;
       /*
        -  SegDesgravamenCrono.value
        -  segRiesgoCrono.value
        -  CostesRiesgosCrono.value;
        */


       InteresTotal.value += InteresCrono.value;
       AmortizacionTotal.value +=  AmortCrono.value;

       SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;
       FlujoCrono.value = CoutaCrono.value;

       const expo =  ref((diasXperiodo.value*i)/360)
       const expo1 =  ref((1+tasaDeDescuento.value/100)**(expo.value));
       FlujoActualCrono.value = FlujoCrono.value/(expo1.value);
       VanCrono.value= VanCrono.value + FlujoActualCrono.value;


     }

     FlujoCrono.value = CoutaCrono.value;
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
  //     FlujoActual: FlujoActualCrono.value.toFixed(2),

     })

     ValorActualCrono.value = SaldoFinalCrono.value;

     FlujoCrono.value = CoutaCrono.value;



     ValorActualCrono.value = SaldoFinalCrono.value;
     console.log("SaldoFinalCrono.value " +SaldoFinalCrono.value)

     VANoperacion.value = VanCrono.value;


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
        FlujoActual: SaldoInicialCrono.value.toFixed(2),
        //toFixed(2)
      })
    }else{
      console.log("Hay error")
    }

    DesembolsoTotal.value = InteresTotal.value + AmortizacionTotal.value+
        SeguroDeDesgravamenTotal.value + SeguroContraTodoRiesgoTotal.value+
        CostesGastosTotal.value;
  }
}

const  CalculoGraciaTotal = () => {
  list1.value.splice(0, list1.value.length);
  for(let i =0; i <= NTotalPeriodos.value; i++) {
    InteresCrono.value = ValorActualCrono.value * TEP.value;
    if(i!== 0){

      console.log("InteresCrono   " + InteresCrono.value);


      /*
       SegDesgravamenCrono.value = ValorActualCrono.value * (seguroDesgravamenPer.value / 100);
       console.log("SegDesgravamenCrono   " + SegDesgravamenCrono.value);

       segRiesgoCrono.value = ValorActualCrono.value * (seguroRiesgoPer.value / 100);
       console.log("segRiesgoCrono   " + segRiesgoCrono.value);

       CostesRiesgosCrono.value = comisionPeridica.value + portes.value + gastosAdministrativos.value;
       console.log("CostesRiesgosCrono   " + CostesRiesgosCrono.value);
       */


      if(i <= plazosGraciasTotal.value){
        console.log(i)
        CoutaCrono.value = 0;
        AmortCrono.value = 0;

        SaldoFinalCrono.value = ValorActualCrono.value + InteresCrono.value ;
        //+ SegDesgravamenCrono.value+segRiesgoCrono.value + CostesRiesgosCrono.value

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

        AmortCrono.value =CoutaCrono.value - InteresCrono.value;
        /*
         -  SegDesgravamenCrono.value
         -  segRiesgoCrono.value
         -  CostesRiesgosCrono.value;
         */

        SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;


        FlujoCrono.value = CoutaCrono.value;
        const expo =  ref((diasXperiodo.value*i)/360)
        const expo1 =  ref((1+tasaDeDescuento.value/100)**(expo.value));
        FlujoActualCrono.value = FlujoCrono.value/(expo1.value);
        VanCrono.value= VanCrono.value + FlujoActualCrono.value;

      }
      FlujoCrono.value = CoutaCrono.value;

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

      })

      InteresTotal.value += InteresCrono.value;
      AmortizacionTotal.value +=  AmortCrono.value;

      ValorActualCrono.value = SaldoFinalCrono.value;

      FlujoCrono.value = CoutaCrono.value;


      ValorActualCrono.value = SaldoFinalCrono.value;
      console.log("SaldoFinalCrono.value " +SaldoFinalCrono.value)




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




const  CalculoGraciasParcial = () =>{
  InteresTotal.value = 0;
  AmortizacionTotal.value =0;
  SeguroDeDesgravamenTotal.value=0;
  SeguroContraTodoRiesgoTotal.value=0;
  CostesGastosTotal.value = 0;
  DesembolsoTotal.value =0;
  list1.value.splice(0, list1.value.length);
  for(let i =0; i <= NTotalPeriodos.value; i++) {
    InteresCrono.value = ValorActualCrono.value * TEP.value;
    if(i!== 0){
      if(i <= plazosGraciasParcial.value){
        console.log("1")
        CoutaCrono.value = InteresCrono.value;
        AmortCrono.value = 0;
        // AmortCrono.value =CoutaCrono.value - InteresCrono.value;

        SaldoFinalCrono.value = ValorActualCrono.value;

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

        AmortCrono.value =CoutaCrono.value - InteresCrono.value;
        /*
         -  SegDesgravamenCrono.value
         -  segRiesgoCrono.value
         -  CostesRiesgosCrono.value;
         */

        SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;

        FlujoCrono.value = CoutaCrono.value;
        const expo =  ref((diasXperiodo.value*i)/360)
        const expo1 =  ref((1+tasaDeDescuento.value/100)**(expo.value));
        FlujoActualCrono.value = FlujoCrono.value/(expo1.value);
        VanCrono.value= VanCrono.value + FlujoActualCrono.value;

        InteresTotal.value += InteresCrono.value;
        AmortizacionTotal.value +=  AmortCrono.value;
      }
      FlujoCrono.value = CoutaCrono.value;

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

      })

      ValorActualCrono.value = SaldoFinalCrono.value;

      FlujoCrono.value = CoutaCrono.value;



      ValorActualCrono.value = SaldoFinalCrono.value;
      console.log("SaldoFinalCrono.value " +SaldoFinalCrono.value)


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
    DesembolsoTotal.value = InteresTotal.value + AmortizacionTotal.value+
        SeguroDeDesgravamenTotal.value + SeguroContraTodoRiesgoTotal.value+
        CostesGastosTotal.value;
  }
}


const  CalculoNormal=()=>{

  const  contador = ref(0);
  const condicion = ref(true);
  do {
    VanCrono.value = 0;
    // limpiar lista
    list1.value.splice(0, list1.value.length);


    // resultado totales
    InteresTotal.value = 0;
    AmortizacionTotal.value =0;
    SeguroDeDesgravamenTotal.value=0;
    SeguroContraTodoRiesgoTotal.value=0;
    CostesGastosTotal.value = 0;
    DesembolsoTotal.value =0;



    // comienza el cronograma
    for(let i =0; i <= NTotalPeriodos.value; i++){



      if(i!==0) {


        InteresCrono.value = ValorActualCrono.value * TEP.value;
        InteresTotal.value += InteresCrono.value;
        console.log("InteresCrono   " + InteresCrono.value);

        CoutaCrono.value = ValorCouta.value;
        console.log("CoutaCrono   " + CoutaCrono.value);



        SegDesgravamenCrono.value = ValorActualCrono.value * (seguroDesgravamenPer.value / 100);
        SeguroDeDesgravamenTotal.value +=SegDesgravamenCrono.value;
        console.log("SegDesgravamenCrono   " + SegDesgravamenCrono.value);

        segRiesgoCrono.value = ValorActualCrono.value * (seguroRiesgoPer.value / 100);
        SeguroContraTodoRiesgoTotal.value +=segRiesgoCrono.value;
        console.log("segRiesgoCrono   " + segRiesgoCrono.value);

        CostesRiesgosCrono.value = comisionPeridica.value + portes.value + gastosAdministrativos.value;
        CostesGastosTotal.value += CostesRiesgosCrono.value;
        console.log("CostesRiesgosCrono   " + CostesRiesgosCrono.value);

        AmortCrono.value =CoutaCrono.value - InteresCrono.value
            -  SegDesgravamenCrono.value
            -  segRiesgoCrono.value
            -  CostesRiesgosCrono.value;
        AmortizacionTotal.value +=  AmortCrono.value;
        console.log( "AmortCrono    " + AmortCrono.value);

        SaldoFinalCrono.value = ValorActualCrono.value - AmortCrono.value;
        console.log( "SaldoFinalCrono   " + SaldoFinalCrono.value);

        FlujoCrono.value = CoutaCrono.value;
        console.log( "FlujoCrono   " + FlujoCrono.value);

        list1.value.push({
          id: i,
          nDias: diasXperiodo.value,
          tasaAjustada:TEP.value.toFixed(7),
          saldoInicial: ValorActualCrono.value.toFixed(2),
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
        //   ValorActualExtra.value = SaldoFinalCrono.value;
        // ValorActualDelSaldo.value = SaldoFinalCrono.value;

        FlujoCrono.value = CoutaCrono.value;
        const expo =  ref((diasXperiodo.value*i)/360)
        const expo1 =  ref((1+tasaDeDescuento.value/100)**(expo.value));
        FlujoActualCrono.value = FlujoCrono.value/(expo1.value);
        VanCrono.value= VanCrono.value + FlujoActualCrono.value;

      }else if(i===0){
        FlujoCrono.value = Credito.value;
        FlujoTEACrono.value = Credito.value;
        ValorActualCrono.value = Credito.value;
        SaldoInicialCrono.value = Credito.value;
        list1.value.push({
          id: i,
          nDias: diasXperiodo.value,
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

    DesembolsoTotal.value = InteresTotal.value + AmortizacionTotal.value+
        SeguroDeDesgravamenTotal.value + SeguroContraTodoRiesgoTotal.value+
        CostesGastosTotal.value;


    const ar1= ref();
    const ab1= ref();
    const axu = ref()
    ValorActualDelSaldo.value = (SaldoFinalCrono.value/((1+TEA.value)**(nDeanios.value)));

    axu.value = 1 + (TNPajustadaAlPlazo.value + seguroDesgravamenPer.value )
    ar1.value = ((TNPajustadaAlPlazo.value +  seguroDesgravamenPer.value)* ValorActualDelSaldo.value );
    ab1.value = 1 - Math.pow(axu.value, -NTotalPeriodos.value  )
    ValorActualExtra.value =ar1.value/ab1.value;


    ValorCouta.value = ValorCouta.value + ValorActualExtra.value;
    contador.value= contador.value + 1;

    if (SaldoFinalCrono.value.toFixed(3) === 0.000 ) {
      condicion.value = false;



    } else if(contador.value < 100  ) {
      condicion.value = true;
      SaldoFinalCrono.value = Math.abs(SaldoFinalCrono.value);
    }
    else {
      condicion.value = false;
    }
  }while(condicion.value);
  //Math.abs
}
</script>

<style scoped></style>
