<template>
      <div class="header">
        <img src="@/assets//homepage//pp8@2x.png" alt="">
        <button class="nav-btn" v-on:click="shownav" title="navButton">   </button>
      </div>
    <nav-link v-if="isShow"/>
</template>

<script>
import NavLink from '../NavLink.vue'
export default {
    components:{NavLink},
    data() {
      return {
        isShow:false,
      };
  },
    methods:{
        shownav:function(){
            this.isShow=~ this.isShow
        }
    }
}
</script>

<style scoped>

.header{
  width: 100%;
  height: 100%;
}

.header img{
    width: 58%;
    height: 80%;
    margin: 6px 0 0 5px
}

.header .nav-btn{
    width: 10%;
    height: 56%;
    background: url("~@/assets/homepage/home1/button-icon@3x.png") no-repeat;
    background-size:100% 100%;
    float: right;
    margin: 9px 5px auto;
}
</style>