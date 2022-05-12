import Vue from 'vue'
import VueRouter from 'vue-router'
import Tables from '../views/tables/Tables.vue'
import Table from '../views/tables/Table.vue'
import Menu from '../views/menu/Menu.vue'
import Categories from '../views/categories/Categories.vue'
import CreateProducts from '../views/products/Create.vue'
import EditProducts from '../views/products/Edit.vue'
import Orders from '../views/orders/Orders.vue'
import NotFound from '../views/etc/NotFound.vue'

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
    path: '/table/get/:table',
    name: 'Table',
    component: Table
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
    path: '/product/edit/:product',
    name: 'EditProducts',
    component: EditProducts
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path:'*',
    name:'NotFound',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
