<template>
  <div id="swiper">
    <!-- <img class="fig" v-show="activeIndex==index" v-for="(img,index) in figures" :src="img" :key="index" alt=""> -->
    <figure-brief class="fig" v-show="activeIndex==index" 
            v-for="(item,index) in figures"  
            :key="index" :figures="figures" :index="index"  @showDetail = "showDetail" >
    </figure-brief>
    <ul>
        <li v-for="(item,index) in figures" :key="index" :class="{active:index === activeIndex}"></li>
    </ul>
    <div class="allow">
        <img class="left" @click="left()" src="@/assets//figurepage//left@2x.png" alt="">
        <img class="right" @click="right()" src="@/assets//figurepage//right@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import FigureBrief from './FigureBrief.vue'
export default {
  components: { FigureBrief },
  props:{
    figures:Array,
  },
    data(){
        return{
            activeIndex:0,
            length:this.figures.length,
        }
    },
    mounted(){
        setInterval(()=>{
            if(++this.activeIndex >=this.figures.length)  this.activeIndex=0
        },2000)
    },
    methods:{
        left(){
             if(--this.activeIndex <0 ) this.activeIndex=0
        },
        right(){
            if(++this.activeIndex >=this.figures.length) this.activeIndex=0
        },    
        showDetail(id){
             this.$emit("showDetail", id)
        }
    }
}

</script>

<style scoped>
#swiper .fig{
    width:100%;
    height:90%;
}

#swiper ul{
    margin-top: 8px;
    display: flex;
    justify-content: center;
}
#swiper ul li{
    width: 8px;
    height: 8px;
    margin-left: 1%;
    border-radius: 5px;
    border: 1px solid #1F364E;
}
#swiper ul li.active{
    background-color: #1F364E;
}
.allow{
    top: 40%;
    width: 100%;
    height: 60px;
    position: absolute;
    display: flex;
    justify-content: space-between;
}
.allow .left{
    width: 30px;
    height: 60px;
    top:40%;
    
}
.allow .right{
    width: 30px;
    height: 60px;
    top:40%;

}
</style>