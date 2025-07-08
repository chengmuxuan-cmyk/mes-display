<script setup lang="ts">
import backgroundMp4 from '@/assets/background_mp4.mp4'
const headerTitle = import.meta.env.VITE_HEADER_TITLE
</script>

<template>
  <!--背景动态图-->
  <div class="background-mp4">
    <div class="background-mp4-content">
      <video
          class="background-mp4-content-video"
          preload="metadata"
          :src="backgroundMp4"
          crossorigin="anonymous" autoplay loop muted
      ></video>
    </div>
  </div>
  <!--背景遮罩层-->
  <div class="background-mp4-mask"></div>
  <!--内容-->
  <div class="container">
    <!--头部-->
    <div class="header-container">
      <div></div>
      <div class="header-title">{{ headerTitle }}</div>
      <div></div>
    </div>
    <!--内容-->
    <div class="container-body">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.background-mp4 {
  position: absolute;
  will-change: transform;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(0px, 0px);
  z-index: -1;
  pointer-events: auto;
  --objectfit: cover;
  background-color: #040404;
}
.background-mp4-content {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 0;
  border-width: 0;
  border-style: solid;
  --animation: 2s;
  --animation-flash: 0.2s;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.background-mp4-content-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  outline: none;
}
.background-mp4-mask {
  position: absolute;
  will-change: transform;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(0px, 0px);
  z-index: 0;
  pointer-events: auto;
  --objectfit: cover;
}
.container {
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
}
.header-container {
  width: 100%;
  height: 4rem;
  background-image: url("@/assets/header_background.png");
  background-repeat: no-repeat;
  background-size: 100% 250%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-title {
  opacity:1;
  font-size: 1.75rem;
  color:rgb(255, 255, 255);
  border-radius:0;
  border-width:0;
  border-style:solid;
  line-height:40px;
  text-align:center;
  font-family: "Microsoft YaHei", sans-serif;
  --animation:2s;
  --animation-flash:0.2s;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.container-body {
  height: calc(100% - 4rem);
}
</style>
