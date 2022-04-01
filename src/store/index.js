import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoginSuccess: false
    },
    getters: {},
    mutations: {
        loginSuccess(state) {
            state.isLoginSuccess = true;
            console.log('登录成功' + state.isLoginSuccess);
        },
        logOut(state) {
            state.isLoginSuccess = false;
        }
    },
    actions: {},
    modules: {}
})