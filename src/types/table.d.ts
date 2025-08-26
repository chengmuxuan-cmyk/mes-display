// src/types/table.d.ts

/**
 * 表格列配置类型定义
 */
export interface TableColumn {
  prop: string;
  label: string;
  width?: string | number;
}

/**
 * 表格列配置数组类型
 */
export type TableColumnArray = TableColumn[];