<style scoped>

</style>

<template>
  <div ref="body"></div>
</template>

<script setup lang="js">
import * as THREE from 'three'
import {onMounted, ref, watch} from "vue";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import { TextureLoader, MeshPhongMaterial } from 'three';

const body = ref()
onMounted(()=>{
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  body.value.appendChild( renderer.domElement );

  const scene = new THREE.Scene();
  const loader1 = new THREE.TextureLoader();

  const loader = new OBJLoader();

  // 创建一个TextureLoader实例
  const textureLoader = new TextureLoader();

  // 加载贴图
  textureLoader.load(
    'src/assets/saturno/2k_saturn.jpg', // 贴图文件的路径
    function (texture) {
      // 当贴图加载完成后的回调函数
      // 创建一个材质，并将贴图设置为材质的map属性
      const material = new MeshPhongMaterial({
        map: texture
      });

      // 加载模型
      loader.load(
        'src/assets/saturno/saturno.obj',
        function (obj) {
          // 将材质应用到模型上
          obj.traverse(function (child) {
            if (child.isMesh) {
              child.material = material;
            }
          });

          // 设置模型的位置和大小
          obj.position.set(0, 0, 0);
          obj.scale.set(0.005, 0.005, 0.005);

          // 将模型添加到场景中
          scene.add(obj);
        },
        // 可选的进度回调函数
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 可选的错误回调函数
        function (error) {
          console.error('An error happened', error);
        }
      );
    },
    // 可选的进度回调函数
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // 可选的错误回调函数
    function (error) {
      console.error('An error happened', error);
    }
  );

  // 加载图片
  loader1.load('src/assets/images/starwar/space.jpg', function(texture) {
    // 当图片加载完成后，将其设置为场景的背景
    scene.background = texture;
  });
  // let geometry = new THREE.BoxGeometry(100,100,100);
  // let material = new THREE.MeshLambertMaterial({color:0x00ffff});

  // let mesh=new THREE.Mesh(geometry,material);
  // scene.add(mesh);

  const ami = new THREE.AmbientLight(0xffffff,0.5);
  scene.add(ami);

  const pointLight = new THREE.PointLight(0xffffff, 0.1);
  pointLight.position.set(300,400,500);
  scene.add(pointLight);

  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 100000);
  camera.position.set( 200,200,200 );
  camera.lookAt( 0, 0, 0 );

  renderer.render( scene, camera );
  window.addEventListener('resize',()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth/window.innerHeight;
    renderer.render( scene, camera );
    body.value.appendChild( renderer.domElement );
  })
  let animloop = () => {
    render()
    const controls = new OrbitControls(camera, renderer.domElement) //创建控件对象
    controls.addEventListener('change', render) //监听鼠标、键盘事件
  }
  let render = () => {
    renderer.render(scene, camera) //执行渲染操作
  }
  animloop()
})
</script>
