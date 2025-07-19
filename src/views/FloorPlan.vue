<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import level2 from '@/assets/level_2.jpg'
import level3 from '@/assets/level_3.jpg'
import { useRoute } from 'vue-router'
import TableComp from "@/components/table/TableComp.vue";
import Card from "@/components/card/Card.vue";
import {chartsColor, lineAndBarChartsOption} from "@/utils/echartsOptions";
import { cloneDeep } from 'lodash-es'

const route = useRoute()
const level = Number(route.params.level)

let planImgList = ref( [
  '', level2 , level3, '', '', ''
])

// 基于 lineAndBarChartsOption 拷贝并定制数据 temperatureAndHumidityOptionData
const temperatureAndHumidityOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = '℃';
  option.yAxis[1].name = '%RH';
  option.tooltip.formatter = (params: any) => {
    let result = params[0].name + '<br/>';
    params.forEach((item: any) => {
      let unit = option.yAxis[item.seriesIndex].name
      result += `${item.marker} ${item.seriesName}: ${item.value} ${unit}<br/>`;
    });
    return result;
  };
  // 温度数据
  option.series[0].name = '温度';
  option.series[0].type = 'line';
  option.series[0].data = [12.5, 13.8, 14.2, 15.1, 14.9, 15.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  // 再加一条湿度数据
  option.series.push({
    ...option.series[0],
    name: '湿度',
    data: [20.5, 21.8, 22.2, 23.1, 22.9, 25.2],
    lineStyle: {
      color: chartsColor[1],
    },
    itemStyle: {
      color: chartsColor[1],
    },
    yAxisIndex: 1,
    seriesIndex: 1,
  })
  return option;
});

// 基于 lineAndBarChartsOption 拷贝并定制数据 airQualityOptionData
const airQualityOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'μg/m³';
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + 'μg/m³';
  // PM2.5数据
  option.series[0].name = 'pm2.5';
  option.series[0].type = 'bar';
  option.series[0].stack = 'bar';
  option.series[0].data = [12.5, 13.8, 14.2, 15.1, 14.9, 15.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  // 再加一条PM10数据
  option.series.push({
    ...option.series[0],
    name: 'PM10',
    data: [20.5, 21.8, 22.2, 23.1, 22.9, 23.2],
    lineStyle: {
      color: chartsColor[1],
    },
    itemStyle: {
      color: chartsColor[1],
    },
    seriesIndex: 1
  })
  // 再加一条PM1.0数据
  option.series.push({
    ...option.series[0],
    name: 'PM1.0',
    data: [28.5, 29.8, 30.2, 31.1, 30.9, 31.2],
    lineStyle: {
      color: chartsColor[2],
    },
    itemStyle: {
      color: chartsColor[2],
    },
    seriesIndex: 2
  })
  return option;
})

// 基于 lineAndBarChartsOption 拷贝并定制数据 illuminanceOptionData
const illuminanceOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'L/H';
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + 'L/H';
  // 光照度数据
  option.series[0].name = '光照度';
  option.series[0].type = 'line';
  option.series[0].areaStyle = { opacity: 0.2 };
  option.series[0].data = [312.5, 413.8, 514.2, 415.1, 314.9, 415.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  return option;
});

// 基于 lineAndBarChartsOption 拷贝并定制数据 windSpeedOptionData
const windSpeedOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'm/s';
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + 'm/s';
  // 风速数据
  option.series[0].name = '风速';
  option.series[0].type = 'line';
  option.series[0].data = [4.5, 2.8, 6.2, 1.1, 3.9, 5.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  return option;
});

// 基于 lineAndBarChartsOption 拷贝并定制数据 ammoniaConcentrationOptionData
const ammoniaConcentrationOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'ppm';
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + 'ppm';
  // 光照度数据
  option.series[0].name = '浓度';
  option.series[0].type = 'bar';
  option.series[0].data = [7.5, 6.8, 10.2, 9.1, 8.9, 12.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  return option;
});

// 基于 lineAndBarChartsOption 拷贝并定制数据 differentialPressureOptionData
const differentialPressureOptionData = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'Pa';
  option.yAxis[0].min = undefined;
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + 'Pa';
  // 光照度数据
  option.series[0].name = '压差';
  option.series[0].type = 'line';
  option.series[0].data = [27.5, -46.8, 10.2, -39.1, 38.9, -52.2];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  return option;
});

const planClick = e => {
  console.log(e)
}
</script>

<template>
  <div class="left-content">
    <div>
      <card title="温湿度检测">
        <v-chart :option="temperatureAndHumidityOptionData" autoresize/>
      </card>
    </div>
    <div>
      <card title="空气质量检测">
        <v-chart :option="airQualityOptionData" autoresize/>
      </card>
    </div>
    <div>
      <card title="光照度检测">
        <v-chart :option="illuminanceOptionData" autoresize/>
      </card>
    </div>
  </div>
  <div class="center-content">
    <card title="平面图">
      <div class="plan-img-content">
        <img :src="planImgList[level - 1]" alt="" class="plan-img" @click="planClick" />
      </div>
    </card>
  </div>
  <div class="right-content">
    <div>
      <card title="风速检测">
        <v-chart :option="windSpeedOptionData" autoresize/>
      </card>
    </div>
    <div>
      <card title="氨气浓度检测">
        <v-chart :option="ammoniaConcentrationOptionData" autoresize/>
      </card>
    </div>
    <div>
      <card title="压差检测">
        <v-chart :option="differentialPressureOptionData" autoresize/>
      </card>
    </div>
  </div>
</template>

<style scoped>
.left-content, .right-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.left-content > div, .right-content > div {
  height: 31%;
  width: 100%;
}
.center-content {
  top: 4rem;
  bottom: 0;
}
.plan-img-content {
  height: 100%;
  width: 100%;
  background-color: var(--card-content-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.plan-img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>