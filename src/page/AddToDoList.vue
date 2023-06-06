<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field v-model="value_title" label="标题" name="pattern" placeholder="请给这件todo事情取个名字吧~" />
          <van-field v-model="value_place" label="地点" name="pattern" placeholder="请写写我们将在哪里完成这件事~" />
          <van-field v-model="value_description" label="描述" name="pattern" placeholder="请给这件事情留些想说的话吧~" />
          <van-field name="uploader" label="上传图片">
            <template #input>
              <van-uploader v-model="value" :after-read="uploadFile" />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            添加To-Do事件
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
import NavHeader from "@/components/NavHeader.vue";
import { addToDoList } from "@/api/todolist.js"
import { ref } from 'vue';
import { Dialog } from 'vant';

export default {
  name: "AddToDoList",
  components: { NavHeader },
  setup() {
    const value = ref([
    ]);
    return { value };
  },
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
      value_title: "",    // 标题
      value_place: "",    // 地点
      value_description: ""   // 描述文字
    };
  },
  props: {},
  created() {
    this.$axios.get("figure/listspecial").then((res) => {
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
    // 当文件读取完成时执行after-read
    uploadFile(file) {
      console.log("当前文件已传输完成~");
      this.uploadfile = file;
    },
    // 新增todolist内容
    onSubmit() {
      Dialog.confirm({
        title: '提示',
        message: '确认提交吗？'
      }).then(() => {
        let formdata = new FormData();
        formdata.append("file", this.uploadfile);
        formdata.append("name", this.value_title);
        formdata.append("story", this.value_description);
        formdata.append("title", this.value_place);
        console.log(formdata);
        // let file_params = {
        //   file: this.uploadfile,
        //   name: this.value_title,
        //   story: this.value_description, 
        //   title: this.value_place
        // }
        addToDoList(formdata).then(res => {
          console.log(res);
        })
      }).catch(() => { });
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
    // 跳转至新增todolist页
    gotoAddTodo() {
      this.$router.push({
        name: 'AddToDoList'
      })
    }
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
