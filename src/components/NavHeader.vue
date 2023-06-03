<template>
      <div class="header">
        <img @click="returnHome" src="..//assets//homepage//pp8@2x.png">
        <p>{{moduleName}}</p>
        <button @click="shownav"></button>
      </div>
    <nav-link v-if="isShow"/>
</template>

<script>
import NavLink from './NavLink.vue'
export default {
    components:{NavLink},
    props:{
      moduleName:String
    },
    data() {
      return {
        isShow:false,
      };
  },
    methods:{
        shownav:function(){
            this.isShow=~ this.isShow
        },
        returnHome:function(){
            this.$router.push({name:'HomePage'})
        },
    }
}
</script>

<style scoped>

.header{
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
}

.header img{
    width: 40%;
    height: 70%;
    margin: 9px 0 0 5px
}


.header p{
    display: block;
    width: 40%;
    height: 52%;
    font-size: 20px;
    color: #841D22;
    Font-weight:550;
    margin: 12px 0 0 20px
}

.header button{
    width: 10%;
    height: 52%;
    background: url("..//assets//homepage//button-icon.png") no-repeat;
    background-size:100% 100%;
    float: right;
    margin: 12px 5px auto;
}
</style>