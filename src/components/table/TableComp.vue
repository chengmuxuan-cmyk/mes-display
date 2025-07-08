<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: Array<{
    sb: string;
    yxzt: string;
    wlzt: string;
  }>;
  columns: Array<{
    prop: string;
    label: string;
  }>;
}>();
</script>

<template>
  <el-table :data="data" id="table" class="tableComp" stripe>
    <el-table-column v-for="(item, index) in columns" :key="index"
       :prop="item.prop" :label="item.label"></el-table-column>
  </el-table>
</template>

<style scoped>
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

.tableComp.el-table :deep(td.el-table__cell),
.tableComp.el-table :deep(th.el-table__cell.is-leaf),
:deep(.el-table__body tr td) {
  border-bottom: none;
}

/* 隐藏表格底部边框线 */
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

.tableComp.el-table :deep(.el-table__cell) {
  padding: 4px 0 !important;
}
</style>