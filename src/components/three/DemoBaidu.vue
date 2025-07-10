<script setup>
import { onMounted, ref } from 'vue';
import * as mapvthree from '@baidumap/mapv-three';
// import * as THREE from 'three';

const container = ref();

onMounted(() => {
    const engine = new mapvthree.Engine(container.value, {
        map: {
            provider: new mapvthree.BaiduVectorTileProvider(),
            center: [105.943271,29.348709],
            heading: 330,
            pitch: 60,
            range: 700,
        },
        rendering: {
            enableAnimationLoop: true,
        },
    });

    const exampleDataSource = new mapvthree.GeoJSONDataSource.fromGeoJSON({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [105.941614,29.347261],
                },
            },
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [105.941767,29.352518],
                },
            },
        ],
    });

    const examplePoint = engine.add(new mapvthree.Circle({
        size: 30,
    }));
    examplePoint.dataSource = exampleDataSource;

    examplePoint.addEventListener('click', (e) => {
        console.log(e);
    });

    return () => {
        engine.dispose();
    };
});
</script>

<template>
  <div ref="container" :style="{ width: '100%', height: '450px', position: 'relative' }">
    <!-- 容器内容 -->
  </div>
</template>

<style scoped>
/* 组件专属样式 */
</style>