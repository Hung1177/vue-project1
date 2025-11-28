import { createRouter, createWebHistory } from 'vue-router'

// User Pages
import Home from '../views/user/Home.vue'
import Products from '../views/user/Products.vue'
import ProductDetail from '../views/user/ProductDetail.vue'
import Services from '../views/user/Services.vue'
import About from '../views/user/About.vue'
import Contact from '../views/user/Contact.vue'

// Admin Pages
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminProducts from '../views/admin/ProductsManagement.vue'
import AdminNews from '../views/admin/NewsManagement.vue'
import AdminReports from '../views/admin/Reports.vue'
import AdminSettings from '../views/admin/Settings.vue'

const routes = [
  // User Routes
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  // Admin Routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts
  },
  {
    path: '/admin/news',
    name: 'AdminNews',
    component: AdminNews
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: AdminReports
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: AdminSettings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
