<template>
  <div class="detail_wrap">
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
      <div class="detail">
        <div class="demo-image__preview">
           <el-image
             style="width: 8.5rem; height: 8.5rem"
             :src="bigImg"
             :preview-src-list="detail.images"
             :initial-index="bigImgIndex"
             fit="cover"
           />
           <div class="smallImg" v-for="(item, index) in detail.images" :key="item">
             <el-image 
             @mouseover="mousroverImg(index)"
             :src="item"
             :preview-src-list="detail.images"
             :initial-index="index"
             fit="cover"
           />
           </div>
        </div>
        <div class="detail_right">
          <div class="goods_infor_wrap">
            <div class="detail_name"><div class="detail_stock"><span>库存</span>{{detail.stock}}</div>{{detail.name}}</div>
            <!-- <div class="detail_stock"><span>库存</span>{{detail.stock}}</div> -->
            <div class="detail_price_more">原价：<s>￥{{detail.price+3}}</s></div>
            <div class="detail_price">秒杀价：<span>￥{{detail.price}}</span></div>
            <div class="detail_address">配送至：<span>{{address}}</span></div>
            <div class="detail_address">快递：<span>免运费</span></div>
            <div class="detail_address">服务：<span>48小时内发货</span></div>
            <div class="detail_address">保障：<span>7天无理由退货</span></div>
            <span>数量：</span>
            <el-input-number
              v-model="num"
              :min="1"
              :max="5"
              controls-position="right"
              size="large"
              @change="handleChange"
            />
            <div class="addIncart" @click="addInCart(detail.id,num)">
              加入购物车
            </div>
          </div>
        </div>
      </div>
      <div class="detail_details_wrap">
        <div class="details_head">商品详情</div>
        <div class="detail_details" v-for="item in detail.detail" :key="item">{{item}}</div>
      </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import SearchBar from '@/components/common/search.vue'
import { useRouter,useRoute } from "vue-router"
import {getUserDtail} from '@/network/order.js'
import { getProductDetail ,addProductInCart} from '@/network/detail.js'
import {selectItorNot} from '@/network/cart.js'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
export default {
  components:{
    SearchBar,
    IconPicture
  },
  setup(){
    const store = new useStore(); 
    let num = ref(1);
    const handleChange = (value) => {
      console.log(value)
    }
    let detail =ref({});
    let route =useRoute();
    let cartSize=ref(0);
    let bigImgIndex=ref(0);
    let bigImg=ref('');
    let address=ref('');
    let getdetail= async function(){

      let  res = await getProductDetail(route.query.id);
      console.log(res.data);
      detail.value=res.data;
      let redetails=res.data.detail.split('#');
      let images=res.data.image.split('#');
      detail.value.detail=redetails;
      detail.value.images=images;
      bigImg.value=detail.value.images[0];
      store.dispatch('getCartS');
      setTimeout(()=>{
        cartSize.value=store.state.cartSize;
      },500)
      console.log(detail.value);
      let res2 =await getUserDtail();
      address.value=res2.data.address;
    }
    //加入购物车
    let addInCart = async function(id,count){
      let res = await addProductInCart(id,count);
      //初始化不选中
      selectItorNot(id,0)
      console.log(res);
      store.dispatch('getCartS');
      setTimeout(()=>{
        cartSize.value=store.state.cartSize;
      },500)
      ElMessage('加入购物车成功！')
    }

    let mousroverImg = function(index){
      // console.log(index);
      bigImg.value= detail.value.images[index];
      bigImgIndex.value=index;
    }
    onMounted(getdetail)
    return {
      detail,
      num,
      cartSize,
      bigImg,
      bigImgIndex,
      address,
      getdetail,
      handleChange,
      addInCart,
      mousroverImg
    }
  }
}
</script>

<style scoped>
.detail_wrap{
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
.detail{
  display: flex;
}
.detail:nth-child(n){
  flex: 1;
}
.demo-image__preview{
  width: 8.5rem;
  height: 8.5rem;
  margin-bottom: 2rem;
}
/* .detail img,
.el-image{
  width: 1rem;
  height: 1rem;
} */
.smallImg{
  float: left;
  margin:.12rem .05rem;
  border: 0.02rem solid rgb(255, 255, 255);
}
.smallImg .el-image{
  width: 1.2rem; 
  height: 1.2rem; 
}
.smallImg:hover{
  border: 0.02rem solid rgb(255, 0, 0);
}
.detail_right{
  width: 15rem;
  /* background-color: #fff; */
  margin-left:1rem;
  margin-bottom: .5rem;
  /* padding: .3rem; */
}
.goods_infor_wrap{
  padding: .3rem;
}
.detail_name{
  display: inline-block;
  margin-bottom: .12rem;
  font-size: .45rem;
  font-weight: 600;
  color: gray;
}
.detail_stock{
  float: right;
  font-size: .34rem;
  display:inline-block;
  color: red;
}
.detail_stock span{
  color: #fff;
  margin-left: .25rem;
  margin-right: .1em;
  padding: .05rem .1rem;
  border-radius: 10px;
  background: -webkit-linear-gradient(left,red, rgb(255, 187, 0)); 
}

.detail_price span{
  font-size: .55rem;
  color:red;
}
.detail_price,
.detail_price_more,
.detail_address{
  /* font-size: .36rem; */
  margin: .45rem 0;
  color: gray;
}
.detail_details{
  padding: .2rem 0;
}
.addIncart{
  width: 3rem;
  margin-top: .2rem;
  padding: .2rem 1rem;
  text-align: center;
  background-color: rgb(185, 0, 0);
  color: #fff;
  cursor: pointer;
}
.el-input-number{
  margin: 0.2rem .1rem 0.3rem 0;
}
 .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.detail_details_wrap{
  margin-top: .5rem;
  padding: .5rem;
  background-color: #fff;
}
.details_head{
  font-size: .5rem;
  font-weight: 600;
  margin-bottom: .2rem;
}
</style>