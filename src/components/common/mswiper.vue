<template>
  <div class="swiper">
    <swiper :options="swiperOption" class="swiper-item" >
      <!-- slides 列表项 -->
      <swiper-slide><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt=""></swiper-slide>
      <!-- Optional controls 控制器 -->
       <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
       <!-- <div class="swiper-button-prev" slot="button-prev"></div>
       <div class="swiper-button-next" slot="button-next"></div>
       <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>
 
<script>
import 'swiper/css/swiper.css'
import {swiper, swiperSlide} from "vue-awesome-swiper"
export default {
  name: 'MySwiper',
  props:{
    imgs:{
      type:Array,
      default(){
          return []
      }
    }
  },
  components:{
      swiper,
      swiperSlide
  },
  data () {
    return {
      swiperOption: {
        loop: true,// 是否循环轮播
        autoplay: 2000,
        speed:1000,
        // pagination:'div.swiper-pagination',
        // paginationClickable: true,
        // mousewheelControl: true,
        // paginationHide:true,
        // 如果需要前进后退按钮
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',

      }
    }
  }
}
</script>
<style scoped>
.swiper{
    height: 6rem;
    width: 14.2rem;
}
img{
    height: 6rem;
    width: 14.2rem;
}
</style>