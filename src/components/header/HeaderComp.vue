<script setup lang="ts">
import logo from '@/assets//logo.png'
import { useCurrentTime } from '@/hooks/useCurrentTime'

const headerTitle = import.meta.env.VITE_HEADER_TITLE

const { currentTime } = useCurrentTime()
</script>

<template>
  <div class="header-container">
    <div class="current-time">
      {{ currentTime }}
    </div>
    <div class="header-title">{{ headerTitle }}</div>
    <div class="logo-content">
      <img :src="logo" class="logo" alt="" />
    </div>
  </div>
</template>

<style scoped>
.header-container {
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  box-sizing: border-box;
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
.current-time, .logo-content {
  width: 18rem;
  display: flex;
}
.current-time {
  font-size: 1.2rem;
  color: #ffffff;
}
.logo {
  width: 10rem;
  height: 2rem;
  margin-left: auto;
}
</style>