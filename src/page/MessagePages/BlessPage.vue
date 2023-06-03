<template>
  <div id="main">
    <div class="header">
      <nav-header :moduleName="moduleName"></nav-header>
    </div>
    <div class="text-container">
      <p>我在</p>
      <div class="text-distance">{{distance}}</div>
      <p>公里外</p>
    </div>
    <div class="text-bless">——为上海大学送祝福——</div>
    <div class="blesses-container">
      <div 
        v-for="(bless, index) in blessList" v-bind:key="index"
        :class= "this.selectedBlessIndex === index ? 'bless-selected' : 'bless-unselected'"
        @click="selectBless(index)"
      >
        <text>{{bless}}</text>
      </div>
    </div>
    <div class="form-container">
      <div class="form-content-container">
        <van-radio-group v-model="roleChecked" direction="horizontal">
          <van-radio name="student" checked-color="#841B1C">
            <div class="form-text">在读学生</div>
          </van-radio>
          <van-radio name="graduate" checked-color="#841B1C">
            <div class="form-text">毕业校友</div>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="form-content-container">
        <van-radio-group v-model="locationChecked" direction="horizontal">
          <van-radio name="distance" checked-color="#841B1C">
            <div class="form-text">显示距离</div>
          </van-radio>
          <van-radio name="location" checked-color="#841B1C" style="color: #ffffff">
            <div class="form-text">显示位置</div>
          </van-radio>
        </van-radio-group> 
      </div>
    </div>
    <div class="btn-container">
      <button @click="uploadBless">送出祝福</button>
    </div>
    <van-config-provider :theme-vars="themeVars">
      <van-popup v-model:show="showBlessCard">
        <div style="width: 70vw; height: 40px; display: flex; align-items: center; justify-content: end;">
          <van-icon name="cross" color="#ffffff" v-on:click="closeCard"/>
        </div>
        <div class="card-container" >
          <bless-card
            :key="blessCardKey"
            :show-distance="showDistance.toString()"
            :city="city"
            :distance="distance.toString()"
            :content="blessList[selectedBlessIndex]"
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
  import BlessCard from "../../components/Message/blessCard.vue";

  export default {
    name: "BlessPage",
    components: { BlessCard, NavHeader },
    data() {
      return {
        moduleName: '云上祝福',
        shuLon: 121.393603,
        shuLat: 31.315929,
        distance: 0,
        city: "北京市",
        blessList: [
            "百年上大，自强不息。祝愿母校桃李芬芳、人才辈出、再创辉煌！",
            "溯源初心恰风华，百年传承再出发。百年之际，祝福母校更展宏图，再谱华章！！",
            "上善若水，海纳百川，大道明德，学用济世。祝愿上海大学越办越好！",
            "逐梦百年传薪火，踔厉奋发建新功。祝福母校砥砺奋进，再攀高峰！",
            "追忆往昔，岁月峥嵘，桃李满天，人才辈出。祝愿上海大学前景光明，再创辉煌，再谱华章！",
            "祝愿上海大学在世界大学行列中书写鲜明印记，在践行上海城市品格中彰显上大特质！",
            "建校百年之际，我想向您致以最真挚的祝福，祝愿您朝朝蓬勃，年年桃李，岁岁芬芳，生日快乐！",
            "时光荏苒，从岁月走来的上海大学，祝福你，我的上海大学，生日快乐！",
        ],
        selectedBlessIndex: 0,
        roleChecked: "student",
        role: "在校学生",
        gradeYear: "2022",
        locationChecked: "distance",
        showDistance: false,
        themeVars: {
          stepperButtonRoundThemeColor: "#841B1C",
          stepperInputWidth: "50px",
          stepperInputTextColor: "#ffffff",
          popupBackgroundColor: "transparent",
          popupRoundBorderRadius: "20px"
        },
        showBlessCard: false,
        blessCardKey: 0,
      };
    },
    methods: {
      async getPosition() {
        let mapObj = new window.AMap.Map('id')
        let geolocation;
        await mapObj.plugin(['AMap.Geolocation'], async () => {
          geolocation = await new window.AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          })
          await mapObj.addControl(geolocation);
          await geolocation.getCurrentPosition();
          window.AMap.event.addListener(geolocation, "complete", result => {
            // console.log(result);
            this.computeDistance(this.shuLon, this.shuLat, result.position.lng, result.position.lat);
          });
          geolocation.getCityInfo((status, result) => {   //只能获取当前用户所在城市和城市的经纬度
          // console.log(result);
          if (status == "complete") {
            this.city = result.city;
            // console.log(result.city);
          }
        })
        });
      },

      computeDistance(lonA, latA, lonB, latB) {
        var earthR = 6371000;
        var x = Math.cos(latA * Math.PI / 180.) * Math.cos(latB * Math.PI / 180.) * Math.cos((lonA - lonB) * Math.PI / 180);
        var y = Math.sin(latA * Math.PI / 180.) * Math.sin(latB * Math.PI / 180.);
        var s = x + y;
        if (s > 1) s = 1;
        if (s < -1) s = -1;
        var alpha = Math.acos(s);
        var distance = alpha * earthR / 1000; // 单位公里
        this.distance = distance.toFixed(2);
      },
    
      selectBless(index) {
        this.selectedBlessIndex = index;
      },

      uploadBless() {
        this.showDistance = this.locationChecked === 'distance' ? true : false;
        this.role = this.roleChecked === 'student' ? '在读学生' : '毕业校友';
        this.showBlessCard = true;
        this.addBless(this.city, this.blessList[this.selectedBlessIndex], this.distance, this.showDistance, this.role);
      },

      addBless(city, content, distance, showDistance, status) {
        this.$axios.get(
          '/api/shuhistorytest/cloudbless/addItem',
          {
            city: city,
            content: content,
            distance: distance,
            show_distance: showDistance,
            status: status
          }
        ).then(() => {
          this.blessCardKey += 1;
        });
      },

      closeCard() {
        this.showBlessCard = false;
      }
    },

    mounted() {
      this.getPosition();
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
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-container p {
    color: #ffffff;
    font-size: 10pt;
  }

  .text-container .text-distance {
    color: #841B1C;
    font-size: 18pt;
    font-weight: 600;
    margin: 0 10px;
  }

  .text-bless {
    width: 100%;
    height: 40px;
    color: #ffffff;
    font-size: 12pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blesses-container {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    height: calc(92% - 365px);
    overflow-y: scroll;
  }

  .form-container {
    width: calc(100% - 80px);
    height: 100px;
    margin: 10px 40px 10px 40px;
    padding: 10px 20px;
    background: #ffffff20;
    border-radius: 10px;
    color: #ffffff;
  }

  .form-content-container {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-text {
    width: 80px;
    text-align: left;
    color: #ffffff;
    font-size: 10pt;
  }

  .bless-selected {
    width: calc(100% - 60px);
    margin: 0 30px 10px 30px;
    font-size: 12pt;
    padding: 14px 20px;
    border-radius: 10px;
    background-image: url("../../assets/messagepage/bless-selected.png");
    background-size: 100% 100%;
    color: #ffffff;
    text-align: center;
  }

  .bless-unselected {
    width: calc(100% - 80px);
    margin: 0 40px 10px 40px;
    font-size: 12pt;
    padding: 14px 20px;
    border-radius: 10px;
    background-image: url("../../assets/messagepage/bless-unselected.png");
    background-size: 100% 100%;
    color: #ffffff;
    text-align: center;
  }

  .btn-container {
    width: 100%;
    height: 80px;
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
    z-index: 0;
  }

  .btn-save-container {
  width: 100%;
  height: 80px;
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

  .card-container {
    width: 70vw;
    aspect-ratio: 133 / 195;
  }

</style>
