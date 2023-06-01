import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Header from '../views/Header.vue'
import Menu from '../views/Menu.vue'
import Calculo from '../views/Calculo.vue'
import Resultado from '../views/Resultado.vue'
import Historial from '../views/Historial.vue'
import Inicio from '../views/Inicio.vue'
import Registrarse from '../views/registrarse.vue'
import Acerca from '../views/Acerca.vue'
import Contacto from '../views/Contacto.vue'
import Ayuda from '../views/Ayuda.vue'
import Configuracion from '../views/Configuracion.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/header',
      name: 'header',
      component: Header
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/calculo',
      name: 'calculo',
      component: Calculo
    },
    {
      path: '/resultado',
      name: 'resultado',
      component: Resultado
    },
    {
      path: '/historial',
      name: 'historial',
      component: Historial
    },
    {
      path: '/resultado',
      name: 'resultado',
      component: Resultado
    }
    ,
    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: Registrarse
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: Acerca
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: Configuracion
    },
    {
      path: '/ayuda',
      name: 'ayuda',
      component: Ayuda
    }
  ]
})

export default router
