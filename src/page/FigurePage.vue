<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="content">
      <swiper-figure class="figcomponent" :figures="figures" @showDetail="showDetail"></swiper-figure>
      <div class="figure">
        <img class="shangdabainian" src="..//assets//homepage//shangdabainian.png" alt="">
      </div>
    </div>
    <div class="bottom">
      <div class="button">
        <van-button plain hairline round type="primary" @click="gotoAddTodo">添加To-Do事件</van-button>
      </div>
      <img class="imgb" src="..//assets//figurepage//bottom@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import SwiperFigure from '../components/Figure/SwiperFigure.vue';
export default {
  name: 'FigurePage',
  components: {
    NavHeader,
    SwiperFigure,
  },
  props: {
  },
  data() {
    return {
      isShow: false,
      moduleName: "待做清单",
      figures: [],
      detailId: 1
    };
  },
  created: function () {
    this.$axios.get('/figure/list').then(res => {
      console.log(res);
      this.figures = res;
    })
  },
  methods: {
    shownav: function () {
      this.isShow = ~this.isShow
    },
    returnHome: function () {
      this.$router.push({ name: 'HomePage' })
    },
    showDetail(id) {
      this.detailId = id;
      let figure = this.figures.find(v => { return v.id == id })
      console.log(figure)
      this.$router.push({
        name: 'FigureDetail',
        params: {
          figurename: figure.name,
          title: figure.title,
          avatar: figure.avatar,
          introduction: figure.introduction,
          story: figure.story,
          video: figure.video,
        }
      })
    },
    gotoToDoListOpera() {
      // this.$notify({
      //   message: '功能暂未实现',
      //   duration: 1000,
      //   background: '#1989fa'
      // });
      this.$router.push({
        name: 'FigureDetail'
      })
    },
    // 跳转至新增todolist页
    gotoAddTodo() {
      this.$router.push({
        name: 'AddToDoList'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  background: url("..//assets//figurepage//background@2x.png") no-repeat;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  top: 50px;
  height: 78%;
  margin: 0 auto;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
}


.figure {
  position: relative;
  top: 12%;
  margin: 0 auto;
  width: 89%;
  height: 84%;
  Border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
}

.figcomponent {
  top: 18%;
  left: 2px;
  width: 100%;
  height: 64%;
  position: absolute;
  z-index: 2;
}

.shangdabainian {
  width: 140px;
  height: 160px;
  /* position: absolute;
   top:62%;
   right: 0; */

}

.button {
  text-align: center;
}

.bottom {
  width: 100%;
  height: 14%;
  bottom: 0;
}

.bottom .imgb {
  width: 100%;
  height: 100%;
}
</style>
