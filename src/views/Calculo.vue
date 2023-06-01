<template>


      <h4 class="mt-0 p-0"><b>Credito Hipotecario</b></h4>

      <form @submit.prevent="handleSubmit">
        <div class="container text-center">
          <div class="row">
            <div class="col border border-primary">

              <h5 class=" mt-0 p-0"> Datos del prestamo</h5>


              <div class="form-group row p-0 m-0 ">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0 ">Precio de Venta</label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0" class="form-control col-sm-1 h-100  p-0 m-0 " id="input" v-model="precioDeVenta" >
                </div>
              </div>

              <div class="form-group row p-0 m-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0 ">Frecuencia de Pagos</label>
                <div class="col-sm-5">
                  <input type="number" step="0.00000001" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="FrecuenciaDePagos" >
                </div>
              </div>


              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0 ">Couta Inicial %</label>
                <div class="col-sm-5">
                  <input type="number" step="0.00000001" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="coutaInicial" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-labelp-0 m-0">Bono MiVivienda</label>
                <div class="col-sm-5">
                  <input type="number" step="0.00000001" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="BonoVivienda" >
                </div>
              </div>






            </div>


            <div class="col border border-primary">

              <h5  class=" mt-0 p-0"><b>Costes/gastos Iniciales</b></h5>
              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Costos Notariales</label>
                <div class="col-sm-5">
                  <input type="number" step="0.00000001" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="CostosNotariales" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Costos Registrales</label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="CostosRegistrales" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Tasacion</label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="Tasacion" >
                </div>
              </div>


              <!--
                <div class="form-group row p-0">
                 <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Comision de estudio</label>
                 <div class="col-sm-5">
                   <input type="number" step="0.01" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="ComisionDeEstudio" >
                 </div>
               </div>

               <div class="form-group row p-0">
                 <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Comision de act
                 </label>
                 <div class="col-sm-5">
                   <input type="number" step="0.01" min="0"  class="form-control col-sm-1 h-100 p-0 m-0" id="input" v-model="ComisionDeActivacion" >
                 </div>
               </div>

               -->




            </div>

          </div>
          <!--
           <div class="row border border-primary">
            <div>
              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Comision periodica</label>
                <div class="col-sm-3">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1  h-100 p-0 m-0" id="input" v-model="ComisionPeriodica" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Portes</label>
                <div class="col-sm-3">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1  h-100 p-0 m-0" id="input" v-model="Portes" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Gastos de Administracion</label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1  h-100 p-0 m-0" id="input" v-model="GastosAdministrativos" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">Gastos de Administracion</label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1  h-100 p-0 m-0" id="input" v-model="ComisionDeActivacion" >
                </div>
              </div>

              <div class="form-group row p-0">
                <label for="inputPRECIO" class="col-sm-5 col-form-label p-0 m-0">%de seguro riesgo
                </label>
                <div class="col-sm-5">
                  <input type="number" step="0.01" min="0"  class="form-control col-sm-1  h-100 p-0 m-0" id="input" v-model="seguroDeRiesgo" >
                </div>
              </div>
            </div>

          </div>

           -->


        </div>
        <button  type="submit" class="btn btn-outline-primary mb-2"
                 @click="add(lista)"
        >Agregar
        </button>

      </form>

  <RouterLink to="/Resultado" type="button"
              class="btn btn-lg text-white bg-info mt-3 w-25  ">Calcular</RouterLink>





</template>

<script setup>
import { useCalculosStore } from "../stores/calculos";
import { ref } from "vue";

const useCalculo = useCalculosStore();

const { add } = useCalculo;

const precioDeVenta =         ref(1800000);
const FrecuenciaDePagos =     ref(0.20);
const coutaInicial =          ref(1440000);
const BonoVivienda =          ref(180);
const CostosNotariales =      ref(4);
const CostosRegistrales =     ref(8);
const Tasacion =              ref(9);
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

<style scoped>

</style>