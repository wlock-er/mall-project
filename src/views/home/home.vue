<template>
  <div class="home_wrap">
     <search-bar>
        <template v-slot:cart >
              <div class="my_cart">
                <span class="iconfont icon-cart"></span>
                 <p>我的购物车</p>
              </div>
        </template>
      </search-bar>

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
      <div class="home_swiper">
        <!-- <my-swiper></my-swiper> -->
        <el-carousel :interval="4000" arrow="always" height="6rem">
          <el-carousel-item v-for="item in 4" :key="item">
                <img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/slide.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="swiper_right_wrap">
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv01.jpg" alt=""></div>
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv02.jpg" alt=""></div>
      </div>
    </div>
    <div class="categorypb_wrap" v-for="item in category" :key="item">
      <div class="pb_title">{{item.name}}</div>
      <div class="pb_more" @click="goGoodslist(item.id)">查看更多&nbsp;<span class="iconfont icon-iconmore-copy"></span></div>
      <div class="pb_content" >
         <div class="pb_content_list" v-for="item2 in item.childlist" :key="item2" @click="goods_detail(item2.id)"> 
           <img :src="item2.image" alt="">
           <p class="pb_name">{{item2.name}}</p>
           <p class="pb_price">￥{{item2.price}}</p>
         </div> 
      </div>
    </div>

    <div v-if="category.length==0">
      <div class="categorypb_wrap" v-for="item in [1,2,3,4,5]" :key="item">
        <div v-for="item in [1,2,3,4,5]" :key="item">
          <el-skeleton animated>
            <template #template>
                <el-skeleton-item variant="image" style="width: 200px; height: 240px" />
                <div style="padding: 14px">
                  <el-skeleton-item variant="p" style="width: 80%" />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                  ">
                      <el-skeleton-item variant="text"  style="margin-right: 16px; width: 50%;" />
                      <el-skeleton-item variant="text" style="width: 22%" />
                    </div>
                  </div>
            </template>
        </el-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/common/search.vue'
import MySwiper from '@/components/common/mswiper.vue'
import { useRouter } from "vue-router"
import { getHomeCategoryList ,getHomeProductList } from '@/network/home.js'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
export default {
    components:{
      MySwiper,
      SearchBar
    },
    setup(props) {
    const router = useRouter();
    let goods_list = [{
          id:'sasa',
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
          id:'sasa1',
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
          id:'sasa2',
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
          id:'sasa3',
           title:'新鲜水果',
           content:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22
         },
         {
          id:'sasa4',
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
                    childlist:[]
                  }
            }
          });
          // setTimeout(()=>{
            res.data.list.forEach(async (e,index)=>{
            let res2 = await getHomeProductList(e.id);
            // console.log(res2.data.list);
            if(index<=5){
              category[index].childlist=res2.data.list.slice(0,5);
            }
          })
        // },1000)
        // console.log(category);
    }
    let goods_detail=function(id){
      router.push('/home/detail?id='+id)
    }
    let goGoodslist=function(id){
      router.replace('/home/goodslist?id='+id)
    }
    onMounted(getCategory)
    return {
      getCategory,
      context,
      category,
      goods_list,
      goods_detail,
      goGoodslist
    }
  }
}
</script>

<style scoped>
.home_wrap{
  margin:0 3rem ;
}
.my_cart{
  float: right;
  color: rgb(211, 25, 25);
  font-size: .3rem;
  width: 2.3rem;
  height: .58rem ;
  padding-left: .15rem;
  margin: 1.2rem 2rem 0 1.5rem;
  border: 1px solid rgb(187, 187, 187);
}
.my_cart p{
  display: inline-block;
  margin-top: .08rem;
  vertical-align: top;
}
.my_cart:hover{
  border: 1px solid rgb(211, 25, 25);
}
/* father */
.category_wrap{
  display: flex;
  margin-bottom: .5rem;
}
/* 1 */
.category_list{
  flex: 2;
  background-color: #fff;
  /* width: 4.8rem; */
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
.home_swiper img{
  height: 6rem;
}
/* 3 */
.swiper_right_wrap{
  margin-left:.2rem ;
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
  height: 2.9rem;
}
.categorypb_wrap{
}
.pb_content{
  display: flex;
  /* background-color: #fff; */
  margin: .5rem 0;
}
.pb_title{
  display: inline;
  padding: .2rem;
  font-size: .45rem;
  font-weight: 600;
  color: #98560f;
}
.pb_more{
  margin-top: .2rem;
  margin-right: .5rem;
  color: gray;
  cursor: pointer;
  float: right;
}
.pb_more:hover{
  font-weight:600;
  color: rgb(2, 0, 117);
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
  margin-top: .5rem;
  height: 3.6rem;
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

.el-skeleton{
  float:left;
  width: 4.85rem ;
  margin: .2rem 0;
}
</style>