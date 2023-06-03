<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="text-container">
      <p>点击查看祝福</p>
    </div>
    <div class="star-container" >
      <svg :width="width" :height="height">
        <a :class="[ index % 10 == 0 ? 'font-big' : 'font-small']" v-for="(blesse, index) in blesses" :key="`blesse-${index}`">
          <text
            :id="blesse.id"
            :x="blesse.x"
            :y="blesse.y"
            :fill-opacity="(400 + blesse.z) / 600"
            @mousemove="listenerMove($event)"
            @mouseout="listenerOut($event)"
            @click="showCard(index)"
          >
            {{ blesse.text }}
          </text>
        </a>
      </svg>
    </div>
    <div class="btn-container">
      <router-link :to="{ name: 'BlessPage' }">
        <button>生成我的祝福</button>
      </router-link>
    </div>
    <van-config-provider :theme-vars="themeVars">
      <van-popup v-model:show="showBlessCard" :key="blessCardKey">
        <div style="width: 70vw; height: 40px; display: flex; align-items: center; justify-content: end;">
          <van-icon name="cross" color="#ffffff" v-on:click="closeCard"/>
        </div>
        <div class="card-container">
          <bless-card
            :show-distance="showDistance"
            :city="city"
            :distance="distance"
            :content="content"
            :role="role">
          </bless-card>
        </div>
        <div class="btn-save-container">
          <button>长按图片保存</button>
        </div> 
      </van-popup>
    </van-config-provider>
    <div class="bottom"></div>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader.vue'
// import StarCloud from '../../components/Message/StarCloud.vue';
export default {
  name: "MessagePage",
  components: { NavHeader },
  data() {
    return {
      moduleName: '云上祝福',
      width: 300, //svg宽度
      height: 300, //svg高度
      blessesNum: 0, //标签数量
      RADIUS: 150, //球的半径
      speedX: Math.PI / 360 / 1.5, //球一帧绕x轴旋转的角度
      speedY: Math.PI / 360 / 1.5, //球-帧绕y轴旋转的角度
      blesses: [],
      timer: null,
      themeVars: {
        popupBackgroundColor: "transparent",
        popupRoundBorderRadius: "20px"
      },
      blessList: [],
      blessListLength: 0,
      showDistance: "",
      city: "",
      distance: "",
      content: "",
      role: "",
      showBlessCard: false,
      blessCardKey: 0,
    };
  },
  computed: {
    CX() {
      //球心x坐标
      return this.width / 2;
    },
    CY() {
      //球心y坐标
      return this.height / 2;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      //初始化标签位置
      let blesses = [];
      this.blessesNum = 1000;
      for (let i = 0; i < 1000; i++) {
        let blesse = {};
        let k = -1 + (2 * (i + 1) - 1) / this.blessesNum;
        let a = Math.acos(k);
        let b = a * Math.sqrt(this.blessesNum * Math.PI); //计算标签相对于球心的角度
        blesse.text = '.';
        blesse.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b); //根据标签角度求出标签的x,y,z坐标
        blesse.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
        blesse.z = this.RADIUS * Math.cos(a);
        blesse.id = i; // 给标签添加id
        blesses.push(blesse);
        // console.log(blesse);
      }
      this.blesses = blesses; //让vue替我们完成视图更新
    },
    // 纵向旋转
    rotateX(angleX) {
      var cos = Math.cos(angleX);
      var sin = Math.sin(angleX);
      for (let blesse of this.blesses) {
        var y1 = (blesse.y - this.CY) * cos - blesse.z * sin + this.CY;
        var z1 = blesse.z * cos + (blesse.y - this.CY) * sin;
        blesse.y = y1;
        blesse.z = z1;
      }
    },
    // 横向旋转
    rotateY(angleY) {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (let blesse of this.blesses) {
        var x1 = (blesse.x - this.CX) * cos - blesse.z * sin + this.CX;
        var z1 = blesse.z * cos + (blesse.x - this.CX) * sin;
        blesse.x = x1;
        blesse.z = z1;
      }
    },
    // 运动函数
    runblesses() {
      if (typeof this.timer === "number") {
        clearInterval(this.timer);
        this.timer = null;
      }
      let timer = setInterval(() => {
        this.rotateX(this.speedX);
        this.rotateY(this.speedY);
      }, 17);
      this.timer = timer;
    },
    // 监听移入事件
    listenerMove(e) {
      if (e.target.id) {
        clearInterval(this.timer);
      }
    },
    // 监听移出事件
    listenerOut(e) {
      if (e.target.id) {
        this.runblesses();
      }
    },
    // 获得所有祝福
    getBlesses() {
      this.$axios.get(
        '/api/shuhistorytest/cloudbless/list',
      ).then(res => {
        this.blessList = res;
        this.blessListLength = res.length;
        // console.log(this.blessListLength);
      })
    },

    async getBless(index) {
      var length = this.blessListLength;
      var blessId = index % length + 1;
      await this.$axios.get(
        '/api/shuhistorytest/cloudbless/detail',
        {
          id: blessId
        }
      ).then(res => {
        // console.log(res);
        this.id = res.id;
        this.showDistance = res.show_distance;
        this.distance = res.distance;
        this.city = res.city;
        this.content = res.content;
        this.role = res.status;
      });
    },

    async showCard(index) {
      await this.getBless(index);
      this.blessCardKey += 1;
      this.showBlessCard = true;
    },

    closeCard() {
      this.showBlessCard = false;
      this.runblesses();
    }
  },
  mounted() {
    this.runblesses();
    this.getBlesses();
  },
}
</script>

<style scoped>
  #main {
    background-image: url("../../assets/messagepage/star-bg.png");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }

  .header{
    width: 100%;
    height: 8%;
    z-index: 3;
  }

  .text-container {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-container p {
    width: 120px;
    height: 30px;
    color: #ffffff;
    background: #D9D9D950;
    box-shadow: 2px 2px 6px 6px #D9D9D950;
    border-radius: 15px;
    font-size: 10pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .star-container {
    width: 100%;
    height: calc(92% - 380px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-container {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-container button {
    width: 200px;
    height: 40px;
    background: #708BA6;
    border: none;
    color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 2px #ffffff90;
    z-index: 999
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    aspect-ratio: 4/1;
    background-image: url("../../assets/messagepage/bottom.png");
    background-size: 100% 100%;
    z-index: 0
  }

  .font-small {
  fill: #ffffff;
  font-weight: bold;
  font-size: 6pt;
  text-shadow: 0 0 10px white;
}

.font-big {
  fill: #ffffff;
  font-weight: bold;
  font-size: 14pt;
  text-shadow: 0 0 10px white;
}

.fontA:hover {
  fill: #60cae9;
  cursor: pointer;
  font-size: 18pt;
}

.card-container {
  width: 70vw;
  aspect-ratio: 133 / 195;
}

.btn-save-container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-save-container button {
    width: 140px;
    height: 36px;
    background: #841B1C;
    border: none;
    color: #FFFFFF;
    font-size: 10pt;
    border-radius: 18px;
    z-index: 999
  }

</style>
