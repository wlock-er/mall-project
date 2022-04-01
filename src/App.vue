<template>
  <!-- <nav-bar v-show="!(this.path === '/login' ||this.path === '/register')"></nav-bar> -->
  <nav-bar></nav-bar>
  <router-view/>
</template>
<script>
import NavBar from "@/components/common/navbar.vue"
export default{
  components:{
    NavBar
  },
  data(){
    return{
      path:''
    }
  },
  mounted(){
    this.path=this.$route.path;
  },
  watch:{
    $route(to, from){
      this.path=to.path;
      console.log(to.path);
    }
  }
}
</script>

<style>
@import url('@/assets/css/icon.css');
@import url('@/assets/css/normalize.css');
</style>
