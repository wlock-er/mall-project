<template>
  <div class="searchCenter_wrap">
          <div class="input_wrap">
               <!-- <el-input v-model="contend" placeholder="请输入关键词"></el-input> -->
               <el-input
                 v-model="contend"
                 class="w-50 m-2"
                 placeholder="请输入关键词"
                 :prefix-icon="Search"
               />
               <el-button class="search_wrap" @click="seacrhIt" type="primary">搜索</el-button>
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="3">水果</el-menu-item>
            <el-menu-item index="5">海鲜</el-menu-item>
            <el-menu-item index="6">肉类</el-menu-item>
            <el-menu-item index="9">冷饮</el-menu-item>
            <el-menu-item index="10">蔬菜</el-menu-item>
            <el-menu-item index="27">菌菇</el-menu-item>
          </el-menu>
          <div class="search_goods_content" v-if="goodslist.length!=0">
             <div class="search_goods_content_list" v-for="item in goodslist" :key="item"> 
             <img :src="item.image" alt=""  @click="goGoods_detail(item.id)">
             <p class="search_goods_name"  @click="goGoods_detail(item.id)">{{item.name}}</p>
             <p class="search_goods_price">￥{{item.price}}</p>
             <a class="iconfont icon-cart order_cart" title="加入购物车" @click="addCart(item.id)"></a>
           </div> 
         </div>
         <div class="noProduct" v-else>
           <div class="iconfont icon-null"></div> 没有相关商品
         </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
import {getSeacrhProductList ,getSeacrhProductListById} from '@/network/home.js'
import { addProductInCart} from '@/network/detail.js'
import { useRouter,useRoute } from "vue-router"
export default {
  components:{
  },
    setup(){
        const route=useRoute();
        let router=useRouter();
        let contend=ref('');
        let goodslist=ref([]);
        const activeIndex = ref('1');
        let currentIndex=ref('1');
        const handleSelect =async (key, keyPath) => {
          currentIndex.value=key;
          // console.log(contend.value);
          let res
          if(key==='1'){
            console.log('全部0');
            res=await getSeacrhProductList(contend.value);
            console.log(res);
          }
          else{
            res=await getSeacrhProductListById(contend.value,key);
          }
          goodslist.value=res.data.list;
        }
        let getSearchResult= async function(){
            contend.value=route.query.contend;
            console.log(route.query.contend);
            let res=await getSeacrhProductList(route.query.contend);
            console.log(res);
            goodslist.value=res.data.list
        }
        let goGoods_detail =function(id){
            router.replace('/home/detail?id='+id)
        }
        let addCart = async function(id){
          let res =await addProductInCart(id,1);
          console.log(res);
          ElMessage('加入购物车成功！')
        }
        let seacrhIt = async function(){
           let res;
           if(currentIndex.value==="1"){
             res=await getSeacrhProductList(contend.value);
           }else{
             res=await getSeacrhProductListById(contend.value,currentIndex.value);
            
           }
             console.log(res);
             goodslist.value=res.data.list
        }
        onMounted(getSearchResult)
        return{
            contend,
            goodslist,
            goGoods_detail,
            addCart,
            Search,
            seacrhIt,
            activeIndex,
            handleSelect
        }
    }
}
</script>

<style scoped>
.searchCenter_wrap{
  text-align: center;
  margin:0 3rem ;
}
.input_wrap{
  width: 14rem;
  margin: 0 auto;
  margin-top: 1.2rem;
  /* height: 1rem; */
}
.el-input{
  width: 12rem;
}
.input_wrap /deep/.el-input__inner{
  height: .88rem;
}
.searchCenter_wrap .search_wrap{
  float: right;
  padding: .4rem .5rem;
  margin-top: .05rem;
  cursor: pointer;
}
.search_wrap:hover{
  background-color: rgb(0, 107, 201);
}

.search_goods_content{
  display: flex;
  flex-wrap: wrap;
  margin-top: .35rem;
}
.noProduct{
  color: gary;
  margin-top: 2rem;
}
.search_goods_content_list{
  /* flex: 1; */
  flex-basis: 19.5%;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  margin: 0 .1rem .3rem 0;
  /* width: 4.75rem; */
  border: 1px solid rgb(255, 255, 255);
}
.search_goods_content_list img{
  margin-top: .5rem;
  /* width: 4.5696rem; */
  height: 3.6rem;
  width: 3.6rem;
}
.search_goods_name{
  color:rgb(78, 78, 78);
  padding:.2rem .1rem;
  overflow: hidden;    
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search_goods_price{
  display: inline-block;
  color: rgb(255, 43, 43);
  margin-left: 1rem;
  padding-bottom: .4rem;
}
.search_goods_content_list:hover{
  border: .02rem solid rgb(218, 218, 218);
  /* background-color: rgb(223, 223, 223); */
}
.search_goods_content_list a{
  color: rgba(158, 0, 0, 0.407);
  float: right;
  line-height: .45rem;
  padding-right:.5rem;
}
.search_goods_content_list a:hover{
  color: red;
}

.el-menu{
  margin: 0 auto;
  margin-top: 1.5rem;
}
.el-menu-item{
  padding: 0 .7rem;
}
</style>