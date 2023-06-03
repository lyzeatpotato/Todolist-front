<template>
  <div id="main" ref="land" >
      <img class="background2" src="@/assets//landmarkpage//background3@2x.png" alt="">
      <div class="header">
        <nav-header :moduleName="moduleName"></nav-header>
      </div>
      <div class="content">
        <div class="map" ref="map">
          <land-map v-if="activeVar==2" :lands="lands"></land-map>
          <bao-shan-map v-if="activeVar==11" :lands="lands"></bao-shan-map>
          <jia-ding-map v-if="activeVar==10"></jia-ding-map>
          <yan-chang-map v-if="activeVar==12"></yan-chang-map>
        </div>
        <div class="biao-swiper">
          <ul>
           <land-icon class="land-li"  v-for="(item) in landmarks" :key="item.id" :index="item.id" :activeVar="activeVar" :landmarks="landmarks" @clickActive="clickActive"></land-icon>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import LandIcon from '../components/LandMark/LandIcon.vue'
import LandMap from '../components/LandMark/LandMap.vue'
import BaoShanMap from '../components/LandMark/BaoShanMap.vue'
import JiaDingMap from '../components/LandMark/JiaDingMap.vue'
import YanChangMap from '../components/LandMark/YanChangMap.vue'
export default {
  name: 'FigurePage',
  components:{
      NavHeader,
      LandIcon,
      LandMap,
      BaoShanMap,
      JiaDingMap,
      YanChangMap
  },
  props: {
  },
  mounted(){
    // this.$refs.land.addEventListener('click',this.clickEvent);
  },
  data() {
      return {
        isShow:false,
        moduleName:"携手足迹",
        lands:[],
        landmarks:[],
        activeName:"",
        activeVar:2
      };
  },
  computed:{
  },
  created: function () {
    this.getLandData()
  },
  methods:{
    shownav:function(){
      this.isShow=~ this.isShow
    },
    returnHome:function(){
      this.$router.push({name:'HomePage'})
    },
    getLandData(){
      this.$axios.get('/api/shuhistorytest/landmark/list').then(res => {
      this.lands = res;
      this.landmarks= this.lands.filter(function(v){
        return v.placeName == "上海大学宝山校区"  || v.placeName == "上海大学嘉定校区" ||v.placeName == "上海大学延长校区"
              ||v.title == "正式成立"
      })  
      console.log(this.lands)
    })
    },
    showTooltip(name){
      this.activeName=name 
    },
    clickActive(index){
      this.activeVar=index 
    },
    clickEvent(){
      this.activeName=""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
  background: url("..//assets//landmarkpage//background-star.png") no-repeat;
  overflow:hidden;
  height:100%;
  width:100%;
  display:flex;
  flex-direction: column;
  background-size:100% 100%;
  background-position: center center;
  background-attachment: fixed;
  z-index:-2;
}

.background2{
   position: fixed;
   opacity: 0.9;
   width: 100%;
   height: 100%;
   top:0;
   left: 0;
   z-index:0;
}

.header{
  width: 100%;
  height: 8%;
  z-index: 3;
}

.content{
  width: 100%;
  top:50px;
  height: 92%;
  margin: 0 auto;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
}
.map{
  height: 70%;
  width: 100%;
  margin: 0 auto;
  /* border:7px solid rgb(0, 0, 0,0.7);  */
  
}


.biao-swiper{
  width: 100%;
  height: 22%;
  bottom:70px;
  position: absolute;
  z-index:1;
  background-image:url("..//assets//landmarkpage//juxing@3x.png");
}

ul{
  height: 100%;
  white-space: nowrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.land-li{
    width: 106px;
    height: 80%;
    margin:2% 10px;
    line-height: 22%;
    list-style: none;
    display: inline-block;
}
</style>
