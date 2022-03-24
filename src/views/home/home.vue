<template>
  <div>
      <p>VUE</p>
      <my-swiper></my-swiper>
      <el-button type="primary" ref="button" @click="clickbtn">点击</el-button>
  </div>

</template>

<script>
import MySwiper from "@/components/common/mswiper.vue"
import {request} from "@/network/request.js"
import axios from "axios"
export default {
    name:'vue',
    components:{
        MySwiper
    },
    methods:{
        clickbtn(){
            //  request({
            //     url: '/category/list',
            //     // params: {
            //     //     pageNum: 1,
            //     //     pageSize: 10
            //     // }
            // }).then(res=>{
            //     console.log(res.data);
            // })
             request({
                method:'POST',
                url: '/adminLogin',
                data: {
                    userName: 'cfasvffver',
                    password: 12345678
                }
            }).then(res=>{
                console.log(res.data);
            })
        }
    }
}
</script>

<style>

</style>