<template>
    <li>
        <img :src=picPath  :class="{'activeCss':activeVar==index}" alt="" @click="clickActive()">
        <p>{{title}}</p>
    </li>
</template>

<script>
export default {
  props:{
    landmarks:Object,
    index:Number,
    activeVar:Number
  },
created(){
    let land = this.landmarks.find(v => {return v.id == this.index})
    if(land.placeName=="上海大学") {this.title = "新上海大学"}
    else{this.title=land.placeName}
    this.picPath = land.picture,
    this.id = land.id
},
data(){
    return{
        picPath:"",
        title:"",
        id:0
    }
},
methods:{
  clickActive(){
    this.$emit("clickActive", this.id)
  }
}
}
</script>

<style scoped>
li{
    display: block;
    margin-bottom: 10px;
}

li img{
  height: 80%;
  width: 100%; 
}

.activeCss{
  height: 80%;
  width: 100%;
  border: 2px red solid;
  margin-bottom: 8px; 
}

li p{
  margin-top:8px ;
  color: white;
  font-size: 12px;
  text-align: center;
};

</style>