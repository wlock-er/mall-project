import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/home.vue'
import Cart from '@/views/cart/cart.vue'
import Order from '@/views/order/order.vue'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import personal from '@/views/personal/personal.vue'

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, {
    path: '/cart',
    component: Cart
}, {
    path: '/order',
    component: Order
}, {
    path: '/login',
    component: Login
}, {
    path: '/register',
    component: Register
}, {
    path: '/personal',
    component: personal
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router