<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref } from 'vue';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: any;
let animationId: number;

const container = ref<HTMLElement | null>(null);

const init = () => {
  // 初始化场景、相机和渲染器
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  // 获取容器元素并设置渲染器尺寸
  container.value = document.getElementById('container');
  if (container.value) {
    // 设置渲染器尺寸为容器元素的大小
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);
  }

  // 添加轨道控制器
  import('three/examples/jsm/controls/OrbitControls').then(controlsModule => {
    controls = new controlsModule.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // 禁用缩放
    animate();
  });

  // 添加点击事件监听器
  if (container.value) {
    container.value.addEventListener('click', onClick);
  }

  // 创建U型地板
  createBuilding();

  // 设置相机位置
  camera.position.set(25, 25, 25);
  camera.lookAt(0, 0, 0);
};

const createBuilding = () => {
  // 建筑参数
  const floorWidth = 20; // 楼层宽度
  const floorDepth = 20; // 楼层深度
  const buildingHeight = 5; // 每层高度
  const floorCount = 3; // 楼层数量
  const wallThickness = 0.3; // 墙壁厚度

  // 材质
  // 地板材质
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  // 外墙材质
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffdddd });
  // 立柱材质
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });

  // 创建每层楼
  for (let i = 0; i < floorCount; i++) {
    // 创建地板
    const floorGeometry = new THREE.BoxGeometry(
        floorWidth, // 宽度
        buildingHeight, // 高度
        floorDepth // 深度
    );
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = i * buildingHeight + buildingHeight / 2;
    scene.add(floor);

    // 创建四面墙体，留出前面墙不显示以展示内部结构
    // 后侧墙体
    const backWallGeometry = new THREE.BoxGeometry(floorWidth, buildingHeight, wallThickness);
    const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0xffdddd, transparent: true, opacity: 0.3 });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(
        0,
        i * buildingHeight + buildingHeight/2,
        floorDepth/2 + wallThickness/2
    );
    scene.add(backWall);

    // 前侧墙体（设置为透明）
    const frontWallGeometry = new THREE.BoxGeometry(floorWidth, buildingHeight, wallThickness);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.set(
        0,
        i * buildingHeight + buildingHeight/2,
        -floorDepth/2 - wallThickness/2
    );
    scene.add(frontWall);

    // 左侧墙体
    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, buildingHeight, floorDepth);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(
        -floorWidth/2 - wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        0
    );
    scene.add(leftWall);

    // 右侧墙体
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, buildingHeight, floorDepth);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(
        floorWidth/2 + wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        0
    );
    scene.add(rightWall);

    // 添加四个角落的立柱支撑
    // 左前立柱
    const pillarGeometry = new THREE.BoxGeometry(wallThickness, buildingHeight, wallThickness);
    const leftFrontPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    leftFrontPillar.position.set(
        -floorWidth/2 - wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        -floorDepth/2 - wallThickness/2
    );
    scene.add(leftFrontPillar);

    // 右前立柱
    const rightFrontPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    rightFrontPillar.position.set(
        floorWidth/2 + wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        -floorDepth/2 - wallThickness/2
    );
    scene.add(rightFrontPillar);

    // 左后立柱
    const leftBackPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    leftBackPillar.position.set(
        -floorWidth/2 - wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        floorDepth/2 + wallThickness/2
    );
    scene.add(leftBackPillar);

    // 右后立柱
    const rightBackPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    rightBackPillar.position.set(
        floorWidth/2 + wallThickness/2,
        i * buildingHeight + buildingHeight/2,
        floorDepth/2 + wallThickness/2
    );
    scene.add(rightBackPillar);
  }

  // 添加环境光和方向光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);
};

// 为场景添加光源
const addLightsToScene = () => {
  // 增强环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 提高亮度
  scene.add(ambientLight);

  // 增强方向光并调整位置
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // 更亮
  directionalLight.position.set(20, 30, 15); // 调整位置以改善视角
  scene.add(directionalLight);

  // 可选：添加一个暖色调点光源来增强细节表现
  const pointLight = new THREE.PointLight(0xffddcc, 1.0, 50); // 暖光，影响范围50
  pointLight.position.set(0, 10, 10); // 放置在建筑中间高度附近
  scene.add(pointLight);
};

// 添加点击事件处理函数
const onClick = (event: MouseEvent) => {
  if (!container.value) return;

  // 计算鼠标点击位置的归一化设备坐标（NDC）
  const rect = container.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const mouse = {
    x: (x / rect.width) * 2 - 1,
    y: -(y / rect.height) * 2 + 1
  };

  // 创建射线并检测与地板的交集
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // 遍历交集对象，找到被点击的地板
  for (const intersect of intersects) {
    if (intersect.object instanceof THREE.Mesh &&
        intersect.object.material.color.getHex() === 0xaaaaaa) {
      const floorLevel = Math.round(intersect.point.y / 5);
      console.log(`Floor at level ${floorLevel} clicked!`);
      break;
    }
  }
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);
};

// 调整窗口大小时更新相机和渲染器
const setupResizeListener = () => {
  // 使用防抖避免频繁触发
  let timeoutId: number | null = null;

  window.addEventListener('resize', () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      if (camera && renderer) {
        // 确保容器存在且尺寸有效
        const container = document.getElementById('container');
        if (container && (container.clientWidth > 0 || container.clientHeight > 0)) {
          const width = container.clientWidth;
          const height = container.clientHeight;

          camera.aspect = width / height || 1;
          camera.updateProjectionMatrix();

          renderer.setSize(width, height);

          // 调整相机位置以保持建筑在视野中
          const boundingBox = new THREE.Box3().setFromObject(scene);
          const center = boundingBox.getCenter(new THREE.Vector3());
          const size = boundingBox.getSize(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const cameraZPosition = maxDim * 1.5; // 适当调整倍数以获得更好的视角

          camera.position.set(center.x, center.y + cameraZPosition * 0.5, cameraZPosition);
          camera.lookAt(center);
        } else {
          // 回退到窗口尺寸
          camera.aspect = window.innerWidth / window.innerHeight || 1;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      }
    }, 200); // 200ms防抖
  });
};

// ...在onMounted中调用
setupResizeListener();

// 清理资源
onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
    // 移除DOM元素
    const container = document.getElementById('container');
    if (container && renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  }
});

onMounted(() => {
  init();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%; /* 你可以根据需要调整这个值 */
}
</style>