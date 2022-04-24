<template>
  <div class="home_wrap">
     <search-bar>
        <template v-slot:cart >
          <el-badge :value="cartSize" class="cart_item">
              <div class="my_cart">
                 <span class="iconfont icon-cart"></span>
                 <p>我的购物车</p>
              </div>
           </el-badge>
              
        </template>
      </search-bar>

    <div class="category_wrap">
      <!-- <div class="category_list">
        <div class="list_detail iconfont icon-chengzi1">橘子橙子/果冻橙</div>
        <div class="list_detail iconfont icon-caomei1">草莓/奇异果</div>
        <div class="list_detail iconfont icon-pangxie1">螃蟹/海参</div>
        <div class="list_detail iconfont icon-fish">鱼类</div>
        <div class="list_detail iconfont icon-rou">牛羊肉</div>
        <div class="list_detail iconfont icon-bingqilin1">冰淇淋</div>
        <div class="list_detail iconfont icon-yingtao1">车厘子/其他水果</div>
        <div class="list_detail iconfont icon-huoguo">火锅食材</div>
      </div> -->
      <div class="home_swiper">
        <!-- <my-swiper></my-swiper> -->
        <el-carousel :interval="4000" arrow="always" height="6rem" type='card'>
          <el-carousel-item v-for="item in swiper_list" :key="item" >
                <img :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div class="swiper_right_wrap">
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv01.jpg" alt=""></div>
        <div class="swiper_right"><img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/adv02.jpg" alt=""></div>
      </div> -->
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
import { useStore } from "vuex";
import SearchBar from '@/components/common/search.vue'
import MySwiper from '@/components/common/mswiper.vue'
import { useRouter } from "vue-router"
import { getHomeCategoryList,getHomeProductList} from '@/network/home.js'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
export default {
    components:{
      MySwiper,
      SearchBar
    },
    setup(props) {
    const store = new useStore(); 
    const router = useRouter();
    let category=reactive([]);
    let context=ref('');
    let swiper_list=ref([
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ace05dcbb576a8012129e2af4741.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652521192&t=21a26ba2046492e073ab7a486a5dfb2e',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01502f5b6295d9a801215c8f092d7c.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652524577&t=690e5ef7b7e8d3dc779292ad0f0831dd',
      'https://img.zcool.cn/community/0110ba5bd3f0afa8012099c8c422f2.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,Q_100',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017b9d5dcbb577a8012053c090de59.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652517728&t=a4d3ab038929704a07f20b89b54dfbf3',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff4db91ab1bec83d19c9a482c22f682217fd2472511765-RgF837_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652522304&t=826a11da6e1ad2d70de8ac928e5606ed',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0188c655f9374832f875a1328ea00a.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652520748&t=7e236301803242dc6d033ca745cb5897',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F015d625542b7650000019ae9c9da20.jpg%40900w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652520799&t=9f48cdf61e2d64ad1bca189db7ceb066'
    ])
    let cartSize=ref(0);
    let getCategory = async function(){
        let res = await getHomeCategoryList();
        console.log(res);
        store.dispatch('getCartS');
        setTimeout(()=>{
          cartSize.value=store.state.cartSize;
        },500)
        res.data.forEach((e,index) => {
            if(index<=5){
                    category[index]={
                    id:e.id,
                    name:e.name,
                    childlist:[]
                  }
            }
          });

        res.data.forEach(async (e,index)=>{
          let res2 = await getHomeProductList(e.id);
          // console.log(res2.data.list);
          console.log(res2);
          if(index<=5){
            category[index].childlist=res2.data.list.slice(0,5);
          }
        })
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
      cartSize,
      swiper_list,
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
  cursor: pointer;
  /* float: right; */
  color: rgb(211, 25, 25);
  font-size: .3rem;
  width: 2.3rem;
  height: .58rem ;
  padding-left: .15rem;
  /* margin: 1.2rem 2rem 0 1.5rem; */
  border: 1px solid rgb(187, 187, 187);
}
.cart_item{
  float: right;
  margin: 1.2rem 2rem 0 1.5rem;
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