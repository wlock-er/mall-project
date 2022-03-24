import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/home.vue'

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router