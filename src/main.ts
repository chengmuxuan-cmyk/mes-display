import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Echarts from 'vue-echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
    BarChart,
    LineChart,
    PieChart,
} from "echarts/charts";
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    DatasetComponent
} from "echarts/components";
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    DatasetComponent,
]);

// 在项目入口文件中配置
import * as mapvthree from '@baidumap/mapv-three';

// 配置百度地图 AK
mapvthree.BaiduMapConfig.ak = '2KfERvDiXS6baPk43LC4Z0mGbExBxpdl';

const app = createApp(App)
app.use(ElementPlus).use(router).component('v-chart', Echarts)
app.mount('#app')
