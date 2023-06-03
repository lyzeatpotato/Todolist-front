<template>
  <div class="nav">
    <router-link :to="{ name: 'LandmarkPage' }">
      <button  class="link">携手足迹</button>
    </router-link>
    <router-link :to="{ name: 'FigurePage' }">
      <button  class="link">待做清单</button>
    </router-link>
    <router-link :to="{ name: 'EventPage' }">
      <button class="link">历史打卡</button>
    </router-link>
  </div>


</template>

<script>
export default {
  name: 'NavPage',
  props: {
    msg: String
  },
  data() {
      return {
        
      };
    },
    methods: {
    }
}
   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
  width: 40%;
  position: fixed;
  top:8%;
  right: 0;
}

.link{
    width:100%;
    height: 40px;
    color: rgb(240,248,255,0.9);
    border: 1px solid  rgb(240,248,255,0.3);
    background-color:#841D22;
}
</style>
