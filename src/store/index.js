import { createStore } from 'vuex'
import { getLoginState } from '@/network/login.js'
export default createStore({
    state: {
        isLoginSuccess: document.cookie != 'name=zhang' ? false : true,
        loginId: 0
    },
    getters: {},
    mutations: {
        loginSuccess(state, id) {
            state.isLoginSuccess = true;
            state.loginId = id;
            // console.log('登录成功' + state.loginId);
            // localStorage.setItem('userName', '张三');
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + 20 * 60 * 1000); //20分钟
            document.cookie = "name = zhang; expires=" + exdate.toUTCString();
            // console.log(localStorage.getItem('userName'));
            console.log(document.cookie === 'name=zhang');
        },
        logOut(state) {
            let exdate = new Date();
            exdate.setTime(exdate.getTime() - 1);
            document.cookie = "name = zhang; expires=" + exdate.toGMTString();
            // localStorage.removeItem('userName');
            state.isLoginSuccess = false;
        }
    },
    actions: {
        async getLogS({ commit }) {
            let res = await getLoginState();
            if (res.status == 10000) {
                console.log(res);
                commit("loginSuccess", res.data.id)
                return 'ok'
            } else {
                // return Promise.reject(new Error('faile'))
            }
        },
    },
    modules: {}
})