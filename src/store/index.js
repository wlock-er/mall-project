import { createStore } from 'vuex'
import { getLoginState } from '@/network/login.js'
export default createStore({
    state: {
        isLoginSuccess: false,
        loginId: 0
    },
    getters: {},
    mutations: {
        loginSuccess(state, id) {
            state.isLoginSuccess = true;
            state.loginId = id;
            console.log('登录成功' + state.loginId);
        },
        logOut(state) {
            state.isLoginSuccess = false;
        }
    },
    actions: {
        async getLogS({ commit }) {
            let res = await getLoginState();
            if (res.status == 10000) {
                console.log(res.msg);
                commit("loginSuccess", res.data.id)
                return 'ok'
            } else {
                // return Promise.reject(new Error('faile'))
            }
        },
    },
    modules: {}
})