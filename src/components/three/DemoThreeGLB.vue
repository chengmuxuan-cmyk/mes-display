<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let renderer: THREE.WebGLRenderer;

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  // 获取 DOM 容器
  container.value = document.getElementById('three-container')

  // 创建场景
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
      75,
      container.value.clientWidth / container.value.clientHeight,
      0.1,
      1000
  )
  camera.position.set(0, 2, 5)

  // 创建渲染器

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  if (container.value) {
    // 设置渲染器尺寸为容器元素的大小
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);
  }

  // 添加环境光和方向光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);

  // 添加 OrbitControls（可选）
  const controls = new OrbitControls(camera, renderer.domElement)

  // 加载 .glb 模型
  const loader = new GLTFLoader()
  const modelPath = '/glass_curved_building.glb' // 放在 public/model.glb 下

  loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene

        // 添加点击事件监听器
        window.addEventListener('click', (event) => {
          // 鼠标归一化坐标（-1 到 1）
          const mouse = new THREE.Vector2(
              (event.clientX / container.value.clientWidth) * 2 - 1,
              -(event.clientY / container.value.clientHeight) * 2 + 1
          )

          // 创建射线
          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(mouse, camera)

          // 获取所有可交互的对象（可以是整个模型或模型中的具体部分）
          const intersects = raycaster.intersectObject(model, true)

          if (intersects.length > 0) {
            console.log('模型被点击了！')
            console.log('点击对象:', intersects[0])
          }
        })
        scene.add(model)
      },
      undefined,
      (error) => {
        console.error('加载模型失败:', error)
      }
  )


  // 调整窗口大小时更新相机和渲染器
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<template>
  <div id="three-container"></div>
</template>

<style scoped>
#three-container {
  width: 100%;
  height: 100%;
}
</style>
