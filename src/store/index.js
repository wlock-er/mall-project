import { createStore } from 'vuex'
import { getCartList } from '@/network/cart.js'
import { getLoginState } from '@/network/login.js'
export default createStore({
    state: {
        isLoginSuccess: document.cookie.length == 0 ? false : true,
        loginId: 0,
        isRemeber: true,
        cartSize: 0,
        username: ''
    },
    getters: {},
    mutations: {
        loginSuccess(state, data) {
            state.isLoginSuccess = true;
            state.loginId = data.id;
            state.username = data.username;
            if (state.isRemeber) {
                var exdate = new Date();
                exdate.setTime(exdate.getTime() + 40 * 60 * 1000); //40分钟
                document.cookie = "name = " + state.username + "; expires=" + exdate.toUTCString();
                console.log(document.cookie);
            }
        },
        logOut(state) {
            let exdate = new Date();
            exdate.setTime(exdate.getTime() - 1);
            document.cookie = "name = zhang; expires=" + exdate.toGMTString();
            state.isLoginSuccess = false;
        },
        isRemeb(state, r) {
            state.isRemeber = r;
        },
        getCartSize(state, cartS) {
            state.cartSize = cartS;
        }
    },
    actions: {
        async getLogS({ commit }, p) {
            console.log(p.name, p.pwd);
            let res = await getLoginState(p.name, p.pwd);
            if (res.status == 10000) {
                console.log(res);
                commit("loginSuccess", res.data)
                    // 返回promise对象
                return true
            } else if (res.status == 21010) {
                console.log(res);
                return false;
            }
        },
        async getCartS({ commit }) {
            let res = await getCartList();
            if (res.status == 10000) {
                console.log(res);
                commit("getCartSize", res.data.length)
                return 'ok'
            } else {
                // return Promise.reject(new Error('faile'))
            }
        },
    },
    modules: {}
})