<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { getScreenData } from '@/api/api'
import Card from "@/components/card/Card.vue";
import TableComp from "@/components/table/TableComp.vue";
import { barChartsOption, lineChartsOption } from "@/utils/echartsOptions";
// import DemoThree from "@/components/three/DemoThree.vue";
// import DemoThreeGLB from "@/components/three/DemoThreeGLB.vue";
// import DemoBaidu from "@/components/three/DemoBaidu.vue";

// 获取温度湿度等数据
let emvironmentData = reactive({
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
    emvironmentData.wdValue = res.data['温度'] ? res.data['温度'] + '℃' : ''
    emvironmentData.sdValue = res.data['湿度'] ? res.data['湿度'] + '%RH' : ''
    emvironmentData.gzdValue = res.data['光照度'] ? res.data['光照度'] + 'L/H' : ''
    emvironmentData.pm2_5Value = res.data['pm2.5'] ? res.data['pm2.5'] + 'μg/m³' : ''
    emvironmentData.pm10Value = res.data['pm10'] ? res.data['pm10'] + 'μg/m³' : ''
    emvironmentData.pm1Value = res.data['pm1.0'] ? res.data['pm1.0'] + 'μg/m³' : ''
  }).catch(error => {
    console.error('获取屏幕数据失败:', error)
  })
}


// 基于 barChartsOption 拷贝并定制 gasConcentrationOption
const gasConcentrationOption = computed(() => {
  const option = JSON.parse(JSON.stringify(barChartsOption));
  option.tooltip.formatter = '{a}: {c}%';
  option.xAxis[0].data = ['CO₂', 'O₂', 'VOCs', 'CO', 'NO₂', 'SO₂'];
  option.yAxis[0].name = '%';
  option.series[0].data = [17, 79, 1, 1, 1, 1];
  option.series[0].name = '气体浓度';
  return option;
});

// 基于 barChartsOption 拷贝并定制 dustParticleConcentrationOption
const dustParticleConcentrationOption = computed(() => {
  const option = JSON.parse(JSON.stringify(barChartsOption));
  option.tooltip.formatter = '{a}: {c}个/m³';
  option.xAxis[0].data = ['0.3μm', '0.5μm', '1.0μm', '5.0μm'];
  option.yAxis[0].name = '个/m³';
  option.series[0].data = [
    { value: 1200000, itemStyle: { color: 'rgba(255, 107, 107, 0.7)' } },
    { value: 352000, itemStyle: { color: 'rgba(255, 209, 102, 0.7)' } },
    { value: 85000, itemStyle: { color: 'rgba(79, 172, 254, 0.7)' } },
    { value: 1200, itemStyle: { color: 'rgba(0, 227, 174, 0.7)' } }
  ];
  option.series[0].name = '粒子浓度';
  option.series[0].barWidth = 100;
  return option;
});

// 基于 lineChartsOption 拷贝并定制数据 pressureTestOptionData
const pressureTestOptionData = computed(() => {
  const option = JSON.parse(JSON.stringify(lineChartsOption));
  option.tooltip.formatter = '{a}: {c}Pa';
  option.xAxis[0].data = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  option.yAxis[0].name = 'Pa';
  option.series[0].data = [12.5, 13.8, 14.2, 15.1, 14.9, 15.2];
  option.series[0].name = '压强';
  option.series[0].lineStyle.color = '#28ffb3';
  option.series[0].itemStyle.color = '#28ffb3';
  return option;
});

// 基于 lineChartsOption 拷贝并定制数据 bacteriaOption
const bacteriaOption = computed(() => {
  const option = JSON.parse(JSON.stringify(lineChartsOption));
  option.tooltip.formatter = '{a}: {c}CFU/m³';
  option.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  option.yAxis[0].name = 'CFU/m³';
  option.series[0].data = [65, 59, 50, 58, 56, 55, 42];
  option.series[0].name = '浮游菌/沉降菌';
  option.series[0].lineStyle.color = '#ff6b6b';
  option.series[0].itemStyle.color = '#ff6b6b';
  return option;
});

const equipmentOperationstatusData = ref([
  { sb: '光照度变送器', yxzt: '正常', wlzt: '正常' },
  { sb: '空气质量变送器', yxzt: '正常', wlzt: '正常' },
  { sb: '烟雾变送器', yxzt: '正常', wlzt: '正常' },
  { sb: '温湿度变送器', yxzt: '正常', wlzt: '正常' },
  { sb: '管道风速变送器', yxzt: '正常', wlzt: '正常' },
])

const equipmentOperationstatusColumn = ref([
  { prop: 'sb', label: '设备' },
  { prop: 'yxzt', label: '运行状态' },
  { prop: 'wlzt', label: '网络状态' },
])

</script>

<template>
  <div class="left-content">
    <div class="three-data-container">
      <div class="three-data-circle">
        <div>{{ emvironmentData.wdValue }}</div>
        <div>温度</div>
      </div>
      <div class="three-data-circle">
        <div>{{ emvironmentData.sdValue }}</div>
        <div>湿度</div>
      </div>
      <div class="three-data-circle">
        <div>{{ emvironmentData.gzdValue }}</div>
        <div>光照度</div>
      </div>
    </div>
    <div>
      <card title="压测检测">
        <v-chart :option="pressureTestOptionData" autoresize/>
      </card>
    </div>
    <div>
      <card title="设备运行情况">
        <table-comp :data="equipmentOperationstatusData" :columns="equipmentOperationstatusColumn" />
      </card>
    </div>
  </div>
    <div class="center-content">
<!--      <div>-->
<!--        <demo-baidu></demo-baidu>-->
<!--        <demo-three></demo-three>-->
<!--        <demo-three-g-l-b></demo-three-g-l-b>-->
<!--      </div>-->
    <div class="dust-particle-concentration-content">
      <card title="尘埃离子浓度">
        <v-chart :option="dustParticleConcentrationOption" autoresize/>
      </card>
    </div>
    </div>
  <div class="right-content">
    <div class="three-data-container">
      <div class="three-data-circle">
        <div>{{ emvironmentData.pm2_5Value }}</div>
        <div>PM2.5</div>
      </div>
      <div class="three-data-circle">
        <div>{{ emvironmentData.pm10Value }}</div>
        <div>PM10</div>
      </div>
      <div class="three-data-circle">
        <div>{{ emvironmentData.pm1Value }}</div>
        <div>PM1.0</div>
      </div>
    </div>
    <div>
      <card title="浮游菌/沉降菌">
        <v-chart :option="bacteriaOption" autoresize/>
      </card>
    </div>
    <div>
      <card title="气体浓度检测">
        <v-chart :option="gasConcentrationOption" autoresize/>
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
.dust-particle-concentration-content {
  height: 27.5vh;
  width: 100%;
  margin-top: auto;
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
v-chart {
  width: 100%;
  height: 100%;
}
</style>