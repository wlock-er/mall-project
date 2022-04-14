<template>
  <div class="goods_list_wrap">
      <search-bar>
        <template v-slot:cart >
              <div class="my_cart">
                <span class="iconfont icon-cart"></span>
                 <p>我的购物车</p>
              </div>
        </template>
      </search-bar>
  <el-row class="tac list_left">
    <el-col >
      <el-menu
        :default-active="index_id"
        class="el-menu-vertical-demo"
        @select="selected"
      >
        <el-menu-item index="1">
          <el-icon><grid /></el-icon>
          <span>全部分类</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><orange /></el-icon>
          <span>新鲜水果</span>
        </el-menu-item>
        
        <el-menu-item index="5">
          <el-icon><ship /></el-icon>
          <span>海鲜水产</span>
        </el-menu-item>
        <el-menu-item index="6">
         <el-icon><chicken /></el-icon>
          <span>精选肉类</span>
        </el-menu-item>
        <el-menu-item index="9">
          <el-icon><ice-cream /></el-icon>
          <span>冷饮冻食</span>
        </el-menu-item>
        <el-menu-item index="10">
          <el-icon><fries /></el-icon>
          <span>蔬菜蛋品</span>
        </el-menu-item>
        <el-menu-item index="">
        </el-menu-item>
        <el-menu-item index="">
        </el-menu-item>
        <el-menu-item index="">
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <div class="goods_content" >
         <div class="goods_content_list" v-for="item in goodslist" :key="item"> 
           <img :src="item.image" alt=""  @click="goGoods_detail(item.id)">
           <p class="goods_name"  @click="goGoods_detail(item.id)">{{item.name}}</p>
           <p class="goods_price">￥{{item.price}}</p>
           <a class="iconfont icon-cart order_cart" title="加入购物车" @click="addCart(item.id)"></a>
         </div> 
      </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
import {getHomeProductList, getGoodsListProductList } from '@/network/home.js'
import { addProductInCart} from '@/network/detail.js'
import SearchBar from '@/components/common/search.vue'
import { useRouter,useRoute } from "vue-router"
import {
  Grid,
  Fries,
  Ship,
  Food,
  Orange,
  IceTea,
  IceCream,
  Chicken
} from '@element-plus/icons-vue'
export default {
    components:{
        SearchBar,
        Grid,
        Fries,
        Ship,
        Food,
        Orange,
        IceTea,
        IceCream,
        Chicken
    },
    setup(){
        let goodslist=ref([]);
        let index_id=ref(1);
        let route=useRoute();
        let router=useRouter();
        let getgoodslist= async function(){
            let res=await getHomeProductList(route.query.id)
            // console.log(route.query.id);
            goodslist.value=res.data.list
            console.log(goodslist);
            // 蔬菜中加入菌菇分类
            if(route.query.id==10){
              let res2=await getHomeProductList(27);
               goodslist.value.push(...res2.data.list);
            }

            index_id.value= route.query.id==27? 10:route.query.id;
        }
        let goGoods_detail =function(id){
            router.replace('/home/detail?id='+id)
        }
        const selected = async (key) => {
          if(key==1){
            let res= await  getGoodsListProductList();
            goodslist.value=res.data.list;
          }
           else{
             let res=await getHomeProductList(key);
            goodslist.value=res.data.list;
          }
            // 蔬菜中加入菌菇分类
            if(key==10){
              let res2=await getHomeProductList(27);
               goodslist.value.push(...res2.data.list);
            }
          console.log(key);
        }
        let addCart = async function(id){
          let res =await addProductInCart(id,1);
          console.log(res);
          ElMessage('加入购物车成功！')
        }
        onMounted(getgoodslist)
        return{
            goodslist,
            goGoods_detail,
            selected,
            addCart,
            index_id
        }
    }
}
</script>

<style scoped>
.goods_list_wrap{
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
.list_left{
  float: left;
  width: 4.5rem;
  margin-right: .55rem;
}
.goods_content{
  display: flex;
  flex-wrap: wrap;
  /* justify-content:center; */
  /* background-color: #fff; */
}
.goods_content_list{
  /* flex: 1; */
  flex-basis: 24.4%;
  background-color: #fff;
  /* display: inline-block; */
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  margin: 0 .1rem .3rem 0;
  /* width: 4.65rem; */
  border: 1px solid rgb(255, 255, 255);
}
.goods_content_list img{
  margin-top: .5rem;
  /* width: 4.5696rem; */
  height: 3.6rem;
  width: 3.6rem;
}
.goods_name{
  color:rgb(78, 78, 78);
  padding:.2rem .1rem;
  overflow: hidden;    
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods_price{
  display: inline-block;
  color: rgb(255, 43, 43);
  margin-left: 1rem;
  padding-bottom: .4rem;
}
.goods_content_list:hover{
  border: .02rem solid rgb(218, 218, 218);
  /* background-color: rgb(223, 223, 223); */
}
.goods_content_list a{
  color: rgba(158, 0, 0, 0.407);
  float: right;
  line-height: .45rem;
  padding-right:.5rem;
}
.goods_content_list a:hover{
  color: red;
}
</style>