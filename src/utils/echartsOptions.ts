export const chartsColor = [`#01C0C8`, `#165DFF`, `#16C0FF`, `#015DC8`, `#FF0000`, `#FF1493`, `#FF00FF`, `#00FFFF`, `#00FF7F`, `#008000`, `#00FF00`, `#008080`, `#0000FF`, `#00008B`, `#000080`]

export const lineAndBarChartsOption = {
    backgroundColor: `#05224d`,
    tooltip: {
        show: true,
        trigger: `axis`,
        formatter: null,
        valueFormatter: null,
    },
    grid: {
        top: `15%`,
        left: `1%`,
        right: `1%`,
        bottom: `8%`,
        containLabel: true
    },
    legend: {
        show: true,
        textStyle: {
            color: `#65F5FD`,
        }
    },
    xAxis: [{
        type: `category`,
        boundaryGap: true,
        axisLine: {
            show: true,
            lineStyle: {
                color: `rgba(255, 255, 255, .5)`
            }
        },
        axisLabel: {
            color: `#fff`,
            margin: 16,
        },
        axisTick: {
            show: false
        },
        data: []
    }],
    yAxis: [{
        show: true,
        type: `value`,
        name: '',
        min: 0,
        max: null,
        splitNumber: 7,
        splitLine: {
            show: true,
            lineStyle: {
                color: `#0a3256`
            }
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            margin: 20,
            color: `#65F5FD`,
        },
        axisTick: {
            show: false
        }
    }, {
        show: true,
        type: `value`,
        name: '',
        min: 0,
        splitNumber: 7,
        splitLine: {
            show: true,
            lineStyle: {
                color: `#0a3256`
            }
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            margin: 20,
            color: `#65F5FD`,
        },
        axisTick: {
            show: false
        }
    }],
    series: [{
        name: ``,
        type: ``,
        // 柱状图配置项
        stack: ``,
        barWidth: 20,
        // 折线图配置项
        showAllSymbol: true,
        symbol: `emptyCircle`,
        symbolSize: 6,
        areaStyle: null,

        tooltip: {
            show: true
        },
        label: {
            show: false
        },
        itemStyle: {
            color: ``
        },
        lineStyle: {
            color: ``
        },
        yAxisIndex: 0,
        seriesIndex: 0,
        data: []
    }]
}
