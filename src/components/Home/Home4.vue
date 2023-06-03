<template>
  <div id="home1">
      <img class="background2" src="@/assets//homepage//home4//background2@3x.png" alt="">
      <!-- <img class="background3" src="..//assets//homepage//home2//color@x.png" alt="">  -->
      <!-- <img class="shangdabainian" src="@/assets//homepage//home4//shangdabainian@3x.png" alt="">  -->
      <!-- <img  class="xiaohui" src="@/assets//homepage//home4//xiaohui@3x.png" alt=""> -->
      <div class="wrapper">
        <div class="block">
          <div>
            <img class="xiaohui" src="@/assets//homepage//label.png" alt="" />
            <p class="together">已经在一起</p>
            <p class="to-time">{{ countingDays(nowDate) }}</p>
          </div>
          <div style="margin: 5px;">
            <p class="time-counting">距离{{ countingTheme }}</p>
            <FlipDown
              :endDate="finishTime"
              @timeUp="compeleteTime"
              :type="4"
              :theme="1"
              :timeUnit="['天', '时', '分', '秒']"
              class="flip-down"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="icon4" @click="link1()">
          <img class="img1" src="@/assets//homepage//home4//1@3x.png" alt="">
          <p class="img2" style="color: #C8C6C9; font-family:'楷体'">携手足迹</p>
        </div>
        <div class="icon3" @click="link2()">
          <img class="img1" src="@/assets//homepage//home4//2@3x.png" alt="">
          <p class="img2" style="color: #C8C6C9; font-family:'楷体'">待做清单</p>
        </div>
        <!-- <div class="icon3" @click="link3()">
          <img class="img1" src="@/assets//homepage//home4//3@3x.png" alt="">
          <img class="img2" src="@/assets//homepage//home4//xiaoqingtouxiang@3x.png" alt="">
        </div>
        <div class="icon4" @click="link4()">
          <img class="img1" src="@/assets//homepage//home4//4@3x.png" alt="">
          <img class="img2" src="@/assets//homepage//home4//yunshangzhufu@3x.png" alt="">
        </div> -->
        <div class="icon5"  @click="link5()">
          <img class="img1" src="@/assets//homepage//home3//3@3x.png" alt="">
          <p class="img2" style="color: #C8C6C9; font-family:'楷体'">历史打卡</p>
        </div>
      </div>
      <div class="bottom">
        <img class="imgb" src="@/assets//homepage//home4//bottom@3x.png" alt="">
      </div> 
  </div>
</template>

<script>
import FlipDown from "vue-flip-down";
export default {
  name: "Home4",
  components: {
    FlipDown,
  },
  data() {
    return {
      countingTheme: "2023年暑假",
      finishTime: new Date("2023/7/12 00:00:00"),
      nowDate: new Date(),
      isShow: false,
    };
  },
  mounted() {
    // 显示时间1s1s的显示
    let that = this
    this.timer = setInterval(function () {
      that.nowDate = new Date().toLocaleString();
    })
  },
  methods: {
    shownav: function () {
      this.$emit("shownav");
    },
    countingDays() {
      //根据年 . 月 . 日的值创建Date对象
      let date1Obj = new Date();
      let date2 = "2023-03-23";
      let date2Str = date2.split("-");
      let date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2]);
      let t1 = date1Obj.getTime();
      let t2 = date2Obj.getTime();
      let timeold = t1 - t2; //总秒数
      let e_daysold = timeold / (24 * 60 * 60 * 1000);
      let daysold = Math.floor(e_daysold); //相差天数
      let e_hrsold = (e_daysold - daysold) * 24;
      let hrsold = Math.floor(e_hrsold); //相差小时数
      let e_minsold = (e_hrsold - hrsold) * 60;
      let minsold = Math.floor(e_minsold); //相差分钟数
      let seconds = Math.floor((e_minsold - minsold) * 60); //相差秒数
      return daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
    },
    link1(){
      console.log("点击icon1")
      this.$router.push({name:'LandmarkPage'})
    },
    link2(){
      console.log("点击icon2")
      this.$router.push({name:'FigurePage'})
    },
    link3(){
      console.log("点击icon3")
      this.$router.push({name:'portraitPage'})
    },
    link4(){
      console.log("点击icon4")
      this.$router.push({name:'MessagePage'})
    },
    link5(){
      console.log("点击icon5")
      this.$router.push({name:'EventPage'})
    }
  }
}
</script>

<style scoped>
#home1{
  background: url("~@/assets//homepage//home4//background1@3x.png") no-repeat;
  height:100%;
  width:100%;
  display:flex;
  flex-direction: column;
  background-size:100% 100%;
  background-position: center top;
  background-attachment: fixed;
}

.wrapper {
  position: fixed;
  width: 63.33%;
  height: 40%;
  top: 20%;
  left: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  width: 100%;
  height: 100%;
  font-size: 30px;
  text-align: center;
  padding: 5px 20px;
  border-radius: 1em;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
}
.together {
  font-size: 30px;
  font-weight: bold;
  color: #c8c6c9;
  font-family: "楷体";
}
.to-time {
  font-size: 20px;
  color: #c8c6c9;
  font-family: "楷体";
}
.time-counting {
  font-size: 23px;
  font-weight: bold;
  color: #c8c6c9;
  font-family: "楷体";
}
.shangdabainian{
   position: fixed;
   width: 78%;
   height: 51%;
   top:26%;
   left: 10%;

}

.xiaohui {
  position: fixed;
  width: 63.33%;
  height: 40%;
  top: 50%;
  left: 20%;
  z-index: -1;
}

.background2{
   position: fixed;
   width: 100%;
   height: 100%;
   top:0;
   left: 0;
   z-index:0;
}
/* .background3{
   position: fixed;
   opacity: 0.08;
   width: 78%;
   height: 52%;
    top:24%;
    left: 11%;
    z-index:2;
} */

.content{
  width: 100%;
  top:50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.icon1{
  width: 140px;
  height: 120px;
  position: fixed;
  top:50px;
  left: 1px;
}
.icon1 .img1{
   width: 140px;
   height: 120px;  
}
.icon1 .img2{
   width: 64px;
   height: 14px;
   position: fixed;
   top:122px;
   left: 38px;
}
.icon2{
  width: 140px;
  height: 120px;
  position: fixed;
  top:58px;
  right: -1px;
}
.icon2 .img1{
   width: 140px;
   height: 120px;  
}
.icon2 .img2{
   width: 64px;
   height: 14px;
   position: fixed;
   top:132px;
   right: 38px;
}
.icon4{
  width: 140px;
  height: 120px;
  position: fixed;
  bottom: 92px;
  left: 1px;
}
.icon4 .img1{
   width: 140px;
   height: 120px;  
}
.icon4 .img2{
   width: 64px;
   height: 14px;
   position: fixed;
   bottom: 122px;
   left: 38px;
}

.icon3{
  width: 140px;
  height: 120px;
  position: fixed;
  bottom: 74px;
  right: -1px;
}
.icon3 .img1{
   width: 140px;
   height: 120px;  
}
.icon3 .img2{
   width: 64px;
   height: 14px;
   position: fixed;
   bottom:104px;
   right: 38px;
}

.icon5{
  width: 140px;
  height: 120px;
  position: fixed;
  bottom: 170px;
  left: 120px;
}
.icon5 .img1{
   width: 140px;
   height: 120px;  
}
.icon5 .img2{
   width: 64px;
   height: 14px;
   position: fixed;
   bottom: 200px;
   left: 158px;
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