<template>
    <div id="baoshan" ref="baoshan">
    </div>
    <!-- <div id="tooltip" v-if="showbs">
            <img style = "width:120px; height:80px; margin-left:72px;" src='@//assets//landmarkpage//juxing@3x.png'>
            <h1 style="text-align:center;font-size:10px;font-weight:bold">上海大学图书馆</h1>
            <p style="display: inline-block; white-space:normal; word-break:break-all; font-size:10px">图书馆是宝山校区的标志性建筑之一。在结构上强调通用性，采用大开间、大空间、统一格网、统一层高、统一荷载的设计格局。在功能上设置计算机互联网络加强馆际和国际间的信息交流，符合现代化、信息化要求</p>
        </div>> -->
  </template>

  <script>
import AMapLoader from '@amap/amap-jsapi-loader';
// import { shallowRef } from '@vue/reactivity';


export default {
    // setup(){
    //     const map = shallowRef(null);
    //     return{ map, }
    //  },
      mounted() {
        this.initMap();
        this.$refs.baoshan.addEventListener('click',this.clickEvent);
      },
      created(){
        this.getLandData();
      },
      watch:{
      },
      props:{
        lands:Array,
      },
      data(){
        return{
            showbs:false,
            map:null,
            center:[],
            dataLocation:[],  
        }   
      },
      methods:{
        // getLandData(){
        //  this.$axios.get('/api/shuhistorytest/landmark/list').then(res => {
        //     this.lands = res;
        //     this.setCenter();
        //     this.convertData("上海大学伟长楼")
        //     this.convertData("上海大学图书馆")
        //     this.convertData("上海大学体育中心")
        //   })
        // },
        getLandData(){
            this.setCenter();
            this.convertData("上海大学伟长楼")
            this.convertData("上海大学图书馆")
            this.convertData("上海大学体育中心")
        },
        setCenter(){
          let mark = this.lands.find(v => {return v.placeName == "上海大学宝山校区"})
          this.center=mark.longitudeLatitude.split(",");
          console.log(this.center)
        },
        convertData(markName){
            let mark = this.lands.find(v => {return v.placeName == markName})
            let mark_loc = {
                name:mark.placeName,
                value:mark.longitudeLatitude.split(","),
                eventDes:mark.eventContent,
                picture:mark.picture}
            this.dataLocation.push(mark_loc)
        },
        clickEvent(){
      this.activeName=""
       },
        initMap(){
            AMapLoader.load({
                key:"86daf4ec6d0d154dfd19941e38d76f43",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins:['AMap.Scale'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{
                this.map = new AMap.Map("baoshan",{  //设置地图容器id
                    viewMode:"2D",    //是否为3D地图模式
                    zoom:15,           //初始化地图级别 
                    mapStyle: 'amap://styles/fresh',
                    //center:[121.39400,31.31700], //初始化地图中心点位置
                    center:this.center,
                });
                for(let item of this.dataLocation){
                    let marker = new AMap.Marker({ 
                        title:item.name,
                        position:item.value,
                        map: this.map
                    });
                    let info = this.createInfoWindow(item)
                    //鼠标点击marker弹出自定义的信息窗体
                    marker.on('click', function () {
                        var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -25)});
                        infoWindow.setContent(info);
                        console.log(marker)
                        infoWindow.open(marker.getMap(), marker.getPosition());
                    });


                }   
            }).catch(e=>{
                console.log(e);
            })
        },
        createInfoWindow(data){
            var html = '<div style=" width:220px;">';
            html +='<img style = "width:120px; height:70px; margin-left:24%;" src="'+data.picture +  '">'
            html += '<h1 style="text-align:center;font-size:10px;font-weight:bold">'+data.name+'</h1>'
            html += '<p style="display: inline-block; white-space:normal; word-break:break-all; font-size:10px">'+data.eventDes+'</p>'
            html +="</div>"
            return html
        },
         //关闭信息窗体
        closeInfoWindow() {
         this.map.clearInfoWindow();
        }
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