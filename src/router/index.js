import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from "../views/Contacts";
import Contact from "../views/Contact";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/:id',
    name: 'Contact',
    component: Contact
  }

];

const router = new VueRouter({
  routes
})

export default router
