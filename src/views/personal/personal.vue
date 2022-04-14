<template>
  <div class="personal">
      <search-bar>
           <template v-slot:cartTop>
               |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{pageName}}
           </template>
       </search-bar>
      <div class="personal_content">
          <div class="navLeft">
              <div class="left_list" @click="clicklist('a')" :class="{clickClass: clicks==='a'}">·个人信息</div>
              <div class="left_list" @click="clicklist('b')" :class="{clickClass: clicks==='b'}">·我的订单</div>
              <div class="left_list" @click="clicklist('c')" :class="{clickClass: clicks==='c'}">·收货地址</div>
          </div>
          <el-scrollbar class="right_wrap">
              <div class="personalInfor_wrap" v-show="clicks==='a'">
              </div>
              <div class="order_wrap"  v-show="clicks==='b'">
                  <!-- <div class="order_head">订单信息</div> -->
                  <div class="operate_wrap">
                      <div class="operate" :class="{opclick : op==='a'}" @click="changeop('a')">全部订单</div>
                      <div class="operate" :class="{opclick : op==='未支付'}" @click="changeop('未支付')">待支付</div>
                      <div class="operate" :class="{opclick : op==='已发货'}" @click="changeop('已发货')">待收货</div>
                      <div class="operate" :class="{opclick : op==='交易已完成'}" @click="changeop('交易已完成')">待评价</div>
                  </div>
                  <div class="order_list" v-for="(item,index) in orderlist" :key="item" 
                                          v-show="op==='a'?true:item.status==op">
                      <div class="order_detail_head">{{item.date}}&nbsp;&nbsp;&nbsp;订单编号：{{item.orderNo}}</div>
                      <div class="order_detail"  v-for="item2 in item.itemVos" :key="item2">
                          <img :src="item2.productImg" alt="">
                          <div class="title">{{item2.productName}}</div>
                          <div class="amount">x{{item2.quantity}}</div>
                          <div class="price">￥{{item2.totalPrice}}</div>
                          <div class="status">{{item.status}}</div>
                          <a class="iconfont icon-cart order_cart" title="加入购物车" @click="addCart(1)"></a>

                      </div>
                      <div class="order_bottom">
                          <div class="order_pay" v-show="item.status=='未支付'" @click="pay(item.orderNo,index)">去支付</div>
                          <div class="order_pay" v-show="item.status=='未支付'" @click="cancel(item.orderNo,index)">取消订单</div>
                          <div class="total_price">总额：<span>￥{{item.totalPrices}}</span></div>
                      </div>
                  </div>
              </div>
              <div v-show="clicks==='c'">
                  <div class="address_wrap">
                      <div class="address">收货地址</div>
                      <div class="detail">姓名：小明</div>
                      <div class="detail">电话：12312333221</div>
                      <div class="detail">地址：四川省成都市新都区</div>
                  </div>
                  <div class="edict_wrap">
                      <div class="edict_head">编辑地址</div>
                      姓名：<input type="text">
                      电话：<input type="text">
                      地址：<input type="text">
                      <el-button type="primary">提交</el-button>
                  </div>
              </div>
          </el-scrollbar>
      </div>
  </div>
</template>

<script>
import SearchBar from '@/components/common/search.vue'
import { useRouter } from "vue-router"
import {getOrderList ,payOrder,cancelOrder} from '@/network/order.js'
import { h,ref, onMounted, watch, toRefs, computed,reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    name:'personal',
    components:{
        SearchBar
    },
    setup(){
        const router = useRouter();
        let pageName=ref('')
        let clicks=ref('a');
        let op=ref('a');
        let orderlist=reactive([])
        let order_list = reactive([{
           orderNo:'101442166222',
           date:'2021-02-11:21:44.00',
           name:'小慕',
           title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
           price:22,
           amount:1,
           status:'已付款'
         }])
        let clicklist=function(c){
            clicks.value=c;
        }
        let changeop=function(c){
            op.value=c;
        }
        let redirectOp =function(){
            let path=router.currentRoute.value.fullPath;
            console.log(path);
            if(path==='/personal'){
                clicks.value='a'
                pageName.value='个人中心'
            }else{
                clicks.value='b'
                pageName.value='我的订单'
            }
        }
        let getOrder=async function(){
            let res = await getOrderList();
            console.log(res.data.list);
            res.data.list.forEach((e,index)=>{
                let time1=e.createTime.split('T')
                let time2=time1[1].split('.');
                let time=time1[0]+" "+time2[0];
                let sum=0;
                e.orderItemVos.forEach((e)=>{
                    sum+=e.totalPrice;
                })//计算总额
                orderlist[index]={
                    date:time,
                    orderNo:e.orderNo,
                    status:e.orderStatusName,
                    totalPrices: sum,
                    itemVos:e.orderItemVos
                }
            })
            orderlist.reverse();
            // console.log(orderlist);
        }
        let payfor = async function(no,index){
            console.log(no);
            let res= await payOrder(no);
            orderlist[index].status='已付款';
            console.log(res);
        }
        let cancel = async function(no,index){
            let res = await cancelOrder(no);
            console.log(res);
            orderlist.splice(index,1);
        }
        watch(()=>router.currentRoute.value.fullPath,(v)=>{
            console.log(v);
            if(v==='/personal'){
                clicks.value='a'
                pageName.value='个人中心'
            }else{
                clicks.value='b'
                pageName.value='我的订单'
            }
        })
        const aLiUrl = require("@/assets/img/pay.png");
        const pay = (no,index) => {
            ElMessageBox.alert(
               '<img style="width:250px" src='+aLiUrl+'>',
               '付款码',
               {
                 dangerouslyUseHTMLString: true,
                 confirmButtonText: '支付完成',
                 beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                       instance.confirmButtonLoading = true
                       instance.confirmButtonText = 'Loading...'
                       setTimeout(() => {
                         done()
                         setTimeout(() => {
                           instance.confirmButtonLoading = false
                         }, 300)
                       }, 1000)
                     } else {
                       done()
                     }
                   }
               }
             ).then((action) => {
              ElMessage({
                type: 'info',
                message: `支付成功`,
              })
              payfor(no,index);
            })
        }
        onMounted(redirectOp)
        onMounted(getOrder)
        return{
            clicks,
            op,
            order_list,
            orderlist,
            pageName,
            clicklist,
            changeop,
            redirectOp,
            getOrder,
            pay,
            cancel
        }
    }
}
</script>

<style scoped>
.personal{
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
.personal_top{
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
.personal_content{
    display: flex;
}
.navLeft{
    text-align: center;
    background-color: #fff;
    flex: 1;
    height: 10.5rem;
    padding-top: .5rem;
}
.left_list{
    cursor: pointer;
    padding: .2rem 0;
}
.left_list:hover{
    font-weight: 600;
}
.clickClass{
    font-weight: 600;
    color: rgb(162, 114, 51);
}
.right_wrap{
    flex: 5;
    margin: 0 .5rem;
    padding-bottom: .5rem;
    margin-bottom: 1rem;
    /* width: 4rem; */
    height: 10.5rem;
    background-color: #fff;
    /* overflow-y: scroll; */
    /* overflow: scroll; */
    
}
.personalInfor_wrap,
.address_wrap{
    margin: .5rem ;
    height: 3.5rem;
    color: rgb(75, 75, 75);
    background-color: rgb(248, 248, 248);
}
.order_wrap{
    margin: .5rem ;
    height: 3.5rem;
    color: rgb(75, 75, 75);
}
.address{
    margin: .3rem .5rem;
    padding: .3rem 0 .2rem 0;
    border-bottom: 1px solid gray;
}
.detail{
    margin: .3rem .5rem;
}
.order_head{
    background-color: rgb(248, 248, 248);
    padding: .2rem  .3rem;
    margin: .3rem .2rem;
}
.operate_wrap{
    background-color: rgb(248, 248, 248);
    margin: .3rem .2rem 0 .2rem;
    padding: .2rem  .3rem;
}
.order_list{
    margin: .3rem .2rem 0 .2rem;
    padding-bottom: .2rem;
    border: 1px solid rgb(167, 167, 167);
}
.operate{
    margin: 0 .2rem;
    padding: 0.1rem .2rem;
    display: inline;
    cursor: pointer;
}
.operate:hover,
.opclick{
    border-bottom: 1px solid red;
    color:red;
}
.order_detail_head{
    background-color: rgb(248, 248, 248);
    padding: .2rem  .3rem;
    /* padding: .1rem 0 ; */
    /* border-bottom: 1px solid #000; */
}
.order_detail{
    background-color: #fff;
    border-bottom: 1px solid rgb(201, 201, 201);
    display: flex;
}
.order_detail:nth-child(n){
    flex: 1;
    line-height: 1.5rem;
    padding: .4rem 0;
}
.order_detail img{
    height: 1.5rem;
    width: 1.5rem;
    margin: 0 .3rem;
    border: 1px solid rgb(204, 204, 204);
}
.title{
    line-height: 1.5;
    width: 7rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0 .4rem;
}
.price,
.amount{
    width: 1rem;
    margin: 0 .5rem;
    color: rgb(146, 146, 146);
}
.status{
    width: 2rem;
    margin: 0 .4rem;
    color:red;
}
.order_cart:hover{
    color: red;
}
.order_bottom{
    height: .6rem;
}
.total_price,
.order_pay{
    margin: .15rem .5rem;
    float: right;
}
.total_price span{
    color: red;
}
.order_pay{
    cursor: pointer;
    padding: 0.04rem .2rem ;
    text-align: center;
    background-color: rgb(219, 0, 0);
    color: white;
}
.edict_wrap{
    color: gray;
    margin: 0 .5rem;
    padding: .3rem .5rem ;
    /* background-color: rgba(211, 211, 211, 0.081); */
    width:6.5rem;
}
.edict_head{
    font-weight: 600;
    color:rgb(162, 114, 51);
    padding: .2rem  0;

}
.edict_wrap input{
    width: 5rem;
    margin: .3rem 0;
    padding: .15rem;
}
.el-button{
    margin-top: .2rem;
    margin-left: 1rem;
    width:5.3rem;
}
</style>