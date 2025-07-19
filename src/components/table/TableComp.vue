<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { TableColumnArray } from '@/types/table';

const props = defineProps<{
  data: any[];
  columns: TableColumnArray;
}>();

const tableRef = ref(); // 获取表格引用
let scrollInterval: ReturnType<typeof setInterval> | null = null;


// 开始自动滚动
const startAutoScroll = () => {
  if (scrollInterval) return

  const bodyWrapper = tableRef.value?.$el?.querySelector('.el-scrollbar__wrap') as HTMLElement | null

  if (!bodyWrapper) {
    console.warn('无法获取表格滚动容器')
    return
  }

  console.log('bodyWrapper:', bodyWrapper)

  scrollInterval = setInterval(() => {
    console.log('bodyWrapper.scrollTop:', bodyWrapper.scrollTop)
    console.log('bodyWrapper.clientHeight:', bodyWrapper.clientHeight)
    console.log('bodyWrapper.scrollHeight:', bodyWrapper.scrollHeight)
    if (bodyWrapper.scrollTop + bodyWrapper.clientHeight >= bodyWrapper.scrollHeight) {
      bodyWrapper.scrollTop = 0 // 滚动到底部后回到顶部
    } else {
      bodyWrapper.scrollTop += 1 // 每次下移2px
    }
  }, 50)
}

// 停止滚动
const stopAutoScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

onMounted(() => {
  // 可以在 mounted 后自动开始滚动
  nextTick(() => {
    startAutoScroll()
  })
})

onBeforeUnmount(() => {
  stopAutoScroll()
})
</script>

<template>
  <div class="table-container">
    <el-table
        :data="data"
        id="table"
        class="tableComp"
        stripe
        ref="tableRef"
    >
      <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.table-container {
  height: 100%; /* 控制表格容器高度 */
  overflow: hidden;
}

.tableComp {
  width: 100%;
  height: 100%;
  --el-table-tr-bg-color: rgba(0, 25, 82, 0.64);
  --el-fill-color-lighter: rgba(2, 51, 125, 0.62);
  --el-table-header-bg-color: rgba(1, 41, 109, 0.61);
  --el-table-header-text-color: #ffffff;
  --el-table-row-hover-bg-color: rgba(18, 86, 157, 0.7);
  --el-table-border: none;
  --el-table-fixed-box-shadow: none;
  --el-table-bg-color: transparent;
  color: #ffffff !important;
}

.tableComp :deep(.el-table__body-wrapper) {
  height: 100%;
  overflow: hidden;
}

.tableComp :deep(.el-table__inner-wrapper::before) {
  height: 0;
}

.tableComp :deep(.el-table__cell) {
  padding: 4px 0 !important;
}

.tableComp :deep(.el-scrollbar__wrap) {
  scroll-behavior: smooth;
}
</style>