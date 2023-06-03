<template>
    <div id="baoshan">
    </div>
  </template>

  <script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
export default {
    setup(){
    const map = shallowRef(null);
        return{ map, }
     },
      mounted() {
            this.initMap();
      },
      watch:{
      },
      props:{

      },
      data(){
        return{
        }   
      },
      methods:{
        initMap(){
            AMapLoader.load({
                key:"86daf4ec6d0d154dfd19941e38d76f43",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins:['AMap.Scale'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{
                this.map = new AMap.Map("baoshan",{  //设置地图容器id
                    viewMode:"2D",    //是否为3D地图模式
                    zoom:16,           //初始化地图级别 
                    mapStyle: 'amap://styles/fresh',

                    center:[121.457689,31.275837], //初始化地图中心点位置
                });
                let positionArr = [
    
                ];
                for(let item of positionArr){
                    let marker = new AMap.Marker({ 
                        position:[item[0],item[1]],
                    });
                    this.map.add(marker);
                }

            }).catch(e=>{
                console.log(e);
            })
        },
    },
}
  </script>
  
  <style scoped>
  #baoshan {
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }
  </style>