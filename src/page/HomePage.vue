<template>
  <div id="main">
     <div class="header">
        <HomeHeader></HomeHeader>
      </div>
      <div class="home-content">
        <Home1 v-if="this.activeIndex == 0" ></Home1>
        <Home2 v-if="this.activeIndex == 1" ></Home2>
        <Home3 v-if="this.activeIndex == 2" ></Home3>
        <Home4 v-if="this.activeIndex == 3" ></Home4>
        <Home5 v-if="this.activeIndex == 4" ></Home5>
      </div>
  </div>
</template>

<script>
import Home1 from '../components/Home/Home1.vue'
import Home2 from '../components/Home/Home2.vue'
import Home3 from '../components/Home/Home3.vue'
import Home4 from '../components/Home/Home4.vue'
import Home5 from '../components/Home/Home5.vue'
import HomeHeader from "@/components/Home/HomeHeader.vue"
export default {
  name: 'HomePage',
  components:{
    HomeHeader,
    Home1,
    Home2,    
    Home3,
    Home4,
    Home5
},
  props: {
  },
  data() {
      return {
        isShow:false,
        activeIndex:0
      };
  },
  mounted(){
    setInterval(()=>{
        if(++this.activeIndex > 4)  this.activeIndex=0
    }, 6000)
  },
  // created: function () {
  //   let user_params = {username:"root",password:"123456"};
  //   this.$axios.post('/api/shuhistorytest/user/login', user_params).then(res => {
  //     console.log(res)
  //     localStorage.setItem('user_token', res);
  //   })
  // },
  methods:{
    shownav:function(){
      this.isShow=~ this.isShow
    }
  }
}
</script>

<style scoped>
#main{
width: 100%;
height: 100%;
}

.header{
  position: absolute;
  width: 100%;
  height: 8%;
  z-index: 3;
}

.home-content{
  width: 100%;
  height:100%
}
.bottom{
  width: 100%;
  height: 84px;
  bottom: 0;
}
.bottom .imgb{
  width:100%;
  height:100%;
}
</style>
