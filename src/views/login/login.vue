<template>
  <div class="login">
    <div class="tips">请选择登录方式</div>
      <div class="input_wrap" ref="wrap">
          <div class="login_select">
          <span class="login_options" @click="clickSelect(1)" :class="{beChoice: isSelect===1}">用户</span>|
          <span class="login_options" @click="clickSelect(2)" :class="{beChoice: isSelect===2}">管理员</span>
          </div>
          <div>用户名</div>
          <input class="inputbox" ref="username" type="text" placeholder="请输入用户名" @input="blurinput">
          <div>密码</div>
          <input class="inputbox" ref="password" type="password" placeholder="请输入密码" @input="blurinput">
          <input class="remeber" type="checkbox" v-model="checked" @click="isRemeberMe"><span class="remebertext">记住我</span>
          <div class="worring">{{message}}</div>
          <el-button type="primary" size="large" @click="clicklogin">登录</el-button>
          <p class="register" ref="regis" @click="Toregister">没有账号，去注册</p>
          <div class="freestyle">————————&nbsp;&nbsp;商城&nbsp;&nbsp;————————</div>
          <div class="instruction_wrap">
            <span class="instruction">用户协议</span>
            <span class="instruction">隐私条款</span>
          </div>
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
       isSelect:1,
       checked:true
    }
  },
  methods:{
    async clicklogin(){
      let name=this.$refs.username.value;
      let pwd = this.$refs.password.value;
      let prop={
        name,
        pwd
      }
      if(name ==''){
        this.message='用户名不能为空'
      }
      else if(pwd.length<6){
        this.message='密码必须大于六位'
      }
      else{
        let isRight = await this.$store.dispatch('getLogS',prop);//promise对象
        console.log(isRight);
        if(isRight){
          console.log('跳转');
          // setTimeout(()=>{
            this.$router.replace('/home');
          // },1500)
        }else{
          this.message='用户名或密码错误'
        }
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
        this.$refs.regis.style.display='none'
        this.$refs.wrap.style.backgroundColor='rgba(227, 233, 245, 0.714)';
        this.message=''
      }else{
        this.$refs.regis.style.display='flex';
         this.$refs.wrap.style.backgroundColor='#f6f8faaa';
         this.message=''
      }
    },
    Toregister(){
      this.$router.replace('/register');
    },
    isRemeberMe(){
      this.$store.commit('isRemeb',!this.checked);
    }
  }
}
</script>

<style scoped>
.login{
  /* background-color: antiquewhite; */
  color: rgb(109, 109, 109);
  height: 94.5vh;
  background: url('@/assets/img/bgc2.jpg');
  background-position: -220px -500px;
}
.input_wrap{
  width: 7rem;
  /* height:7.4rem; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: .1rem .5rem;
  background-color: #f6f8faaa;
  /* box-shadow: 10px 0 10px rgb(170, 170, 170); */
}
.tips{
  /* text-align: center; 会改变位置*/
  color: rgba(255, 255, 255, 0.714);
  position: absolute;
  top: -0.5%;
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
.inputbox{
  width: 6.7rem;
  height: .3rem;
  padding: .2rem;
  margin: .2rem 0;
}
.worring{
  margin-top:.1rem ;
   text-align: center;
   color: rgb(207, 0, 0);
}
.el-button{
  margin: .3rem 0 .3rem .78rem;
  width: 5.5rem;
  height: .85rem;
}
.register{
  /* text-align:center ; */
  margin: .01rem 0 0.31rem 2.25rem  ;
  cursor: pointer;
  color: rgb(0, 174, 255);
}
.register:hover{
  color: rgb(0, 55, 157);
}
.instruction_wrap{
  padding-top: .13rem;
  /* border-top: 1px solid rgb(121, 121, 121); */
  text-align: center;
}
.instruction{
  margin: .3rem 0 0.21rem 0.2rem  ;
  cursor: pointer;
  color: rgb(0, 174, 255);
}
.freestyle{
  text-align:center;
}
.instruction:hover{
  text-decoration: underline;
}

.remeber{
  margin: .25rem .2rem;
  /* float: left; */
}
.remebertext{
  color: #000;
}
</style>