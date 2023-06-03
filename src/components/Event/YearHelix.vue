<template>
    <div id="container" ref="container1"></div>
    
</template>

<script>
import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import TWEEN from "@tweenjs/tween.js"

export default {
    name: 'YearHelix',
    components: {

    },
    props: ['yearlist'],
    data() {
        return {
            selectyear:null,
            table: this.yearlist,
            camera: null,
            scene: null,
            renderer: null,
            controls: null,
            objects: [],
            targets: { helix: [] },
            clock: null,
        }
    },

    watch: {
        yearlist() {
            this.table = this.yearlist;
            this.init()
            this.animate()
        }
    },

    methods: {
        threerender() {
            this.renderer.render(this.scene, this.camera);  // 场景和摄像机两个对象需要传入渲染器
        },

        swiperJump(index) {
            // console.log(index);
            var year = this.table[index];
            // console.log("Year:", year)
            this.selectyear = year
            this.$emit('selectYear',this.selectyear)
        },


        init() {
            // console.log("?????:", this.table)
            let container = document.getElementById('container')

            this.camera = new THREE.PerspectiveCamera(40, container.innerWidth / container.innerHeight, 1, 10000);  //摄像机决定能在场景中看到什么，可基于摄像机的角度来计算场景对象在浏览器中会渲染成什么样子
            this.camera.position.z = 3000;  //摄像机在z轴上的距离，也就是离我们屏幕的垂直距离

            this.scene = new THREE.Scene();  //场景对象是个容器，主要用于保存、跟踪所要渲染的物体和使用的光源。必须要有

            // table

            for (var i = 0; i < this.table.length; i += 1) {
                var that = this
                var element = document.createElement('div');
                element.id = i;
                element.className = 'element';
                if (this.table[i]['year'].substr(this.table[i]['year'].length-1,1) == "'") {
                    element.style.backgroundColor = 'rgba(50,205,50,' + (Math.random() * 0.5 + 0.25) + ')'
                } else {
                    element.style.backgroundColor = 'rgba(255,191,0,' + (Math.random() * 0.5 + 0.25) + ')'
                }
                element.addEventListener("click", function (event) {
                    that.swiperJump(event.currentTarget.id)
                })
                // element.addEventListener("click", function (event) {
                //     console.log(event.currentTarget)
                // })

                var number = document.createElement('div');
                number.className = 'number';
                number.textContent = i+1;
                element.appendChild(number);

                var symbol = document.createElement('div');
                symbol.className = 'symbol';
                // console.log("this.table",this.table);
                symbol.textContent = this.table[i]['year'];
                element.appendChild(symbol);

                var object1 = new CSS3DObject(element);
                object1.position.x = Math.random() * 4000 - 2000;
                object1.position.y = Math.random() * 4000 - 2000;
                object1.position.z = Math.random() * 4000 - 2000;
                this.scene.add(object1);
                this.objects.push(object1);

            }


            // helix

            var vector2 = new THREE.Vector3();

            for (var i3 = 0, l2 = this.objects.length; i3 < l2; i3++) {

                var phi2 = i3 * 0.4 + Math.PI;

                var object4 = new THREE.Object3D();

                object4.position.x = 500 * Math.sin(phi2);  //螺旋大小
                object4.position.y = - (i3 * 18) + 450;
                object4.position.z = 500 * Math.cos(phi2);

                vector2.x = object4.position.x * 2; //卡片朝向
                vector2.y = object4.position.y ;
                vector2.z = object4.position.z * 2;

                object4.lookAt(vector2);

                this.targets.helix.push(object4);

            }


            //

            this.renderer = new CSS3DRenderer();  //渲染器
            this.renderer.setSize(container.innerWidth, container.innerHeight); // 设置大小(宽，高)
            // this.renderer.domElement.style.position = 'absolute';
            // document.getElementById('container').appendChild(this.renderer.domElement);  //把渲染器中的dom元素对象添加到指定的div中，作为儿子元素
            container.appendChild(this.renderer.domElement);  //把渲染器中的dom元素对象添加到指定的div中，作为儿子元素
            //
            this.clock = new THREE.Clock()
            this.controls = new TrackballControls(this.camera, this.renderer.domElement);
            this.controls.rotateSpeed = 0.4;
            this.controls.minDistance = 500;
            this.controls.maxDistance = 6000;

            this.transform(this.targets.helix, 3000);

            // 页面的大小自适应

            // window.addEventListener('resize', this.onWindowResize(), false);  //监听浏览器的resize事件，并且通过回调函数来重写事件
            this.camera.aspect = container.clientWidth / container.clientHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(container.clientWidth, container.clientHeight)


        },

        animate() {
            this.renderer.render(this.scene, this.camera)
            const delta = this.clock.getDelta()
            TWEEN.update();
            this.controls.update(delta);

            requestAnimationFrame(this.animate);  // 可以使浏览器平滑高效的绘制


        },

        transform(targets, duration) {

            TWEEN.removeAll();

            for (var i = 0; i < this.objects.length; i++) {

                var object = this.objects[i];
                var target = targets[i];

                new TWEEN.Tween(object.position)
                    .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();

                new TWEEN.Tween(object.rotation)
                    .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();

            }

            new TWEEN.Tween(this)
                .to({}, duration * 2)
                .onUpdate(this.threerender())
                .start();

        },
    },

    created() {
        
    },

    // mounted() {
    //     this.init();
    //     this.animate()
    // }



}
</script>

<style>
#container {
    /* background-color: #000000; */
    /* margin: 0; */
    /* font-family: Helvetica, sans-serif; */
    overflow: hidden;
    height: 100%;
}

.element {
    width: 150px;
    height: 160px;
    box-shadow: 0px 0px 12px rgba(255, 191, 0, 0.845);
    border: 1px solid rgba(255, 131, 127, 0.25);
    text-align: center;
    cursor: default;
}

.element:hover {
    box-shadow: 0px 0px 12px rgba(255, 166, 0, 0.75);
    border: 1px solid rgba(255, 238, 127, 0.75);
}

.element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(255, 200, 127, 0.75);
}

.element .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 60px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
    text-shadow: 0 0 10px rgba(255, 230, 0, 0.95);
}

.element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
}

button {
    color: rgba(127, 255, 255, 0.75);
    background: transparent;
    outline: 1px solid rgba(127, 255, 255, 0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: rgba(0, 255, 255, 0.5);
}

button:active {
    color: #000000;
    background-color: rgba(0, 255, 255, 0.75);
}
</style>