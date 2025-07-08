export const barChartsOption = {
    backgroundColor: `#05224d`,
    tooltip: {
        show: true,
        trigger: `axis`,
        // formatter: '',
        axisPointer: {
            type: `shadow`
        }
    },
    grid: {
        top: `15%`,
        left: `1%`,
        right: `1%`,
        bottom: `8%`,
        containLabel: true
    },
    legend: {
        show: false,
    },
    xAxis: [{
        type: `category`,
        boundaryGap: true,
        axisLine: {
            show: true,
            lineStyle: {
                color: `rgba(255,255,255,.5)`
            }
        },
        axisLabel: {
            textStyle: {
                color: `#fff`,
                margin: 16
            }
        },
        axisTick: {
            show: false
        },
        data: [],
    }],
    yAxis: [{
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
            textStyle: {
                color: `#65F5FD`
            }
        },
        axisTick: {
            show: false
        }
    }],
    series: [{
        name: ``,
        type: `bar`,
        stack: `ip`,
        barWidth: 20,
        tooltip: {
            show: true
        },
        label: {
            show: false,
            position: `top`,
            textStyle: {
                color: `#fff`
            }
        },
        itemStyle: {
            normal: {
                color: {
                    colorStops: [{
                        offset: 0,
                        color: `rgba(0,179,202,.9)`
                    }, {
                        offset: 1,
                        color: `rgba(2,39,47,.5)`
                    }],
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: `linear`,
                    global: false
                }
            }
        },
        data: [],
    }]
};
export const lineChartsOption = {
  backgroundColor: `#05224d`,
  tooltip: {
    show: true,
    trigger: `axis`,
    // formatter: '',
    axisPointer: {
      type: `shadow`
    }
  },
  grid: {
    top: `15%`,
    left: `1%`,
    right: `1%`,
    bottom: `8%`,
    containLabel: true
  },
  legend: {
    show: false,
  },
  xAxis: [{
    type: `category`,
    boundaryGap: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: `rgba(255,255,255,.5)`
      }
    },
    axisLabel: {
      textStyle: {
        color: `#fff`,
        margin: 16
      }
    },
    axisTick: {
      show: false
    },
    data: []
  }],
  yAxis: [{
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
      textStyle: {
        color: `#65F5FD`
      }
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: ``,
    type: `line`,
    showAllSymbol: true,
    symbol: `emptyCircle`,
    symbolSize: 6,
    lineStyle: {
      normal: {
        color: ``
      }
    },
    label: {
      show: false
    },
    itemStyle: {
      normal: {
        color: ``
      }
    },
    tooltip: {
      show: true
    },
    data: []
  }]
};
