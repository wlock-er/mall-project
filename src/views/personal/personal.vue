<template>
  <div class="personal">
      <div class="top_wrap">
          <img src="@/assets/img/logo.png" alt="">
          <div class="personal_top">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户中心</div>
          <div class="search_wrap iconfont icon-search"></div>
          <div class="input_wrap">
               <el-input v-model="context" placeholder="请输入关键词"></el-input>
          </div>
       </div>
      <div class="personal_content">
          <div class="navLeft">
              <div class="left_list" @click="clicklist('a')" :class="{clickClass: clicks==='a'}">·个人信息</div>
              <div class="left_list" @click="clicklist('b')" :class="{clickClass: clicks==='b'}">·我的订单</div>
              <div class="left_list" @click="clicklist('c')" :class="{clickClass: clicks==='c'}">·收货地址</div>
          </div>
          <div class="right_wrap"></div>
      </div>
  </div>
</template>

<script>
export default {
    name:'personal',
    data(){
        return{
            clicks:'a'
        }
    },
    methods:{
        clicklist(c){
            this.clicks=c;
        }
    }
}
</script>

<style scoped>
.personal{
     margin:0 3rem ;
}
.top_wrap{
  height: 3.5rem;
  margin-bottom: .5rem;
  background-color: #fff;
}
.top_wrap img{
  float: left;
  width:6rem;
}
.personal_top{
    float: left;
    font-size: .4rem;
    margin-top: 1.5rem;
    color: gray;
}
.input_wrap{
  float: right;
  width: 6rem;
  margin-top: 1.2rem;
  height: 1rem;
  margin-left: 2rem;
}
.search_wrap{
  float: right;
  margin-right: 1.5rem;
  margin-top: 1.2rem;
  padding: .1rem;
  height: .5rem;
  cursor: pointer;
}
.search_wrap:hover{
  background-color: aliceblue;
}
.personal_content{
    display: flex;
}
.navLeft{
    text-align: center;
    background-color: #fff;
    flex: 1;
    height: 10rem;
    padding-top: .5rem;
}
.left_list{
    cursor: pointer;
    padding: .2rem 0;
}
.left_list:hover{
    font-weight: 600;
}
.clickClass{
    font-weight: 600;
    color: rgb(162, 114, 51);
}
.right_wrap{
    flex: 5;
    margin: 0 .5rem;
    /* width: 4rem; */
    height: 10rem;
    background-color: #fff;
    
}
</style>