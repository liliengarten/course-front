import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationForm from '../views/ProfileRegistration.vue'
import LoginForm from '../views/ProfileLoginForm.vue'
import CatalogView from "@/views/CatalogView.vue";
import OrdersView from "@/views/OrdersView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/catalog',
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationForm
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router