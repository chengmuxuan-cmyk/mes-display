<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

</script>

<template>
  <div class="card-container">
    <svg width="150px" height="150px" class="left-top dv-border-svg-container">
      <polygon points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" fill="#d3e1f8"></polygon>
    </svg>
    <svg width="150px" height="150px" class="right-top dv-border-svg-container">
      <polygon points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" fill="#d3e1f8"></polygon>
    </svg>
    <svg width="150px" height="150px" class="left-bottom dv-border-svg-container">
      <polygon points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" fill="#d3e1f8"></polygon>
    </svg>
    <svg width="150px" height="150px" class="right-bottom dv-border-svg-container">
      <polygon points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" fill="#d3e1f8"></polygon>
    </svg>
    <div class="card-title">{{ props.title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
  background-color: rgba(4, 4, 4, 0.5);
  box-shadow: rgb(29, 72, 196) 0 0 25px 3px inset;
  padding-top: 0.5rem;
}
.dv-border-svg-container {
  position: absolute;
  display: block;
}
.left-top {
  left: 0;
  top: 0;
}
.right-top {
  right: 0;
  top: 0;
  transform: rotateY(180deg);
}
.left-bottom {
  left: 0;
  bottom: 0;
  transform: rotateX(180deg);
}
.right-bottom {
  right: 0;
  bottom: 0;
  transform: rotateX(180deg) rotateY(180deg);
}
.card-title {
  height: 1.25rem;
  width: 100%;
  line-height: 1.25rem;
  font-size: 1rem;
  text-align: center;
  color: #ffffff;
}
.card-content {
  width: 100%;
  height: calc(100% - 1.25rem);
  padding: 0.5rem;
  box-sizing: border-box;
}
</style>