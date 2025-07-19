import { createApp } from 'vue'
import './style.css'
import router from "./router";
import App from './App.vue'

import autoScroll from './directives/autoScroll'

import pinia from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Echarts from 'vue-echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
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
    GaugeChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    DatasetComponent,
]);

const app = createApp(App)

// 挂载Pinia实例
app.use(pinia)

// 挂载路由实例
app.use(router)

// 挂载ElementPlus
app.use(ElementPlus)

// 挂载ECharts
app.component('v-chart', Echarts)

// 绑定指令
app.directive('auto-scroll', autoScroll)

// 挂载应用
app.mount('#app')
