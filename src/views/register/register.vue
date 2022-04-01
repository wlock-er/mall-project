<template>
  <div class="register">
      <div class="input_wrap">
          <div class="register_title">
            新用户注册
          </div>
          <div>请填写昵称</div>
          <input ref="username" type="text" placeholder="请输入" @input="blurinput"><span ref="usernameerr" >用户名不能为空</span>
          <div>密码</div>
          <input ref="password1" type="password" placeholder="请输入密码" @input="blurinput"><span ref="pwderr1" >密码必须大于六位</span>
          <div>确认密码</div>
          <input ref="password2" type="password" placeholder="请输入密码" @input="blurinput"><span ref="pwderr2"> 密码密码不一致</span>
          <div class="worring">{{message}}</div>
          <el-button type="primary" size="large" @click="clickRegister">注册</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name:'register',
  methods:{
    clickRegister(){
      if(this.$refs.username.value.length<1){
        this.$refs.usernameerr.style.display='inline'
      }
      if(this.$refs.password1.value.length<6){
        this.$refs.pwderr1.style.display='inline'
      }
      if(this.$refs.password1.value != this.$refs.password2.value){
        this.$refs.pwderr2.style.display='inline'
      }
      if(this.$refs.username.value.length>1 && this.$refs.password1.value == this.$refs.password2.value && this.$refs.password1.value.length>=6){
        this.$refs.usernameerr.style.display='none'
        this.$refs.pwderr1.style.display='none'
        this.$refs.pwderr2.style.display='none'
        alert('注册成功！欢迎！')
        this.$router.replace('/login');
      }
    },blurinput(){
        this.$refs.usernameerr.style.display='none'
        this.$refs.pwderr1.style.display='none'
        this.$refs.pwderr2.style.display='none'
    }
  }
}
</script>

<style scoped>
.register{
  color: gray;
}
.input_wrap{
  /* width: 11rem; */
  height:9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: .1rem .5rem;
  background-color: #f6f8fa;
  box-shadow: 10px 0 10px rgb(170, 170, 170);
}
.register_title{
  text-align: center;
  height: .74rem;
  padding: 0.2rem 0.2rem 0 0;
  margin-bottom: .5rem;
  border-bottom: 1px solid rgb(0, 0, 0);
}
.input_wrap input{
  width: 6.5rem;
  height: .3rem;
  padding: .2rem;
  margin: .3rem 0;
}
.input_wrap span{
  display: none; 
  margin: 0 .5rem ;
  color: red;
}
.el-button{
  margin-top: .5rem;
  /* margin-left: 2rem; */
  width: 6.95rem;
  height: .85rem;
}
</style>
