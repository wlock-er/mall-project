<template>
    <div class="cart">
       <search-bar>
           <template v-slot:cartTop>
               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购物车
           </template>
       </search-bar>
       <div class="cart_title">
           <div class="title_list">
               <input type="checkbox" @click="checkall" :checked="isCheckAll">
               全选
            </div>
           <div class="title_list">商品</div>
           <div class="title_list">单价</div>
           <div class="title_list">数量</div>
           <div class="title_list">小计</div>
       </div>
       <div class="cart_list_wrap" v-if="cartlist[0] !=null">
           <div class="cart_list" v-for="(item,index) in cartlist" :key="index" >
               <input type="checkbox" @click="checkthis(item.productId,index)" :checked="item.selected">
               <img :src="item.imgpath" alt="">
               <p class="goods_content" @click="goDetail(item.productId)">{{item.title}}</p>
               <div class="goods_price">￥{{item.price}}</div>
               <button @click="operate('-',index)">-</button>
               <div class="goods_amount">{{item.amount}}</div>
               <button @click="operate('+',index)">+</button>
               <div class="amount_price">￥{{item.amountPrice}}</div>
               <div class="delete" @click="deleteGoods(index)">删除</div>
           </div>
       </div>
       <div class="cart_list_wrap null_wrap" v-else>
           <div class="iconfont icon-null"></div> 购物车还没有东西噢
       </div>
       <div class="cart_bottom" ref="bottom">
           <div class="bottom_check">
               <input type="checkbox" @click="checkall" :checked="isCheckAll">
               全选
            </div>
            <div class="deleteChecked">删除选中商品</div>
            <div class="totalPrice">
                <div>合计：<span>￥{{totalprice}}</span></div>
                <div>共计：<span>{{productQuantity}}</span>件商品</div>
            </div>
            <div class="buyChecked" @click="addProduct">结算</div>
       </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import SearchBar from '@/components/common/search.vue'
import { useRouter } from "vue-router"
import { ref, onMounted, watch, toRefs, computed,reactive,onBeforeUpdate } from 'vue'
import {getCartList,selectAllItorNot,selectItorNot,setCartupdateProduct,setCartdeleteProduct,createOrder} from '@/network/cart.js'
export default {
    components:{
        SearchBar
    },
    setup(){
        const router = useRouter();
        let context=ref('')
        let isCheckAll=ref(false);
        let cartlist=reactive([]);
        let getcartList=async function(){
            let res =await getCartList();
            // console.log(res);
            res.data.forEach((e,index)=>{
                cartlist[index]={
                    productId:e.productId,
                    title:e.productName,
                    price:e.price,
                    amount:e.quantity,
                    amountPrice:e.totalPrice,
                    imgpath:e.productImage,
                    selected:e.selected
                }
            })
            console.log(cartlist);
        }

        let totalprice=computed(()=>{
            let sum =0;
            cartlist.forEach(e=>{
                if(e.selected){
                    sum+=e.amountPrice;
                }
            })
            return sum
        })
        let productQuantity=computed(()=>{
            let sum=0;
            cartlist.forEach(e=>{
                if(e.selected){
                    sum+=e.amount;
                }
            })
            return sum;
        })
        let operate=async function(op,index){
            console.log(op);
            console.log(cartlist[index].amount);
            if(op==='-' && cartlist[index].amount>1){
                let res =await setCartupdateProduct(cartlist[index].productId,--cartlist[index].amount);
                console.log(res);
            }else if(op==='+'){
                let res =await setCartupdateProduct(cartlist[index].productId,++cartlist[index].amount);
                console.log(res);
            }
            cartlist[index].amountPrice=cartlist[index].price*cartlist[index].amount;
        }
        let deleteGoods =async function(index){
            let res =await setCartdeleteProduct(cartlist[index].productId);
            router.go(0);
            console.log('删除'+cartlist[index].productId);
        }
        let checkall=async function(){
            console.log('全选');
            isCheckAll.value= !isCheckAll.value;
            cartlist.forEach(e=>{
                e.selected=isCheckAll.value
            })
            console.log(isCheckAll.value);
            let res=await selectAllItorNot(isCheckAll.value?1:0);
            console.log(res);
        }
        let checkthis=async function(id,index){
            isCheckAll.value=true;
            cartlist[index].selected=!cartlist[index].selected;
            cartlist.forEach(e=>{
                if(!e.selected){
                    isCheckAll.value=false;
                }
            })
            let res=await selectItorNot(id,cartlist[index].selected?1:0);
            console.log(res);
        }
        let getscroll=function(){
            window.addEventListener('scroll',()=>{
            // let scrollTop = this.$refs.bottom.pageYOffset ||  this.$refs.bottom.scrollTop;
            let scrollTop = window.scrollTop;
            // console.log(scrollTop);
            })
        }
        let addProduct =async function(){
            let res = await createOrder();
            ElMessage('已生成订单，待支付！')
            router.replace('/order');
            console.log(res);
        }
        let goDetail=function(id){
            router.replace('/home/detail?id='+id);
        }
        onMounted(getcartList)
        return{
            context,
            isCheckAll,
            cartlist,
            operate,
            deleteGoods,
            checkall,
            checkthis,
            getcartList,
            getscroll,
            totalprice,
            productQuantity,
            addProduct,
            goDetail
        }
    }
}
</script>

<style scoped>
.cart{
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
.cart_top{
    float: left;
    font-size: .4rem;
    margin-top: 1.5rem;
    color: gray;
}
.input_wrap{
  float: right;
  width: 6rem;
  margin-top: 1.2rem;
  height: 1rem;
  margin-left: 2rem;
}
.search_wrap{
  float: right;
  margin-right: 1.5rem;
  margin-top: 1.2rem;
  padding: .1rem;
  height: .5rem;
  cursor: pointer;
}
.search_wrap:hover{
  background-color: aliceblue;
}
.cart_title{
    background-color: rgb(255, 255, 255);
    margin-top: .7rem;
    height: 1rem;
    padding: 0 .3rem;
    box-shadow: 0 0 .2rem rgb(204, 204, 204);
}
input{
    width: .28rem;
    height: .28rem;
}
.title_list{
    float: left;
    padding: .3rem 0;
    padding-right:1rem;
}
.title_list:nth-child(2){
    margin-left: 3.2rem;
}
.title_list:nth-child(3){
    margin-left: 7.78rem;
}
.title_list:nth-child(4){
    margin-left: .7rem;
}
.title_list:nth-child(5){
    margin-left: .8rem;
}
.cart_list_wrap{
    margin-bottom: .8rem;
}
.cart_list{
    display: flex;
    padding: 0 .2rem;
    background-color: #fff;
}
.cart_list:nth-child(n){
    flex: 1;
    margin: .1rem;
    color: gray;
}
.cart_list input{
    margin-top: 1.2rem;
}
.cart_list img{
    margin-left: .5rem;
    padding: .5rem 0 .5rem .5rem;
    width:2.5rem;
    height: 2.5rem;
}
.cart_list p{
    margin-left: 1.5rem;
    margin-top: 1.5rem;
    width: 8.5rem;
    height: .82rem;
    cursor: pointer;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.cart_list p:hover{
    color:#000;
}
.cart_list button{
    margin-top: 1.5rem;
    height:.6rem;
    padding: 0 .2rem;
    background-color: rgb(245, 247, 250);
    border: 1px solid rgb(207, 207, 207);   
}
.cart_list div{
    margin-top: 1.5rem;
}
.goods_amount{
    padding: .05rem .4rem ;
    height:.45rem;
    border: .02rem solid rgb(207, 207, 207);
}
.goods_price,
.amount_price{
    width: 1rem;
    margin: 0 .8rem;
    color:red;
}
.delete{
    margin-left: .8rem;
}
.delete:hover{
    color:red;
    cursor: pointer;
}
.cart_bottom{
    position: sticky;
    bottom: 0;
    display: flex;
    padding: .2rem;
    background-color: #fff;
    /* margin-bottom: 1rem; */
    box-shadow: 0 0 .2rem rgb(204, 204, 204);
}
.cart_bottom:nth-child(n){
    flex: 1;
    margin:0 .1rem;
}
.bottom_check{
    width: 2rem;
    line-height: .816rem;
}
.deleteChecked{
    width: 5rem;
    line-height: .816rem;
    margin-left: .8rem;
}
.totalPrice{
    width: 5rem;
    display: flex;
    flex-direction: column;
    font-size: .2rem;
    margin-left: 12.5rem;
}
.totalPrice span{
    /* flex: 1; */
    font-size: .32rem;
    color: red;
}
.buyChecked{
    cursor: pointer;
    width: 1.2rem;
    text-align: center;
    margin-right: .32rem;
    color: #fff;
    padding: 0.2rem .3rem;
    background-color: rgb(219, 0, 0);
}


.null_wrap{
    text-align: center;
    margin: 2.5rem 0;
}
</style>