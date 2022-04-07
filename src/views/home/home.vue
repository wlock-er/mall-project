<template>
  <div class="home_wrap">
    <div class="top_wrap">
          <img src="@/assets/img/logo.png" alt="">
          <div class="input_wrap">
               <el-input v-model="context" placeholder="请输入关键词"></el-input>
          </div>
          <div class="search_wrap iconfont icon-search"></div>
          <div class="my_cart">
            <span class="iconfont icon-cart"></span>
            <p>我的购物车</p> 
          </div>
    </div>

    <div class="category_wrap">
      <div class="category_list">
        <div class="list_detail iconfont icon-chengzi1">橘子橙子/果冻橙</div>
        <div class="list_detail iconfont icon-caomei1">草莓/奇异果</div>
        <div class="list_detail iconfont icon-pangxie1">螃蟹/海参</div>
        <div class="list_detail iconfont icon-fish">鱼类</div>
        <div class="list_detail iconfont icon-rou">牛羊肉</div>
        <div class="list_detail iconfont icon-bingqilin1">冰淇淋</div>
        <div class="list_detail iconfont icon-yingtao1">车厘子/其他水果</div>
        <div class="list_detail iconfont icon-huoguo">火锅食材</div>
      </div>
      <!-- <my-swiper :imgs="imgspath"></my-swiper> -->
      <div class="home_swiper"><my-swiper></my-swiper></div>
      <div class="swiper_right_wrap">
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv01.jpg" alt=""></div>
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv02.jpg" alt=""></div>
      </div>
    </div>

    <!-- <div class="categorypb_wrap">
      <div class="pb_title">新鲜水果</div>
      <div class="pb_content">
         <div class="pb_content_list" v-for="item in goods_list" :key="item">
           <img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/goods/goods003.jpg" alt="">
           <p class="pb_name">{{item.content}}</p>
           <p class="pb_price">￥{{item.price}}</p>
         </div>
      </div>
    </div> -->
    <div class="categorypb_wrap" v-for="item in category" :key="item">
      <div class="pb_title">{{item.name}}</div>
      <div class="pb_content">
         <div class="pb_content_list" v-for="item2 in goods_list" :key="item2"> 
           <img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/goods/goods003.jpg" alt="">
           <p class="pb_name">{{item2.content}}</p>
           <p class="pb_price">￥{{item2.price}}</p>
         </div> 
      </div>
    </div>
    <el-backtop :right="40" :bottom="80" />
  </div>
</template>

<script>
import MySwiper from '@/components/common/mswiper.vue'
import { getHomeCategoryList ,getHomeProductDetail ,getHomeProductList } from '@/network/home.js'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
export default {
    components:{
      MySwiper
    },
    setup(props) {
    let goods_list = [{
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
    }]
    let category=reactive([]);
    let context=ref('');
    let getCategory = async function(){
        let res = await getHomeCategoryList();
        // console.log(res);
        res.data.list.forEach((e,index) => {
            if(index<=5){
                    category[index]={
                    id:e.id,
                    name:e.name,
                    detail:{}
                  }
            }
          });
          // setTimeout(()=>{
            res.data.list.forEach(async (e,index)=>{
            let res2 = await getHomeProductDetail(e.id);
            console.log(res2);
            if(index<=5){
              category[index].detail=res2.data;
            }
          })
        // },1000)
        // console.log(category);
    }
    onMounted(getCategory)
    return {
      getCategory,
      context,
      category,
      goods_list
    }
  }
}
</script>

<style scoped>
.home_wrap{
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
.input_wrap{
  float: left;
  width: 9rem;
  margin-top: 1.2rem;
  height: 1rem;
  margin-left: 2rem;
}
.search_wrap{
  float: left;
  margin-left: .07rem;
  margin-top: 1.2rem;
  padding: .1rem;
  height: .5rem;
  cursor: pointer;
}
.search_wrap:hover{
  background-color: aliceblue;
}
.my_cart{
  float: left;
  color: rgb(211, 25, 25);
  font-size: .3rem;
  width: 2.3rem;
  height: .58rem ;
  padding-left: .15rem;
  margin-left: 1.5rem;
  margin-top: 1.24rem;
  border: 1px solid rgb(187, 187, 187);
}
.my_cart:hover{
  border: 1px solid rgb(211, 25, 25);
}
.my_cart p{
  display: inline-block;
  margin-top: .08rem;
  vertical-align: top;
}
/* father */
.category_wrap{
  display: flex;
  /* background-color: rgb(175, 31, 31); */
  margin-bottom: .5rem;
}
/* 1 */
.category_list{
  flex: 2;
  background-color: #fff;
  width: 4.8rem;
}
.list_detail{
  text-align: center;
  height: .75rem;
  line-height: 0.75rem;
}
.list_detail:hover{
  background-color:rgba(180, 180, 180, 0.226) ;
}
/* 2 */
.home_swiper{
  flex: 6;
  margin-left: .2rem;
}
/* 3 */
.swiper_right_wrap{
  display: flex;
  flex-direction: column;
  flex: 2;
}
.swiper_right{
    align-items: center;
    flex: 1;
    overflow: hidden;
}
.swiper_right img{
  width: 4.88rem;
  height: 2.87rem;
}
.categorypb_wrap{
}
.pb_content{
  display: flex;
  /* background-color: #fff; */
  margin: .5rem 0;
}
.pb_title{
  padding: .2rem;
  font-size: .45rem;
  font-weight: 600;
  color: #98560f;
}
.pb_content_list{
  flex: 1;
  background-color: #fff;
  /* display: inline-block; */
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  margin: 0 .05rem;
  /* width: 4.75rem; */
  border: 1px solid rgb(255, 255, 255);
}
.pb_content_list img{
  /* width: 4.5696rem; */
  width: 3.6rem;
}
.pb_name{
  color:rgb(78, 78, 78);
  padding:.2rem .1rem;
  overflow: hidden;    
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pb_price{
  color: rgb(255, 43, 43);
  padding-bottom: .4rem;
}
.pb_content_list:hover{
  border: .02rem solid rgb(218, 218, 218);
  /* background-color: rgb(223, 223, 223); */
}
</style>