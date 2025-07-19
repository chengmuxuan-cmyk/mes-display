<script setup lang="ts">
// import backgroundMp4 from '@/assets/background_mp4.mp4'
import imgCenter from '@/assets/environment/img_center.jpg'
import level2 from '@/assets/level_2.jpg'
import level3 from '@/assets/level_3.jpg'
import HeaderComp from "@/components/header/HeaderComp.vue";
import {onMounted, onUnmounted, ref} from "vue";
import Card from "@/components/card/Card.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  calcBuildingRange() // 初始化时获取一次窗口大小
  window.addEventListener('resize', calcBuildingRange) // 监听 resize 事件
})

onUnmounted(() => {
  window.removeEventListener('resize', calcBuildingRange) // 移除监听器，防止内存泄漏
})

//根据视口计算楼房四个点的坐标
let leftTopX = 0, leftTopY = 0, leftBottomX = 0, leftBottomY = 0, rightTopX = 0, rightTopY = 0, rightBottomX = 0, rightBottomY = 0;

function calcBuildingRange() {
  // 楼的左边距和右边距对于浏览器的宽度是0.333 - 0.67
  leftTopX = leftBottomX = Math.floor(window.innerWidth * 0.333)
  rightTopX = rightBottomX = Math.floor(window.innerWidth * 0.67)
  // 楼的左侧范围的最高点和最低点以及右侧的最高点和最低点之间的比值分别为0.686，0.961，0.162，0.451
  leftTopY = Math.floor(leftTopX * 0.686)
  leftBottomY = Math.floor(leftBottomX * 0.961)
  rightTopY = Math.floor(rightTopX * 0.162)
  rightBottomY = Math.floor(rightBottomX * 0.451)
}

/**
 * 根据两点 (x1, y1) 和 (x2, y2) 确定一条直线，并给出 x 求出对应的 y
 * @param x1 第一个点的 x 坐标
 * @param y1 第一个点的 y 坐标
 * @param x2 第二个点的 x 坐标
 * @param y2 第二个点的 y 坐标
 * @param x  给定的 x 值，用于求解 y
 * @returns 计算得到的 y 值
 */
function getLineY(x1: number, y1: number, x2: number, y2: number, x: number): number {
  if (x1 === x2) {
    throw new Error('直线是垂直的，x1 和 x2 不能相等');
  }

  const k = (y2 - y1) / (x2 - x1); // 计算斜率
  const b = y1 - k * x1;           // 计算截距
  return k * x + b;                // 返回指定 x 的 y 值
}

// 判断鼠标位置是否在楼内
function checkMouseLocation(e: any) {
  // 楼的左边距和右边距对于浏览器的宽度是0.333 - 0.67
  if(e.clientX >= leftTopX && e.clientX <= rightTopX) { // 点在了楼的左边距和右边距范围内
    // 楼的左侧范围的最高点和最低点以及右侧的最高点和最低点之间的比值分别为0.686，0.961，0.162，0.451
    let topY = getLineY(leftTopX, leftTopY, rightTopX, rightTopY, e.clientX)
    let bottomY = getLineY(leftBottomX, leftBottomY, rightBottomX, rightBottomY, e.clientX)
    let y = e.clientY
    if(y > topY && y < bottomY) {
      let buildingH = bottomY - topY
      return {
        topY,
        bottomY,
        y,
        buildingH,
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

// 监听背景图上的光标位置
function bgImgMousemove(e: any) {
  let data = checkMouseLocation(e)
  if (typeof data === 'object') {
    // 鼠标在楼内，将光标设置为手指形状
    e.target.style.cursor = 'pointer';
  } else {
    // 鼠标不在楼内，恢复默认光标
    e.target.style.cursor = 'default';
  }
}
// 背景图点击事件
function bgImgClick(e: any) {
  let data = checkMouseLocation(e)
  if(typeof data === 'object') {
    const { topY, y, buildingH } = data
    let levelTotal = 6
    level.value = levelTotal - Math.floor((y - topY) / buildingH * 6)
    if(planImgList.value[level.value - 1]) {
      // planShow.value = true
      // planTitle.value = '第' + level.value + '层平面图'
      router.push({
        name: 'floorPlan',
        params: { level: level.value } // 动态路径参数
      })
    }
  }
}

let planShow = ref(false)
let planTitle = ref('')
let planImgList = ref( [
    '', level2 , level3, '', '', ''
])
let level = ref(1)

// 关闭平面图展示
function closePlanMask() {
  planShow.value = false
  planTitle.value = ''
}
</script>

<template>
  <!--背景动态图-->
<!--  <video-->
<!--      class="background-content background-content-video"-->
<!--      preload="metadata"-->
<!--      :src="backgroundMp4"-->
<!--      crossorigin="anonymous" autoplay loop muted-->
<!--  ></video>-->
  <!--背景静态图-->
  <img :src="imgCenter" class="background-content" @click="bgImgClick" @mousemove="bgImgMousemove" alt="" />
  <!--背景遮罩层-->
<!--  <div class="background-mask"></div>-->
  <!--头部-->
  <div class="header-content">
    <header-comp></header-comp>
  </div>
  <!--内容-->
  <router-view />
<!--  <div class="plan-content-mask" v-if="planShow" @click="closePlanMask">-->
<!--    <card :title="planTitle" class="plan-card">-->
<!--      <img :src="planImgList[level - 1]" alt="" class="plan-img" />-->
<!--    </card>-->
<!--  </div>-->
</template>

<style scoped>
.background-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  z-index: 0;
}
/*.background-content-video {
  object-fit: cover;
  border: none;
  outline: none;
}
.background-mask {
  position: absolute;
  will-change: transform;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(0px, 0px);
  z-index: 1;
  pointer-events: auto;
  --objectfit: cover;
}*/
.header-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 2;
}
.plan-content-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plan-card {
  width: auto;
  height: calc(100% - 2 * var(--header-height));
}
.plan-img {
  height: 100%;
  width: auto;
}
</style>
