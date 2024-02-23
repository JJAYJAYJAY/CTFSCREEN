<style scoped>
</style>

<template>
  <dv-border-box-13 style="height: 240px; padding:18px" >
      <div ref="chart" style="width:360px;height: 240px"></div>
  </dv-border-box-13>
</template>

<script setup lang="js">
import * as echarts from 'echarts';
import 'echarts/theme/macarons.js';
import {getCurrentInstance, onMounted, ref} from "vue";

const option=ref({});
let chart = ref();
let data = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
  data.push(randomData());
}
option.value = {
  title: {
    text: 'Dynamic Data & Time Axis'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
      );
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data: data
    }
  ]
};



onMounted(()=>{
  let myChart = echarts.init(chart.value, 'macarons');
  setInterval(function () {
    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }
    myChart.setOption({
      series: [
        {
          data: data
        }
      ]
    });
  }, 1000);
  option && myChart.setOption(option.value);
})

function randomData() {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  };
}


</script>