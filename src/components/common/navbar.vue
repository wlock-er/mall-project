<template>
<div class="nav_wrap">
    <div class="nav_left" @click="ClickNav('/home')" :class="{homeclick: path=='/home'}">
        <span class="iconfont icon-home"></span>
        <span>商城中心</span>
    </div>
    <div class="nav_right">
        <!-- <div class="nav" :class="{navclick: path=='/order'}" @click="ClickNav('/order')">我的订单</div>
        <div class="nav" :class="{navclick: path=='/cart'}" @click="ClickNav('/cart')">购物车</div>
        <div class="nav" :class="{navclick: path=='/#'}" @click="ClickNav('#')">个人中心</div> -->
        <div v-if="!$store.state.isLoginSuccess">
            <!-- <a class="nav" href="http://localhost:8080/login" target="_blank">登录</a> -->
            <div v-if="!(path==='/login')" class="nav" :class="{navclick: path=='/login'}" @click="ClickNav('/login')">登录</div>
            <div v-if="!(path==='/register')" class="nav" :class="{navclick: path=='/register'}" @click="ClickNav('/register')">注册</div>
        </div>
        <div v-else>
            <div class="nav" :class="{navclick: path=='/order'}" @click="ClickNav('/order')">我的订单</div>
            <div class="nav" :class="{navclick: path=='/cart'}" @click="ClickNav('/cart')">购物车</div>
            <div class="nav" :class="{navclick: path=='/personal'}" @click="ClickNav('/personal')">个人中心</div>
            <div class="nav username">平安喜乐
                <span class="iconfont icon-xiala"></span>
                <div class="dropdown">
                    <div>dropdown...</div>
                    <el-button type="info" round @click="logout">退出登录</el-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:"NavBar",
    data(){
      return{
          path:'/home'
      }  
    },
    methods:{
        ClickNav(path){
            this.path=path;
            this.$router.replace(path);
        },
        logout(){
            this.$store.commit('logOut');
            this.$router.replace('/login');
        }
    },
    watch:{
        $route(to, from){
        this.path=to.path;
        // console.log(to.path);
    }
    }
}
</script>

<style scoped>
body{
    font-size:.32rem ;
}
.nav_wrap{
    display:flex;
    height: 0.8rem;
    color: rgb(190, 190, 190);
    padding: 0 2rem;
    background-color: rgb(87, 87, 87);
    cursor: pointer;
}
.nav_left{
    flex: 4;
    padding:  .15rem;
}
.nav_left span{
    vertical-align: top;
    transition: all 0.5s;
}
.nav_right{
    flex: 6;
}
.nav{
    float: right;
    padding: 0.15rem .2rem .15rem 0.2rem;
    margin: 0 .2rem;
    transition: all 0.3s;
}
.nav:hover{
    color: aliceblue;
}
.navclick{
    color: white;
    /* border-bottom: 1px solid white; */
}
.homeclick{
    color: white;
}
.username{
    position: relative;
}
.dropdown{
    z-index: 10;
    display: none;
    position: absolute;
    top: .8rem;
    left: 0;
    background-color: rgb(226, 226, 226);
    width: 5rem;
    height: 2rem;
    padding: .25rem;
}
.username:hover{
    background-color: rgb(255, 255, 255);
    color: black;
}
.username:hover .dropdown{
    display: block;
}
</style>