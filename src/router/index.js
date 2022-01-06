import Vue from 'vue'
import VueRouter from 'vue-router'
import Tables from '../views/Tables.vue'
import Menu from '../views/menu/Menu.vue'
import Categories from '../views/categories/Categories.vue'
import CreateProducts from '../views/products/Create.vue'
import Orders from '../views/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tables'
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/product/create',
    name: 'CreateProducts',
    component: CreateProducts
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }
]

const router = new VueRouter({
  routes
})

export default router
