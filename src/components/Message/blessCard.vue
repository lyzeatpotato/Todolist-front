<template>
  <div style="width: 100%; height: 100%">
    <div style="width: 100%; height: 100%" ref="blessCard" v-if="!showImage">
      <div class="card-container" >
        <div class="img-bg" >
          <div class="content-container">
            <div class="logo-container">
              <div class="logo-img"></div>
            </div>
            <div class="badge-container">
              <div class="badge-img"></div>
            </div>
            <div class="bless-title">
              <div class="horizontal-center">来自</div>
              <div v-if="showDistance === 'false'" class="bless-text horizontal-center" style="margin: 4px 0px">{{city}}</div>
              <div v-if="showDistance === 'true'" class="all-center" style="margin: 4px 0px">
                <div style="float: left" class="bless-text">{{distance}}</div>
                <div style="float: left; font-size: 8pt; margin-left: 4px;">公里外</div>
              </div>
              <div class="horizontal-center">{{role}}的祝福</div>
            </div>
            <div class="bless-content">
              <div class="bless-text">{{content}}</div>
            </div>
            <div class="qr-code-container">
              <div class="qr-code"></div>
            </div>
            <div class="scan-text horizontal-center">扫描二维码</div>
            <div class="scan-text horizontal-center">为上大送祝福</div>
          </div>
        </div>
      </div> 
    </div>
    
    <div style="width: 100%; height: 100%" v-if="showImage">
      <img :src="imgUrl" style="width: 100%"/>
    </div> 
  </div>
  
</template>

<script>
  import html2canvas from 'html2canvas';

  export default {
    name: "BlessCard",
    props: {
      showDistance: String,
      city: String,
      distance: String,
      role: String,
      content: String,
    },
    data() {
      return {
        imgUrl: "",
        showImage: false,
      };
    },
    mounted() {
      html2canvas(this.$refs.blessCard, {
        backgroundColor: "transparent",
        scale: 10,
        dpi: 300,
      }).then(canvas => {
        // console.log(canvas);
        this.imgUrl = canvas.toDataURL();
        this.showImage = true;
      });
    },
  };
</script>
  
<style scoped>
  .card-container {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #A2CDF1;
  }

  .img-bg {
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 20px;
    background-image: url('../../assets/messagepage/bless-card-bg.png');
    background-size: 100% 100%;
  }

  .content-container {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: #ffffff50;
  }

  .logo-container {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }

  .logo-img {
    width: 130px;
    height: 46px;
    margin-left: 20px;
    background-image: url('../../assets/messagepage/card-logo.png');
    background-size: 100% 100%; 
  }

  .badge-container {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge-img {
    width: 40px;
    height: 50px;
    background-image: url('../../assets/messagepage/shu-badge.png');
    background-size: 100% 100%; 
  }

  .bless-title {
    height: 70px;
    color: #000000;
    font-size: 10pt;
  }

  .horizontal-center {
    display: flex;
    justify-content: center;
  }

  .all-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bless-text {
    color: #AF0E16;
    font-size: 12pt;
    text-align: center;
    font-weight: 600;
  }

  .bless-content {
    height: calc(100% - 330px);
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qr-code-container {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qr-code {
    width: 60px;
    height: 60px;
    background: #123456;
  }

  .scan-text {
    font-size: 8pt;
  }
</style>