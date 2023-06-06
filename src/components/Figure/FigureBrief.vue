<template>
  <div id="figb">
      <div class="namef"> 
       <!-- <img class="logo1" src="@/assets//figurepage//logo1.png" alt=""> -->
       <img class="logo2" src="@/assets//figurepage//sanjiao.png" alt="">
       <div class="figname">
           <h1>{{figurename}}</h1> 
           <h1>{{title}}</h1> 
       </div>
        </div>
      <div class="photof">
        <img :src="avatar" alt="">
        </div>
      <div class="introf">
        <p>{{story}}</p>
      </div>
      <div>
        <button class="btn-detail" @click="showDetail()">修改信息→</button>
      </div>
  </div>
</template>

<script>

export default {
  props:{
    figures:Object,
    index:Number
  },
  created(){
    const figure = this.figures[this.index]
    this.figurename = figure.name
    this.avatar=figure.avatar
    this.title =figure.title
    this.story=figure.story
    this.video=figure.video
    this.id=figure.id
    // console.log(this.figures[this.index])
    // console.log(this.index)
  },
  data(){
        return{
            figurename:"",
            title:"",
            avatar:"",
            story:"",
            video:"",
            id:""
        }
    },
   methods:{
    showDetail(){
        this.$emit("showDetail", this.id)
    }
   }
}
</script>

<style scoped>
#figb{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.namef{
    width: 100%;
    height: 24%;
    text-align:center;
}
.logo1{
    margin-top:8px;
    width:16%;
    height: 80%;
    opacity: 0.16;
}

.logo2{
    position:absolute;
    width:16px;
    height: 14px;
    top:18px;
    left: 48%;
}

.figname{
    position:absolute;
    width: 100%;
    top:52px;
    left: 50%; 
    transform: translate(-50%, -50%); 
}

.namef h1{
    font-size: 13px;   
    font-weight: 500; 
    color:#1F364E;
}
.photof{
    width: 40%;
    height: 48%;
    overflow: hidden;
}
.photof img{
    width: 100%;
    height: 100%;
}
.introf{
    margin-top: 20px;
    width: 80%;
    height: 20%;
}
.introf p{
    display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}

.btn-detail{
    background-color: transparent;
}
</style>