<template>
    <van-swipe class="mySwiper" indicator-color="white" v-if="show" ref="swiper" :initial-swipe="this.syear['id']">
        <van-swipe-item v-for="(item, index) in newdatalist" :key="index" class="swipercontent">
            <van-icon name="cross" class="close" @click="Close" />
            <div class="title">
                <p class="yeartext">{{ item.year }}月</p>
            </div>
            <!-- <br v-if="item.picture != null"> -->
            <div class="content">
                <div v-for="(contentitem, contentindex) in item.list" :key="contentindex" class="eachcontent">
                    <p class="monthtext">{{ contentitem.month }}日</p>
                    <p class="eventtext">{{ contentitem.event }}</p>
                    <div v-if="contentitem.picture != null" class="imgdiv">
                        <img class="eventimg" :src="contentitem.picture">
                        <p class="detail">{{ contentitem.pic_detail }}</p>
                    </div>
                </div>
            </div>

            <div class="bottom">
                <img class="sdbn" src="../../assets/homepage/shangdabainian.png" alt="">
            </div>
        </van-swipe-item>
    </van-swipe>


</template>
<script>
// import "./stylevant.css";
// import { Toast } from 'vant';

export default {
    data() {
        return {
            syear: this.selectyear,
            show: false,
            toastshow:true,
        }
    },

    props: ['newdatalist', 'selectyear'],

    methods: {
        Close() {
            this.show = false;
        }
    },

    watch: {
        selectyear() {
            this.syear = this.selectyear;
            this.show = true;
            // console.log(this.syear);
            this.count += 1
            if(this.toastshow == true){
                this.$toast({
                message: '可左右滑动切换月份',
            });
            }
            this.toastshow = false
        }

    },

    mounted() {


    },

    updated() {
        // console.log("Update:", this.syear["id"]);
        // if(this.show){
        //     this.$refs.swiper.swipeTo(this.syear["id"])
        // }

    },

};


</script>
  
<style scoped>
.mySwiper {
    width: 100%;
    height: 100%;
    /* display: flex; */
    align-items: center;
    justify-content: center;
}

.mySwiper .van-swipe-item {
    font-size: 14px;
    background: #fff;
    border-radius: 14px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    /* -webkit-justify-content: center; */
    /* justify-content: center; */
    -webkit-box-align: center;
    -ms-flex-align: center;
}

.swipercontent {
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.title {
    height: 10%;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.title .yeartext {
    font-size: x-large;
    font-weight: bold;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #3b73ed);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.monthtext {
    padding-top: 10px;
    text-align: center;
    font-weight: bolder;
    font-size: large;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #3b73ed);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.title::after {
    content: "";
    display: block;
    position: absolute;
    width: 10%;
    height: 3px;
    left: 45%;
    align-items: center;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #3b73ed);
    ;
}

.content {
    height: 70%;
    margin: 0px 20px;
    overflow-y: auto;
    overflow-x: hidden;
}

.eachcontent {
    padding: 10px 0;
}

.content .eventtext {
    text-indent: 2em;
    padding: 0 20px;
    color: #565656;
    font-size: 15px;
    line-height: 25px;
}

.imgdiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.eventimg {
    position: relative;
    width: 26.667vw;
    /* height: 100%; */
}

.detail {
    position: relative;
    font-size: small;
    font-weight: lighter;

}

.bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin: 15px 0;
    padding-bottom: 25px;
    align-items: center;
    justify-content: center;
}

.bottom .sdbn {
    position: absolute;
    width: 140px;
    height: 160px;
    right: 10px;
    bottom: 1vh;
    z-index: 0;
}

.close {
    left: 3px;
    top: 3px;
    font-size: large;
    position: absolute;
    color: rgb(119, 60, 120);
}
</style>