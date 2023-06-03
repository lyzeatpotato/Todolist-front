<template>
    <div id="map" ref="landmap">
    </div>
  </template>
  
  <script>
  import SH from "/public/shanghai1.js" 
  import * as echarts from "echarts";

  export default {
      mounted() {
        this.getLandData()
        window.deleteicon=this.deleteicon
      },
      watch:{},
      props:{
        activeName:String,
      },
      data(){
        return{
            lands:[],
            myChart:Object,
            distributionOptions:'',
            dataLocation:[],  
            SHData :[
                [{name:'上海科学技术大学'},{name:'新上海大学'}],
                [{name:'上海工业大学'},{name:'新上海大学'}],
                [{name:'原上海大学'},{name:'新上海大学'}],
                [{name:'上海科技高等专科学校'},{name:'新上海大学'}],
            ],
            geoCoordMap :{
                '新上海大学': [121.39903,31.32144],
                '上海科学技术大学': [121.253724,31.383561],
                '上海工业大学': [121.464564,31.280055],
                "原上海大学":[121.459601,31.238901],
                "上海科技高等专科学校":[121.263447,31.391826],
            },
            planePath : 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
        }   
      },
      methods:{
        deleteicon(e){
            console.log("shanchuicon")
            e.parentNode.parentNode.style.display = 'none'
        },
        getLandData(){
         this.$axios.get('/api/shuhistorytest/landmark/list').then(res => {
            this.lands = res;
            this.convertData2("上海大学宝山校区")
            this.convertData2("上海科学技术大学")
            this.convertData2("上海工业大学")
            this.convertData2("原上海大学")
            this.convertData2("上海科技高等专科学校")
            this.convertData2("上海大学嘉定校区")
            this.convertData2("上海大学延长校区")
            this.createLine(this.loca());
          })
        },
        convertData2(markName){
            let mark = this.lands.find(v => {return v.placeName == markName})
            let mark_loc = {
                name:mark.placeName,
                value:mark.longitudeLatitude.split(","),
                eventDes:mark.eventContent,
                picture:mark.picture}
            this.dataLocation.push(mark_loc)
        },

        loca(){
                let  series=[];
                [['上海',this.SHData]].forEach((item) =>{
                    console.log(item[1]);//得到上海数组
                   series.push(
                        {
                            type: 'lines',
                            zlevel: 2,
                            symbol: ['none', 'none'],//线两端的标记类型，可以是一个数组分别指定两端
                            symbolSize: 14,



                            effect: {
                                show: true,
                                period: 4,
                                trailLength: 0,
                                symbol: this.planePath,
                                symbolSize: 4
                            },
                            lineStyle: {
                                color: '#46bee9',
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.2
                            },
                            tooltip: {        // 提示框组件
                                show: false,     // 显示提示框组件
                                trigger: "item",     // 触发类型
                                triggerOn: "none",  // 触发条件
                            },
                            data: this.convertData(item[1])
                        },
                
                        {
                            type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
                            coordinateSystem: 'geo',//该系列使用的坐标系
                            // zlevel: 2,
                            rippleEffect: {//涟漪特效相关配置
                                brushType: 'stroke'
                            },
                            label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                                show: true,
                                position: 'right',
                                formatter: '{b}',
                            },
                            symbolSize:12,
                            itemStyle: {
                                color:  '#46bee9',
                            },
                            tooltip: {        // 提示框组件
                                show: false,     // 显示提示框组件
                                trigger: "item",     // 触发类型
                                triggerOn: "none",  // 触发条件
                            },
                            data: item[1].map((dataItem)=> {
                                return {
                                    name: dataItem[1].name,
                                    value: this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                };
                            })
                        },
                        {
                            type: "scatter", //配置显示方式为用户自定义
                            coordinateSystem: "geo",
                            symbol:"pin",
                            symbolSize: [20, 20],
                             // 标志的样式
                            itemStyle: {
                                normal: {
                                    color: "#861A1E",
                                    shadowBlur: 2,
                                    shadowColor: "#FF0A22",
                                },
                            },                            
                            tooltip: {        // 提示框组件
                                show: true,     // 显示提示框组件
                                trigger: "item",     // 触发类型
                                triggerOn: "click",  // 触发条件
                                position:'bottom',
                                enterable: true,
                                borderColor: "white", 
                                formatter: (params) => {	
                                    console.log( params)
                                    var html = '<div style="width:260px; ">';
                                    html +='<button style = "width:20px; height:20px; position:fixed; top:0px; right:0px; font-size:20px; font-weight:bold;" onclick="deleteicon(this)">×</button>'
                                    html +='<img style = "width:120px; height:70px; margin-left:72px;" src="'+params.data.picture +  '">'
                                    html += '<h1 style="text-align:center;font-size:10px;font-weight:bold">'+params.data.name+'</h1>'
                                    html += '<p style="display: inline-block; white-space:normal; word-break:break-all; font-size:10px">'+params.data.eventDes+'</p>'
                                    html +="</div>"
                                    return html
                                }
                            },
                            data: this.dataLocation
                }
                      );
                });
                return series;
            },
        convertData(data) {
            var res = [];
            //console.log(data.length);长度为10
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = this.geoCoordMap[dataItem[0].name];//始发地
                var toCoord = this.geoCoordMap[dataItem[1].name];//目的地
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],//一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
                    });
                }
            }
            return res;
        },
        createLine(seriesData){
            echarts.registerMap("shanghai", SH);
            this.myChart = echarts.init(document.getElementById('map'));
            // console.log(this.myChart)
            this.myChart.setOption({
                backgroundColor: "rgb(0, 0, 0,0.1)",
                geo:{//地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
                    map: 'shanghai',//配置上海地图
                    roam:true,//是否开启鼠标缩放和平移漫游
                    layoutCenter: ["50%", "50%"], //设置后left/right/top/bottom等属性无效
                    layoutSize: "96%",
                    itemStyle:{
                        areaColor: 'rgb(12, 55, 89,0.6)',//设置区域颜色
                        borderColor: '#624C66',//设置各各省市边界颜色
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                        shadowBlur: 2,
                    },         
                    label:{
                        show:true,//是否显示标签
                        textStyle: {
                            color: "rgb(249, 249, 249)"
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        },
                        itemStyle: {
                            areaColor: 'rgb(43, 145, 183,0.6)',
                            borderWidth: 0
                        }
                    },
                    regions: [{
                        name: '静安区', //区块名称
                        itemStyle: {
                            normal: {areaColor: 'rgb(104, 53, 70,0.5)'}
                        }
                    },{
                        name: '普陀区', //区块名称
                        itemStyle: {
                            normal: { areaColor: 'rgb(0, 151, 167,0.5)' }
                        }
                    },{
                        name: '虹口区',
                        itemStyle: {normal: {areaColor: 'rgb(85, 139, 47,0.5)'}}
                    },{
                        name: '宝山区', 
                        itemStyle: {normal: {areaColor: 'rgb(186, 149, 94,0.5)'} }
                    },{
                        name: '嘉定区', //区块名称
                        itemStyle: {normal: {areaColor: 'rgb(83, 113, 163,0.5)'}}
                    }],
                },
                tooltip: {
                },
                series: seriesData
            })      
        },
      }
  }
  </script>
  
  <style scoped>
  #map {
      width: 100%;
      height: 100%;
  }
  </style>