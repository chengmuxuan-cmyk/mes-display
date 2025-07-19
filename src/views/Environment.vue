<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { getScreenData } from '@/api/api'
import { TableColumnArray } from '@/types/table'; // 导入提取后的类型
import Card from "@/components/card/Card.vue";
import TableComp from "@/components/table/TableComp.vue";
import {chartsColor, lineAndBarChartsOption} from "@/utils/echartsOptions";
import {cloneDeep} from "lodash-es";
import video1 from '@/assets/img_video_1.png'
import video2 from '@/assets/img_video_2.png'

// 获取检测设备信息
let deviceData = reactive([
    { name: '网关设备', field: 'device', value: 30, unit: '个' },
    { name: '检测设备', field: 'childDevice', value: 210, unit: '个' },
    { name: '告警次数', field: 'warningTimes', value: 3, unit: '次' },
])

// 获取检测设备信息
let produceData = reactive([
    { name: '总生产数量', field: 'produceNumber', value: 12985, unit: '个' },
    { name: '产品合格率', field: 'produceQuality', value: 98.2, unit: '%' },
    { name: '工单完成率', field: 'produceRate', value: 92.7, unit: '%' },
])

// 获取温度湿度等数据
let environmentData = reactive({
  wdValue: '',
  sdValue: '',
  gzdValue: '',
  pm2_5Value: '',
  pm10Value: '',
  pm1Value: '',
})

onMounted(() => {
  getEnvironmentData()
})

function getEnvironmentData() {
  getScreenData().then(res => {
    console.log('获取屏幕数据成功:', res)
    environmentData.wdValue = res.data['温度'] ? res.data['温度'] + '℃' : ''
    environmentData.sdValue = res.data['湿度'] ? res.data['湿度'] + '%RH' : ''
    environmentData.gzdValue = res.data['光照度'] ? res.data['光照度'] + 'L/H' : ''
    environmentData.pm2_5Value = res.data['pm2.5'] ? res.data['pm2.5'] + 'μg/m³' : ''
    environmentData.pm10Value = res.data['pm10'] ? res.data['pm10'] + 'μg/m³' : ''
    environmentData.pm1Value = res.data['pm1.0'] ? res.data['pm1.0'] + 'μg/m³' : ''
  }).catch(error => {
    console.error('获取屏幕数据失败:', error)
  })
}

/**
 * 实时告警信息
 */
const alarmInformationConfig = ref([{
  value: 1, label: '紧急', color: '#f53f3f', bgColor: '#40222e',
}, {
  value: 2, label: '警告', color: '#ff7d00', bgColor: '#422e21',
}, {
  value: 3, label: '注意', color: '#0fc6c2', bgColor: '#123d48',
}])

const alarmInformationData = ref([
    { situation: '温度超过50℃', level: 1, device: '温湿度变送器', address: '3楼理化实验室东北角', time: '14:25:12' },
    { situation: 'PM2.5超标', level: 2, device: '空气质量变送器', address: '3楼理化实验室东南角', time: '14:18:45' },
    { situation: '氨气浓度过高', level: 3, device: '烟雾变送器', address: '3楼理化实验室西北角', time: '13:52:30' },
    { situation: '温度低于0℃', level: 1, device: '温湿度变送器', address: '3楼理化实验室东北角', time: '13:25:12' },
    { situation: 'PM10超标', level: 2, device: '空气质量变送器', address: '3楼理化实验室东南角', time: '13:18:45' },
    { situation: '氨气浓度过低', level: 3, device: '烟雾变送器', address: '3楼理化实验室西北角', time: '12:52:30' },
])

const setAlarmInformationLevel = (level: number) => {
  let arr = alarmInformationConfig.value.filter(item => item.value === level)
  return arr.length === 1 ? arr[0] : { value: 3, label: '注意', color: '#0fc6c2', bgColor: '#123d48', }
}
/**
 * 设备运行情况数据
 */
const equipmentOperationStatusData = ref([
  { device: '3楼理化实验室东北角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼理化实验室东南角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼理化实验室西北角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼理化实验室西南角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼生产实验室东北角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼生产实验室东南角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼生产实验室西北角网关设备', runningStatus: '正常', networkStatus: '正常' },
  { device: '3楼生产实验室西南角网关设备', runningStatus: '正常', networkStatus: '正常' },
])

const equipmentOperationStatusColumn = ref<TableColumnArray>([
  { prop: 'device', label: '设备', width: '250px' },
  { prop: 'runningStatus', label: '运行状态' },
  { prop: 'networkStatus', label: '网络状态' },
])

/**
 * 视频监控数据
 */
const videoMonitoringData = ref([
  { name: '3楼理化实验室', address: '3楼理化实验室', url: video1, status: '正常' },
  { name: '3楼生产实验室', address: '3楼生产实验室', url: video2, status: '正常' },
])

/**
 * 生产趋势分析数据
 * 基于 lineAndBarChartsOption 拷贝并定制数据 productionTrendsOption
 */
const productionTrendsOption = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  option.yAxis[0].name = '件';
  option.yAxis[1].show = false;
  option.tooltip.formatter = undefined
  option.tooltip.valueFormatter = (value: number | string) => value + '件';
  // 计划产量数据
  option.series[0].name = '计划产量';
  option.series[0].type = 'line';
  option.series[0].data = [1500, 2100, 1800, 2400, 2300, 1900, 2000];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  // 再加一条实际产量数据
  option.series.push({
    ...option.series[0],
    name: '实际产量',
    type: 'bar',
    data: [1450, 1980, 1950, 2320, 2180, 1850, 1980],
    lineStyle: {
      color: chartsColor[1],
    },
    itemStyle: {
      color: chartsColor[1],
    },
    seriesIndex: 1,
  })
  return option;
});

/**
 * 生产计划完成情况数据
 * 基于 lineAndBarChartsOption 拷贝并定制数据 CompletionStatusOfProductionPlanOption
 */
const CompletionStatusOfProductionPlanOption = computed(() => {
  const option = cloneDeep(lineAndBarChartsOption);
  option.xAxis[0].data = ['A产品', 'B产品', 'C产品', 'D产品', 'E产品'];
  option.yAxis[0].name = '%';
  option.yAxis[0].max = 100;
  option.yAxis[1].show = false;
  option.tooltip.valueFormatter = (value: number | string) => value + '%';
  // 完成率数据
  option.series[0].name = '完成率';
  option.series[0].type = 'bar';
  option.series[0].data = [92, 85, 95, 78, 88];
  option.series[0].lineStyle.color = chartsColor[0];
  option.series[0].itemStyle.color = chartsColor[0];
  return option;
});

</script>

<template>
  <div class="left-content">
    <div class="three-data-container">
      <div class="three-data-circle" v-for="(item, index) in deviceData" :key="index">
        <div>{{ item.value }}{{ item.unit }}</div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div>
      <card title="实时告警信息">
        <div class="alarm-information-container" v-auto-scroll>
          <div class="alarm-information-item"
               v-for="(item, index) in alarmInformationData" :key="index"
               :style="`background-color: ${setAlarmInformationLevel(item.level).color};`">
            <div class="alarm-information-content">
              <div class="alarm-information-tip">
                <div
                    class="alarm-information-label"
                    :style="`
                  color: ${setAlarmInformationLevel(item.level).color};
                  background-color: ${setAlarmInformationLevel(item.level).bgColor};
                `"
                >{{ setAlarmInformationLevel(item.level).label }}</div>
                <div class="alarm-information-time">{{ item.time }}</div>
              </div>
              <div class="alarm-information-tip alarm-information-situation">{{ item.situation }}</div>
              <div class="alarm-information-tip alarm-information-address">{{ item.device }}-{{ item.address }}</div>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div>
      <card title="设备运行情况">
        <table-comp :data="equipmentOperationStatusData" :columns="equipmentOperationStatusColumn" />
      </card>
    </div>
  </div>
    <div class="center-content">
    <div class="video-card-container">
      <card title="视频监控">
        <div class="video-card-content">
          <div v-for="(item, index) in videoMonitoringData" :key="index" class="video-card-content-tip">
            {{ item.name }}
            <img :src="item.url" alt="" />
          </div>
        </div>
      </card>
    </div>
    </div>
  <div class="right-content">
    <div class="three-data-container">
      <div class="three-data-circle" v-for="(item, index) in produceData" :key="index">
        <div>{{ item.value }}{{ item.unit }}</div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div>
      <card title="生产趋势分析">
        <v-chart :option="productionTrendsOption" autoresize/>
      </card>
    </div>
    <div>
      <card title="生产计划完成情况">
        <v-chart :option="CompletionStatusOfProductionPlanOption" autoresize/>
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
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
/*.center-content > div:first-child {
  height: 66%;
  width: 100%;
}
.center-content > div:last-child {
  height: 31%;
  width: 100%;
}*/
.video-card-container {
  height: 27.5vh;
  width: 100%;
  margin-top: auto;
}
.video-card-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #f4f8f4;
  line-height: 1.5rem;
}
.video-card-content-tip {
  width: 45%;
  height: 100%;
}
.video-card-content-tip img {
  width: 100%;
  height: calc(100% - 1.5rem);
}
.three-data-container {
  background-image: url("@/assets/environment/earth.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  display: flex;
  justify-content: space-around;
}
.three-data-circle {
  background-image: url("@/assets/environment/data_circle.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8rem;
  height: 8rem;
  color: #ffffff;
}
.three-data-circle:nth-child(2) {
  margin-top: -2.5rem;
}
.three-data-circle div:first-child {
  font-size: 1.125rem;
  font-family: Inter, sans-serif;
  font-weight: bold;
}
v-chart {
  width: 100%;
  height: 100%;
}
.alarm-information-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.alarm-information-item {
  border-radius: 0.375rem;
  width: 95%;
  margin: 0 2.5% 0.5rem;
}
.alarm-information-content {
  margin-left: 0.25rem;
  background-color: var(--card-content-background-color);
  border-radius: 0.375rem;
  padding: 0.5rem;
}
.alarm-information-tip {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25rem 0;
}
.alarm-information-label {
  font-size: 0.875rem;
  padding: 0 0.5rem;
  border-radius: 0.375rem;
}
.alarm-information-time, .alarm-information-address {
  font-size: 0.875rem;
  color: #cad6eb;
}
.alarm-information-situation {
  color: #f4f8f4;
}
</style>