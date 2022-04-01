<template>
    <div class="cart">
       <div class="top_wrap">
          <img src="@/assets/img/logo.png" alt="">
          <div class="cart_top">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购物车</div>
          <div class="search_wrap iconfont icon-search"></div>
          <div class="input_wrap">
               <el-input v-model="context" placeholder="请输入关键词"></el-input>
          </div>
       </div>
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
       <div class="cart_list_wrap">
           <div class="cart_list" v-for="(item,index) in goods_detail" :key="index" >
               <input type="checkbox" @click="checkthis" :checked="isCheck" ref="checks">
               <img src="http://demo.mxyhn.xyz:8020/cssthemes6/2.08ZF06/images/goods/goods003.jpg" alt="">
               <p class="goods_content">{{item.title}}</p>
               <div class="goods_price">￥{{item.price}}</div>
               <button @click="operate('-',index)">-</button>
               <div class="goods_amount">{{item.amount}}</div>
               <button @click="operate('+',index)">+</button>
               <div class="amount_price">￥{{item.amountPrice}}</div>
               <div class="delete" @click="deleteGoods">删除</div>
           </div>
       </div>
       <div class="cart_bottom" ref="bottom">
           <div class="bottom_check">
               <input type="checkbox" @click="checkall" :checked="isCheckAll">
               全选
            </div>
            <div class="deleteChecked">删除选中商品</div>
            <div class="totalPrice">
                <div>合计：<span>￥1230</span></div>
                <div>共计：<span>2</span>件商品</div>
            </div>
            <div class="buyChecked">结算</div>
       </div>
    </div>
</template>

<script>
export default {
    name:'cart',
    data(){
        return{
            isCheck:false,
            isCheckAll:false,
            goods_detail:[{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果红颜奶油草莓 约重500g/20-24颗 新鲜水果红颜奶油草莓 约重500g/20-24颗 新鲜水果红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            },{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            },{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            },{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            },{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            },{
                title:'红颜奶油草莓 约重500g/20-24颗 新鲜水果',
                price:120,
                amount:1,
                amountPrice:120
            }]
        }
    },
    mounted(){
        window.addEventListener('scroll',()=>{
            // let scrollTop = this.$refs.bottom.pageYOffset ||  this.$refs.bottom.scrollTop;
            let scrollTop = window.scrollTop;
            console.log(scrollTop);
        })
    },
    computed:{
        amountPrice(){
            return this.amount*this.price;
        }
    },
    methods:{
        operate(op,index){
            if(op==='-' && this.goods_detail[index].amount>1){
                this.goods_detail[index].amount--;
                this.goods_detail[index].amountPrice=this.goods_detail[index].amount*this.goods_detail[index].price;
            }else if(op==='+'){
                this.goods_detail[index].amount++;
                this.goods_detail[index].amountPrice=this.goods_detail[index].amount*this.goods_detail[index].price;
            }
        },
        deleteGoods(){
            console.log('删除');
        },
        checkall(){
            console.log('全选');
            this.isCheckAll= !this.isCheckAll
            this.isCheck = this.isCheckAll
        },
        checkthis(){
            let checks = this.$refs.checks.map(v=>{
                return v.checked;
            })
            this.isCheckAll=true;
            console.log(checks);
            checks.forEach(v=>{
                if(!v){
                    this.isCheckAll=false;
                }
            })
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
    width:3rem;
    height: 3rem;
}
.cart_list p{
    margin-left: 1.5rem;
    margin-top: 1.2rem;
    width: 8.5rem;
    height: .72rem;
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
    margin-top: 1.2rem;
    height:.6rem;
    padding: 0 .2rem;
}
.cart_list div{
    margin-top: 1.2rem;
}
.goods_amount{
    padding: .05rem .4rem ;
    height:.45rem;
    border: .02rem solid rgb(207, 207, 207);
}
.goods_price,
.amount_price{
    margin: 0 .8rem;
    color:red;
}
.delete{
    margin-left: 1.5rem;
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
</style>