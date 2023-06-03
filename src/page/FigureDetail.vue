<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="content">
      <div class="figure">
        <div class="table-box">
          <van-row class="th-row">
            <van-col
              :span="24 / dataList.title.length"
              v-for="warn in dataList.title"
              :key="warn"
            >
              {{ warn }}
            </van-col>
          </van-row>
          <van-row
            class="tb-row"
            v-for="(wb, index) in dataList.tbData"
            :key="index"
            :style="{ background: index % 2 === 0 ? '#fff' : '#F4F9FE' }"
          >
            <van-col>{{wb.name}}</van-col>
            <van-col>{{wb.story}}</van-col>
          </van-row>
        </div>

        <!-- 弹出省略的内容 -->
        <van-popup v-model="showPopup" class="hidden-wrap">
          <van-row class="hidden-content">{{ ellContent }}</van-row>
        </van-popup>
      </div>
    </div>

    <div class="bottom">
      <img class="imgb" src="..//assets//figurepage//bottom@2x.png" alt="" />
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";

export default {
  name: "FigurePage",
  components: { NavHeader },
  data() {
    return {
      showPopup: false, // 显示省略的内容
      ellContent: "", // 省略的内容
      costName: "",
      dataList: {
        title: ["事件", "描述", "状态"],
        tbData: [
          { depart: "皇城司", name: "千帆", age: "23" },
          { depart: "商铺", name: "池衙内", age: "45" },
          { depart: "琵琶行", name: "引章", age: "12" },
        ],
      },
    };
  },
  props: {},
  created() {
    this.$axios.get("/api/shuhistorytest/figure/listspecial").then((res) => {
      console.log(res);
      this.dataList.tbData = res;
    });
  },
  computed: {
    introductionP() {
      let introductionP = this.introduction.split("\r\n");
      return introductionP;
    },
    storyP() {
      let storyP = this.story.split("\r\n");
      return storyP;
    },
  },
  methods: {
    shownav: function () {
      this.isShow = ~this.isShow;
    },
    returnHome: function () {
      this.$router.push({ name: "HomePage" });
    },
    returnFigure: function () {
      this.$router.push({ name: "FigurePage" });
    },
    // 显示省略的内容
    showContent(content) {
      if (content == "") {
        return;
      } else {
        this.ellContent = content;
        this.showPopup = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url("..//assets//figurepage//background@2x.png") no-repeat;
  background-size: 100% 100%;
  background-position: center top;
  background-attachment: fixed;
}

.header {
  width: 100%;
  height: 8%;
  z-index: 3;
}

.content {
  width: 100%;
  margin: 0 auto;
  padding-top: 36px;
  height: 80%;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
}

.figure {
  position: relative;
  top: 5%;
  margin: 0 auto;
  width: 89%;
  height: 90%;
  max-height: 440px;
  overflow: scroll;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
}

.table-box {
  margin: 12px 0px;
}
.th-row {
  height: 56px;
  line-height: 56px;
  background: #ebf1f7;
  padding: 0px 12px;
}
.tb-row {
  height: 56px;
  line-height: 56px;
  padding: 0px 12px;
}
.hidden-wrap {
  width: 66vw;
  text-align: start;
  border-radius: 10px;
}
.hidden-content {
  padding: 20px;
  word-break: break-all;
  overflow: hidden;
}

.shangdabainian {
  width: 140px;
  height: 160px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
}

.fig-header {
  /* background-color: pink; */
  width: 100%;
  height: 7%;
  margin-bottom: 6px;
  display: flex;
}

.photo {
  margin-left: 2%;
  margin-top: 4px;
  width: 16%;
  height: 44px;
}
.fig-header img {
  width: 100%;
  height: 100%;
  border-radius: 40px;
}
.name {
  margin-left: 4px;
  margin-top: 14px;
  width: 18%;
  height: 30px;
  color: #1e364e;
}
.title {
  margin-left: 8px;
  margin-top: 14px;
  width: 60%;
  height: 30px;
  color: #1e364e;
}

.icon {
  margin-top: 14px;
  height: 30px;
  color: #1e364e;
}
.return {
  margin-left: 4%;
  margin-top: 16px;
  width: 6%;
  height: 30px;
}
.return button {
  width: 80%;
  height: 14px;
  float: right;
  margin-right: 16px;
  background: url("..//assets//figurepage//delete@3x.png") no-repeat;
  background-size: 100% 100%;
}
.fig-content {
  width: 100%;
  height: 90%;
  margin-top: 16px;
}
.video-content {
  width: 80%;
  height: 32%;
  margin: 0 auto;
}
#video {
  width: 100%;
  height: 100%;
}
.ziti-content {
  position: absolute;
  height: 58%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
  /* white-space: pre-line; */
}
.ziti-content::-webkit-scrollbar {
  display: none;
}

.intro-title {
  display: flex;
  margin-top: 6px;
}

.story-title {
  display: flex;
  margin-top: 6px;
}
.ziti-content h1 {
  color: #1e364e;
  font-family: 华文楷体;
  margin-left: 8px;
  font-size: 18px;
}
.ziti-content p {
  margin: 3px 7%;
  font-size: 14px;
  text-indent: 2em;
}

.bottom {
  width: 100%;
  height: 12%;
  bottom: 0;
}
.bottom .imgb {
  width: 100%;
  height: 100%;
}
</style>
