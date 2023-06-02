
<template>


    <div class="menu2">

      <div class="fondo">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">saldo Inicial</th>
            <th scope="col">Interes</th>
            <th scope="col">couta</th>
            <th scope="col">amortizacion</th>
            <th scope="col">saldo final</th>
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

      </div>

    </div>

</template>

<script setup>
import {useDatabaseStore} from "../stores/database";
import {useUserStore} from "../stores/user";

const dataBaseStore = useDatabaseStore();
const userStore = useUserStore();


</script>

<style  scoped>
.contenedor {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 87, 126);
}

* {
  margin: 0;
  padding: 10px;
}

.menu1 {
  width: 25%;
  background-color: rgb(32, 78, 161);
  padding: 10px;
  text-align: center;
  padding: 20px;
  height: 100%;
}
.menu2 {
  width: 75%;
  height: 100%;
  text-align:  center;
  padding-top: 0;

}
.tituloSuperior{
  display: flex;
  justify-content: space-between;
  height: 10%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: rgb(172, 172, 172);
  color: white;
  align-items: center;

}


.logo{
  display: flex;
  display: inline-block;

  vertical-align: middle;
  padding-left: 5%;


}

.row{
  height: 10%;
  padding: 0;
  background-color: rgb(32, 78, 161);
}
.ayudaUsuario {


}

.form-check{
  display: flex;
  justify-content: space-between;
  padding-left: 20%;
  padding-right: 20%;

}


.fondo {
  background-color: white;
  height: 81%;

}

.col1{
  margin-left: 0;
}
</style>