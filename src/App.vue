<script setup lang="ts">
// import backgroundMp4 from '@/assets/background_mp4.mp4'
import imgCenter from '@/assets/environment/img_center.jpg'
import HeaderComp from "@/components/header/HeaderComp.vue";

// 模拟出楼房的的顶部和底部线测坐标函数
function calcBuildingYTop(x) {
  return Math.floor(-(37 / 102 * x) + 535)
}
function calcBuildingYBottom(x) {
  return Math.floor(-(7 / 102 * x) + 530)
}
// 监听背景图上的光标位置
function bgImgMousemove(e) {
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
function bgImgClick(e) {
  let data = checkMouseLocation(e)
  if(typeof data === 'object') {
    const { topY, y, buildingH } = data
    let levelTotal = 6
    let level = levelTotal - Math.floor((y - topY) / buildingH * 6)
    alert('这是' + level + '层')
  }
}
// 判断鼠标位置是否在楼内
function checkMouseLocation(e) {
  if(e.clientX / e.target.clientWidth > 0.333 && e.clientX / e.target.clientWidth < 0.670) { // 点在了楼的左右范围内
    let topY = calcBuildingYTop(e.clientX)
    let bottomY = calcBuildingYBottom(e.clientX)
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
  height: 4rem;
  z-index: 2;
}
</style>
