import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from "../stores/user.js";

import HomeView from "../views/HomeView.vue";
import Header from "../views/Header.vue";
import Menu from "../views/Menu.vue";
import Calculo from "../views/Calculo.vue";
import Resultado from "../views/Resultado.vue";
import Historial from "../views/Historial.vue";
import Inicio from "../views/Inicio.vue";
import Registrarse from "../views/registrarse.vue";
import Datos from "../views/Datos.vue";
import Acerca from "../views/Acerca.vue";
import Perfil from "../views/Perfil.vue";
import Ayuda from "../views/Ayuda.vue";
import Configuracion from "../views/Configuracion.vue";

const requireAuth = async (to, from ,next) => {
  const userStore = useUserStore();

  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user){
    next()
  }else{
    next("/")
  }
}


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView, beforeEnter: requireAuth ,
    },
    {
      path: "/header",
      name: "header",
      component: Header,
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu,// beforeEnter: requireAuth
    },
    {
      path: "/calculo",
      name: "calculo",
      component: Calculo,
    },
    {
      path: "/resultado",
      name: "resultado",
      component: Resultado,
    },
    {
      path: "/historial",
      name: "historial",
      component: Historial,
    },
    {
      path: "/resultado",
      name: "resultado",
      component: Resultado,
    },
    {
      path: "/",
      name: "inicio",
      component: Inicio,
    },
    {
      path: "/registrarse",
      name: "registrarse",
      component: Registrarse,
    },
    {
      path: "/acerca",
      name: "acerca",
      component: Acerca,
    },
    {
      path: "/perfil",
      name: "perfil",
      component: Perfil ,beforeEnter: requireAuth ,
    },
    {
      path: "/configuracion",
      name: "configuracion",
      component: Configuracion,
    },
    {
      path: "/ayuda",
      name: "ayuda",
      component: Ayuda,
    },
    {
      path: "/datos",
      name: "datos",
      component: Datos,
    },
  ],

});

export default router;
