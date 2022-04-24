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
                  <div class="personal_primary">
                    <el-upload
                      class="avatar-uploader"
                      action="http://localhost:8080/upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                    >
                      <p class="plus">编辑头像</p>
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <div v-else><img src="	https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt=""></div>
                    </el-upload>
                    <div class="personal_name">昵称：{{username}}</div>
                  </div>
                  <div class="personal_more">
                    <div class="personal_sign">个性签名：{{userDtail.personalizedSignature}}<el-button type="text" @click="openS">编辑</el-button></div>
                    <div class="personal_phone">登录时间：{{userDtail.updateTime}}</div>
                    <div class="personal_phone">电话：{{userDtail.phone}}<el-button type="text" @click="openP">编辑</el-button></div>
                    <div class="personal_phone">邮箱：{{userDtail.mail}}<el-button type="text" @click="openM">编辑</el-button></div>
                  </div>
              </div>
              <div class="order_wrap"  v-show="clicks==='b'">
                  <div class="operate_wrap">
                      <div class="operate" :class="{opclick : op==='a'}" @click="changeop('a')">全部订单</div>
                      <div class="operate" :class="{opclick : op==='未支付'}" @click="changeop('未支付')">待支付</div>
                      <div class="operate" :class="{opclick : op==='已付款'}" @click="changeop('已付款')">待发货</div>
                      <div class="operate" :class="{opclick : op==='已发货'}" @click="changeop('已发货')">待收货</div>
                      <div class="operate" :class="{opclick : op==='交易已完成'}" @click="changeop('交易已完成')">待评价</div>
                  </div>
                  <div v-if="orderlist[0] != null">
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
                  <div class="null_wrap" v-else>
                    <div class="iconfont icon-null"></div> 还没有订单噢
                  </div>
              </div>
              <div v-show="clicks==='c'">
                  <div class="address_wrap">
                      <div class="address">收货地址</div>
                      <div class="detail">姓名：小明</div>
                      <div class="detail">电话：{{userDtail.phone}}</div>
                      <div class="detail">地址：{{userDtail.address}}<el-button type="text" @click="openA">编辑</el-button></div>
                  </div>
              </div>
          </el-scrollbar>
      </div>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import SearchBar from '@/components/common/search.vue'
import { useRouter } from "vue-router"
import {getOrderList ,payOrder,cancelOrder, getUserDtail,updateSign,updatePhone,updateEamil,updateAddress, updateImage} from '@/network/order.js'
// import {uploadImage} from '@/network/login.js'
import { ref, onMounted, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox} from 'element-plus'
export default {
    name:'personal',
    components:{
        SearchBar,
        Plus
    },
    setup(){
        const username=document.cookie.split('=')[1];
        const imageUrl = ref('')
        let handleAvatarSuccess = async (res)=>{
            imageUrl.value=res.data;
            console.log(res);
            let res2= await updateImage(res.data);
            console.log(res2);
	      }
        const router = useRouter();
        let pageName=ref('')
        let clicks=ref('a');
        let op=ref('a');
        let orderlist=reactive([]);
        let userDtail=ref([])
         let circleUrl=ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
        let changeop=function(c){
            op.value=c;
        }
        let redirectOp =function(){
            let path=router.currentRoute.value.fullPath;
            // console.log(path);
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
            console.log(res.data);
            if(res.data != null){
              res.data.list.forEach((e,index)=>{
                  let time1=e.createTime.split('T')
                  let time2=time1[1].split('.');
                  let time=time1[0]+" "+time2[0];
                  let sum=0;
                  e.orderItemVos.forEach((e)=>{
                      sum+=e.totalPrice*e.quantity;
                  })//计算总额
                  orderlist[index]={
                      date:time,
                      orderNo:e.orderNo,
                      status:e.orderStatusName,
                      totalPrices: sum,
                      itemVos:e.orderItemVos
                  }
              })
            }
            orderlist.reverse();
            //用户信息
            let res2 =await getUserDtail();
            userDtail.value=res2.data;
            userDtail.value.updateTime=res2.data.createTime.split('T').join(" ").split('.')[0];
            imageUrl.value=res2.data.images;
            console.log(res2);

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
            ElMessage('取消成功！')
        }
        let clicklist=function(c){
            clicks.value=c;
            if(c=='a'){
               router.replace('/personal')
            }
            else if(c=='b'){
               router.replace('/order')
            }
        }
        watch(()=>router.currentRoute.value.fullPath,(v)=>{
            // console.log(v);
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

        const openS =  () => {
          ElMessageBox.prompt('请输入修改后的信息', '修改', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern: /./,
            inputErrorMessage: '不能为空',
          })
            .then(async({ value }) => {
              ElMessage({
                type: 'success',
                message: `你的新签名是: ${value}`,
              })
              let res= await updateSign(value);
              console.log(res);
              let res2 =await getUserDtail();
              userDtail.value=res2.data;
              userDtail.value.updateTime=res2.data.createTime.split('T').join(" ").split('.')[0];
              imageUrl.value=res2.data.images;
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消操作',
              })
            })
        }
        const openP = () => {
          ElMessageBox.prompt('请输入修改后的信息', '修改', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern: /[0-9]{11,11}/s,
            inputErrorMessage: '请输入正确格式',
          })
            .then(async ({ value }) => {
              ElMessage({
                type: 'success',
                message: `你的新电话是: ${value}`,
              })
              let res= await updatePhone(value);
              console.log(res);
              let res2 =await getUserDtail();
              userDtail.value=res2.data;
              userDtail.value.updateTime=res2.data.createTime.split('T').join(" ").split('.')[0];
              imageUrl.value=res2.data.images;
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消操作',
              })
            })
        }
        const openM = () => {
          ElMessageBox.prompt('请输入修改后的信息', '修改', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '不是正确邮箱地址',
          })
            .then(async({ value }) => {
              ElMessage({
                type: 'success',
                message: `你的新邮箱是: ${value}`,
              })
              let res= await updateEamil(value);
              console.log(res);
              let res2 =await getUserDtail();
              userDtail.value=res2.data;
              userDtail.value.updateTime=res2.data.createTime.split('T').join(" ").split('.')[0];
              imageUrl.value=res2.data.images;
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消操作',
              })
            })
        }
        const openA =  () => {
          ElMessageBox.prompt('请输入修改后的信息', '修改', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern: /./,
            inputErrorMessage: '不能为空',
          })
            .then(async({ value }) => {
              ElMessage({
                type: 'success',
                message: `你的新地址是: ${value}`,
              })
              let res= await updateAddress(value);
              console.log(res);
              let res2 =await getUserDtail();
              userDtail.value=res2.data;
              userDtail.value.updateTime=res2.data.createTime.split('T').join(" ").split('.')[0];
              imageUrl.value=res2.data.images;
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消操作',
              })
            })
        }
        onMounted(redirectOp)
        onMounted(getOrder)
        return{
            clicks,
            op,
            // order_list,
            orderlist,
            pageName,
            circleUrl,
            userDtail,
            username,
            clicklist,
            changeop,
            redirectOp,
            getOrder,
            pay,
            cancel,
            imageUrl,
            handleAvatarSuccess,
            openS,
            openP,
            openM,
            openA
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
    margin:  .4rem .4rem 0rem .4rem ;
    padding: .35rem;
    /* height: 3.5rem; */
    color: rgb(75, 75, 75);
}
.address_wrap{
  background-color: rgb(248, 248, 248);
}
.personalInfor_wrap span{
    margin-left: .5rem;
    cursor: pointer;
    color: var(--el-color-primary);
}
.personalInfor_wrap .el-button,
.address_wrap .el-button{
    margin-top: 0rem;
    margin-left: .8rem;
    width: 0;
    height: 0;
}
.personalInfor_wrap span:hover{
    color: rgb(0, 50, 92);
}
.personal_primary{
    padding:.5rem 0;
    box-shadow: 0 0 .2rem rgb(204, 204, 204);
    /* background-color: rgba(246, 246, 246, 0.66); */
}
.personal_more{
  margin: .5rem 0;
  /* background-color: #fff; */
}
.personal_name{
    text-align:center;
    margin-bottom: .5rem;
    /* margin: .5rem 0 0.35rem 3.85rem; */
    font-weight: 600;
}
.personal_sign,
.personal_phone{
    text-align:center;
    margin-bottom: .25rem;
    /* margin-left: 3.85rem; */
}
.order_wrap{
    margin: .5rem ;
    height: 3.5rem;
    color: rgb(75, 75, 75);
}
.address{
    margin: .3rem .5rem ;
    padding: 0 0 .2rem 0;
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
.avatar-uploader{
    text-align: center;
}
.avatar-uploader .avatar {
  height: 100%;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  margin: .2rem;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload div{
  width: 2.5rem;
  height: 2.5rem;
}

.avatar-uploader .el-upload:hover .plus{
    display: block;
}

.avatar-uploader img{
  width: 2.5rem;
  height: 2.5rem;
}
.plus{
    padding: .02rem .2rem;
    display: none;
    color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.115);
    position: absolute;
    top: 40%;
    border: 1px solid rgb(99, 99, 99);
}
.null_wrap{
  text-align: center;
  margin: 1.5rem 0;
}

</style>