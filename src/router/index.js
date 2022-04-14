import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/home.vue'
import Cart from '@/views/cart/cart.vue'
import Order from '@/views/order/order.vue'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import personal from '@/views/personal/personal.vue'
import detail from '@/views/detail/detail.vue'
import search from '@/views/search/searchCenter.vue'
import goodslist from '@/views/goods_list/goods_list.vue'
import store from '@/store/index.js';

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
            component: personal
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/register',
            component: Register
        }, {
            path: '/personal',
            component: personal
        },
        {
            path: "/home/detail",
            component: detail
        },
        {
            path: "/search",
            component: search
        },
        {
            path: "/home/goodslist",
            component: goodslist
        }
    ]
    // router.push("/detail/"+id);
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (store.state.isLoginSuccess || to.path === '/login' || to.path === '/register') {
        next();
    } else {
        next('/login');
    }
})
export default router