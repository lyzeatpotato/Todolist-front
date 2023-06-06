<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="content">
      <van-form @failed="onFailed">
        <van-cell-group inset>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field v-model="figurename" label="标题" name="pattern" placeholder="请给这件todo事情取个名字吧~"
            :rules="[{ pattern, message: '请输入正确内容' }]" />
          <van-field v-model="title" label="地点" name="pattern" placeholder="请写写我们将在哪里完成这件事~"
            :rules="[{ pattern, message: '请输入正确内容' }]" />
          <van-field v-model="story" label="描述" name="pattern" placeholder="请给这件事情留些想说的话吧~"
            :rules="[{ pattern, message: '请输入正确内容' }]" />
          <van-field name="uploader" label="上传图片">
            <template #input>
              <van-uploader v-model="fileList" reupload />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            确认修改To-Do事件
          </van-button>
        </div>
      </van-form>

    </div>

    <div class="bottom">
      <img class="imgb" src="..//assets//figurepage//bottom@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import { ref } from 'vue';

export default {
  name: 'FigurePage',
  components: { NavHeader },
  props: {
  },
  setup() {
    const fileList = ref([
    ]);

    return { fileList };
  },
  created() {
    this.figurename = this.$route.params.figurename
    this.title = this.$route.params.title
    this.avatar = this.$route.params.avatar
    this.introduction = this.$route.params.introduction
    this.story = this.$route.params.story
    console.log(this.fileList)

    // let obj = {
    //   content: `data:image/png;base64,${btoa(
    //     new Uint8Array(this.avatar).reduce(
    //       (data, byte) => data + String.fromCharCode(byte),
    //       '',
    //     ),
    //   )}`,
    //   sort: item.sort,
    // }
    this.fileList.push({url: this.avatar})

  },
  data() {
    return {
      isShow: false,
      figurename: "",
      title: "",
      avatar: "",
      introduction: "1",
      story: "1",
    };
  },
  computed: {
    introductionP() {
      let introductionP = this.introduction.split('\r\n');
      return introductionP;
    },
    storyP() {
      let storyP = this.story.split('\r\n');
      return storyP;
    }

  },
  methods: {
    shownav: function () {
      this.isShow = ~this.isShow
    },
    returnHome: function () {
      this.$router.push({ name: 'HomePage' })
    },
    returnFigure: function () {
      this.$router.push({ name: 'FigurePage' })
    },
  }
}
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
  margin: 0 auto;
  width: 88%;
  height: 100%;
  Border-radius: 10px;
  /* display: flex;
    justify-content:flex-end;
    align-items:flex-end; */
  background-color: white;
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
  color: #1E364E;
}

.title {
  margin-left: 8px;
  margin-top: 14px;
  width: 60%;
  height: 30px;
  color: #1E364E;
}

.icon {
  margin-top: 14px;
  height: 30px;
  color: #1E364E;
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
  display: none
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
  color: #1E364E;
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
}</style>