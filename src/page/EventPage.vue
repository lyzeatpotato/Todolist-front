<template>
  <div id="main">
    <StarsBackground></StarsBackground>
    <div class="header">
        <img @click="returnHome" src="..//assets//homepage//pp8@2x.png">
        <p>{{moduleName}}</p>
        <button @click="shownav"></button>
      </div>
    <YearHelix :yearlist="yearlist" @selectYear="selectYear" class="yearhelix"></YearHelix>
    <transition name="van-fade">
      <EventSwiperVant class="eventswiper" :newdatalist="newdatalist" :selectyear="selectyear"></EventSwiperVant>
    </transition>
  
    <img class="imgb" src="..//assets//figurepage//bottom@2x.png" alt="">
    <!-- <div v-show="isChange">{{this.selectyear["id"]}}</div> -->
    <nav-link v-if="isShow" class="navlink" />
  </div>
</template>

<script>
import YearHelix from '../components/Event/YearHelix.vue';
import StarsBackground from '../components/Event/StarsBackground.vue'
import EventSwiperVant from '../components/Event/EventSwiperVant.vue'


export default {
  name: 'EventPage',
  components: {
    EventSwiperVant,
    StarsBackground,
    YearHelix
  },
  data() {
    return {
      moduleName:"历史打卡",
      datalist: [],
      newdatalist: [],
      yearlist: [],
      isShow: false,
      starsnum: 800,
      distance: 800,
      selectyear: { id: null, year: null, list: [] }
    }
  },
  methods: {
    shownav:function(){
      this.isShow=~ this.isShow
    },
    selectYear(content) {
      this.selectyear = content //{id,year,list}
    },

    showNav() {
      this.isShow = ~this.isShow
      console.log("点击导航栏")
    },
    returnHome:function(){
      this.$router.push({name:'HomePage'})
    },
    initStars() {
      let starArr = this.$refs.star // ref 可获取dom
      starArr.forEach(item => {
        let speed = 0.2 + (Math.random() * 1)
        let thisDistance = this.distance + (Math.random() * 300)
        // console.log(speed,thisDistance)
        item.style.transformOrigin = `0 0 ${thisDistance}px`
        item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed}, ${speed})`
      })
    },


    changeData(datalist) {
      const newdatalist1 = datalist.map((item, index) => {
        index
        item.list = []
        return item
      })
      // this.newdatalist = newdatalist1
      for (var item2 of newdatalist1) {
        const selectlist = this.datalist.filter(item3 => {
          return item3["year"] == item2.year
        })
        item2.list = selectlist
      }
      // console.log("hhh:",newdatalist1)
      this.newdatalist = newdatalist1
    },
  },

  watch: {

  },


  created() {
    this.$axios.get('/api/shuhistorytest/memorabilia/list').then(res => {
      console.log(res)
      this.datalist = res
      var ylist = []
      var ylist_else = []
      for (var item of this.datalist) {
        if (item.school == "2023") {
          ylist.push(item["year"])
        } else {
          ylist_else.push(item["year"])
        }
      }
      ylist = [...new Set(ylist)]
      ylist_else = [...new Set(ylist_else)]
      var yearlist1 = []
      ylist.forEach(function (i, index, self) {
        self
        var ydict = {}
        ydict["id"] = index
        ydict["year"] = i
        yearlist1.push(ydict)
      })
      ylist_else.forEach(function (i, index, self) {
        self
        var yelsedict = {}
        yelsedict["id"] = index
        yelsedict["year"] = i + "'"
        yearlist1.push(yelsedict)
      })
      this.yearlist = yearlist1
      console.log(ylist)
      console.log(this.yearlist)
      this.changeData(this.yearlist)
    })
  },

  mounted() {
    this.$toast({
      message: '点击年份，查看详情',
    });

  }


}

</script>

<style scoped>
#main {
  /* background: url("../assets/eventpage/图层\ 17@2x.png"); */
  /* background-color: #000000;
  overflow: hidden;  */
  height: 100%;
  width: 100%;
  display: flex;
  position: fixed;
  flex-direction: column;
  background-size: 100% 100%;
  background-position: center top;
  background-attachment: fixed;
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
  background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
  overflow: hidden;
}

/* .starsbackground {
  height: 100%;
  width: 100%;
} */

.header {
  width: 100%;
  height: 8%;
  background: white;
  display: flex;
}

.header img {
  width: 40%;
  height: 70%;
  margin: 9px 0 0 5px
}


.header p {
  display: block;
  width: 36%;
  height: 52%;
  font-size: 17px;
  ;
  color: #841D22;
  Font-weight: 550;
  margin: 14px 0 0 20px
}

.header button {
  width: 9%;
  height: 52%;
  background: url("..//assets//homepage//button-icon.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  margin: 12px 5px auto;
}

.selectTab {
  height: 100%;
}
:deep .van-tabs__content {
  height: 90%;
}

:deep(.van-tab__panel) {
  height: 100%
}

.content {
  height: 90%;
  width: 100%;
}

.eventswiper {
  /* top: 30px; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  position: absolute;
  height: 70%;
  width: 80%;
  left: 10vw;
  top: 20vh;
  border-radius: 14px;
}

.yearhelix {
  /* height: 40% !important; */
}

.navlink {
  z-index: 999;
}

.imgb {
  height: 15vh;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.toastStyle {
  /* position: absolute !important;
  top: 100px !important; 
  left: 100px !important; */
}
</style>

