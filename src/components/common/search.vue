<template>
  <div class="top_wrap">
          <img @click="goHome" src="@/assets/img/logo.png" alt="">
          <div class="cart_top">
              <slot name="cartTop"></slot>
          </div>
          <div @click="goCart">
              <slot name='cart'></slot>
          </div>
          <div class="input_wrap">
               <el-input v-model="contend" placeholder="请输入关键词"></el-input>
               <div class="search_wrap iconfont icon-search" @click="seacrh"></div>
          </div>
          
    </div>
</template>

<script>
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
import { useRouter } from "vue-router"
export default {
  setup(){
    let contend=ref('');
    let router=useRouter();
    let goCart=function(){
      router.replace('/cart')
    }
    let seacrh = function(){
      console.log(contend.value);
      router.replace('/search?contend='+contend.value)
    }
    let goHome = ()=>{
       router.replace('/home')
    }
    return{
      contend,
      goCart,
      seacrh,
      goHome
    }
  }
}
</script>

<style scoped>
.top_wrap{
  height: 3.5rem;
  margin-bottom: .5rem;
  background-color: #fff;
}
.top_wrap img{
  float: left;
  width:6rem;
}
.top_wrap img:hover{
  cursor: pointer;
}
.cart_top{
    float: left;
    font-size: .4rem;
    margin-top: 1.5rem;
    color: gray;
}
.input_wrap{
  float: right;
  width: 8.7rem;
  margin-top: 1.2rem;
  height: 1rem;
  margin-right: 1rem;
}
.el-input{
    width: 8rem;
}
.search_wrap{
  float: right;
  margin-top: .07rem;
  cursor: pointer;
}
.search_wrap:hover{
  background-color: aliceblue;
}
</style>