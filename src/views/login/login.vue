<template>
  <div class="login">
    <div class="tips">请选择登录方式</div>
      <div class="input_wrap" ref="wrap">
          <div class="login_select">
          <span class="login_options" @click="clickSelect(1)" :class="{beChoice: isSelect===1}">用户</span>|
          <span class="login_options" @click="clickSelect(2)" :class="{beChoice: isSelect===2}">管理员</span>
          </div>
          <div>用户名</div>
          <input ref="username" type="text" placeholder="请输入用户名" @input="blurinput">
          <div>密码</div>
          <input ref="password" type="password" placeholder="请输入密码" @input="blurinput">
          <div class="worring">{{message}}</div>
          <el-button type="primary" size="large" @click="clicklogin">登录</el-button>
      </div>
  </div>
</template>

<script>
import {request} from "@/network/request.js"
export default {
  name:"login",
  data(){
    return{
       message:'',
       isSelect:1
    }
  },
  methods:{
    clicklogin(){
      console.log(this.$refs.username.value);
      console.log(this.$refs.password.value);
      if(this.$refs.username.value ==''){
        this.message='用户名不能为空'
      }
      else if(this.$refs.password.value.length<6){
        this.message='密码必须大于六位'
      }
      // request({
      //   method:'POST',
      //   url: '/login',
      //   data: {
      //       userName: 'zhang',
      //       password: 12345678
      //   }
      // }).then(res=>{
      //      console.log(res.data);
      // })
      else{
        this.$store.commit('loginSuccess')
        this.$router.replace('/home');
      }
    },
    blurinput(){
      this.message=''
    },
    ClickNav(path){
        this.$router.replace(path);
    },
    clickSelect(i){
      this.isSelect=i;
      if(i==2){
        this.$refs.wrap.style.backgroundColor='rgb(245, 245, 227)';
      }else{
         this.$refs.wrap.style.backgroundColor='#f6f8fa';
      }
    }
  }
}
</script>

<style scoped>
.login{
  color: gray;
}
.input_wrap{
  width: 7rem;
  height:7rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: .1rem .5rem;
  background-color: #f6f8fa;
  box-shadow: 10px 0 10px rgb(170, 170, 170);
}
.tips{
  /* text-align: center; 会改变位置*/
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin-top: 2rem ;
}
.beChoice{
  color: rgb(0, 174, 255);
}
.login_select{
  text-align: center;
  height: .74rem;
  padding: 0.2rem 0.2rem 0 0;
  margin-bottom: .5rem;
  border-bottom: 1px solid rgb(0, 0, 0);
}
.login_options{
  margin: 0rem .2rem;
  padding: 0.1rem 1rem;
  transition: all 0.3s;
  /* color: rgb(0, 138, 202); */
  cursor: pointer;
  /* border-bottom: 1px solid rgb(103, 207, 255); */
}
.login_options:hover{
  color: rgb(0, 174, 255);
  background-color: rgba(143, 143, 143, 0.089);
}
.input_wrap input{
  width: 6.7rem;
  height: .3rem;
  padding: .2rem;
  margin: .2rem 0;
}
.worring{
  margin-top:.1rem ;
   text-align: center;
   color: red;
}
.el-button{
  margin-top: .5rem;
  margin-left: .78rem;
  width: 5.5rem;
  height: .85rem;
}
</style>