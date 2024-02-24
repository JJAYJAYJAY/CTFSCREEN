<style scoped>
</style>

<template>
  <div style="height: 30%">
    <dv-border-box-13  style="width:100%;padding:18px">
      <chart :option="option" theme="macarons" :size="size"></chart>
    </dv-border-box-13>
  </div>
</template>

<script setup lang="js">
import 'echarts/theme/macarons.js'
import {onMounted, ref} from "vue";
import Chart from "@/components/chart.vue";

const size=ref({width:'100%',height:'100%'})
const option=ref({});
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
      data: data,
      height: '25%',
      width: '100%'
    }
  ]
};
setInterval(function () {
  for (var i = 0; i < 5; i++) {
    data.shift();
    data.push(randomData());
  }
  option.value = {
    series: [
      {
        data: data
      }
    ]
  };
}, 1000);
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