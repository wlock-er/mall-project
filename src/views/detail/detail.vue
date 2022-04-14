<template>
  <div class="detail_wrap">
      <search-bar>
        <template v-slot:cart >
              <div class="my_cart">
                <span class="iconfont icon-cart"></span>
                 <p>我的购物车</p>
              </div>
        </template>
      </search-bar>
      <div class="detail">
        <div class="demo-image__preview">
           <el-image
             style="width: 10rem; height: 10rem"
             :src="detail.image"
             :preview-src-list="src_list"
             :initial-index="4"
             fit="cover"
           />
          <!-- <el-image v-if='detail.image==null'>
            <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image> -->
        </div>
        <div class="detail_right">
          <div class="goods_infor_wrap">
            <div class="detail_name">{{detail.name}}</div>
            <div class="detail_price">￥{{detail.price}}</div>
            <div class="detail_stock"><span>库存</span>{{detail.stock}}</div>
            <div class="detail_details" v-for="item in detail.detail" :key="item">{{item}}</div>
          </div>
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
</template>

<script>
import { ElMessage } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import SearchBar from '@/components/common/search.vue'
import { useRouter,useRoute } from "vue-router"
import { getProductDetail ,addProductInCart} from '@/network/detail.js'
import {selectItorNot} from '@/network/cart.js'
import { ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
export default {
  components:{
    SearchBar,
    IconPicture
  },
  setup(){
    let num = ref(1)
    const handleChange = (value) => {
      console.log(value)
    }
    let detail =ref({});
    let route =useRoute();
    let src_list=ref([]);
    let getdetail= async function(){
      let  res = await getProductDetail(route.query.id);
      // console.log(res.data);
      detail.value=res.data;
      let redetail1=detail.value.detail.replaceAll('商',' 商');
      let redetail2=redetail1.replace('类别',' 类别').replace('分类',' 分类');
      let redetail3=redetail2.replace('包',' 包');
      let redetail4=redetail3.replace('国产/',' 国产/');
      let redetail=redetail4.replace('原',' 原').replace('货号',' 货号').replace('店铺',' 店铺').replace('售卖',' 售卖').replace('烹饪建议',' 烹饪建议').replace('品种',' 品种').replace('热卖时间',' 热卖时间').replace('饲养方式',' 饲养方式').replace('保存状态',' 保存状态').replace('重量',' 重量').replace('套餐份量',' 套餐份量').replace('套餐周期',' 套餐周期').replace('是否',' 是否').replace('单箱规',' 单箱规');
      let redetails=redetail.split(' ');
      detail.value.detail=redetails;
      src_list.value.push(detail.value.image);
      console.log(detail.value);
    }
    //加入购物车
    let addInCart = async function(id,count){
      let res = await addProductInCart(id,count);
      //初始化不选中
      selectItorNot(id,0)
      console.log(res);
      ElMessage('加入购物车成功！')
    }
    onMounted(getdetail)
    return {
      detail,
      src_list,
      num,
      getdetail,
      handleChange,
      addInCart
    }
  }
}
</script>

<style scoped>
.detail_wrap{
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
.detail{
  display: flex;
}
.detail:nth-child(n){
  flex: 1;
}
.detail img,
.el-image{
  width: 10rem;
  height: 10rem;
}
.detail_right{
  width: 13.5rem;
  /* background-color: #fff; */
  margin-left:1rem;
  margin-bottom: .5rem;
  /* padding: .3rem; */
}
.goods_infor_wrap{
  padding: .3rem;
  /* background-color: #fff; */
  /* height: 9.5rem;
  overflow-y: scroll; */
}
.detail_name{
  margin-bottom: .3rem;
  font-size: .45rem;
  font-weight: 600;
  color: gray;
}
.detail_stock{
  display:inline-block;
  color: red;
}
.detail_stock span{
  color: #fff;
  margin-left: .5rem;
  margin-right: .1em;
  padding: .05rem .1rem;
  border-radius: 10px;
  background: -webkit-linear-gradient(left,red, rgb(255, 187, 0)); 
}
.detail_price{
  display:inline;
  margin: .5rem 0;
  font-size: .5rem;
  color:red;
}
.detail_details{
  padding: .2rem 0;
}
.addIncart{
  /* display: inline-block; */
  /* float: right; */
  float: left;
  padding: .2rem 1rem;
  text-align: center;
  background-color: rgb(185, 0, 0);
  color: #fff;
  cursor: pointer;
}
.el-input-number{
  float: left;
  margin: 0rem .1rem 0 0;
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
</style>