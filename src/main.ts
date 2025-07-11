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

const app = createApp(App)
app.use(ElementPlus).use(router).component('v-chart', Echarts)
app.mount('#app')
