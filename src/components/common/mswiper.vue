<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <!-- slides 列表项 -->
      <swiper-slide><img src="@/assets/img/swiper-img.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="@/assets/img/swiper-img.jpg" alt=""></swiper-slide>
      <!-- Optional controls 控制器 -->
       <div class="swiper-pagination"  slot="pagination"></div>
       <div class="swiper-button-prev" slot="button-prev"></div><!--上一项-->
       <div class="swiper-button-next" slot="button-next"></div><!--下一项 -->
       <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>
 
<script>
import 'swiper/css/swiper.css'
import {swiper, swiperSlide} from "vue-awesome-swiper"
export default {
  name: 'MySwiper',
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
         pagination:{
          el:'.swiper-pagination',
          // type: 'bullets',
          // clickable:true,
        },//这样写小圆点就有了
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // 如果需要滚动条
        scrollbar: '.swiper-scrollbar',

      }
    }
  }
}
</script>
<style scoped>
.swiper{
    height: 500px;
    width: 900px;
}
img{
    height: 500px;
    width: 900px;
}
</style>