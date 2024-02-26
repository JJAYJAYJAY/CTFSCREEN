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
import {onMounted, ref, watch} from "vue";
import Chart from "@/components/chart.vue";
import useGameInfoStore from "@/store/gameInfoStore.js";

const size=ref({width:'100%',height:'120%',top:'-10%',position:'relative'})
const option=ref({});
const gameInfoStore=useGameInfoStore()
console.log(useGameInfoStore().gameInfo.onLineCount)

let data = [];
let now = new Date();
let value = Math.random() * 1000;
data.push({
  name: now.toString(),
  value: [
    [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    gameInfoStore.gameInfo.onLineCount
  ]
});

for(let i = 1; i < 100; i++) {
  now = new Date(+now + 60*1000);
  gameInfoStore.gameInfo.onLineCount +=(Math.random() * 21 - 10);
  data.push({
    name: now.toString(),
    value: [
      now.getTime(),
      gameInfoStore.gameInfo.onLineCount
    ]
  });
}

setInterval(()=>{
  now = new Date(+now + 60*1000);
  gameInfoStore.gameInfo.onLineCount += (Math.random() * 21 - 10);
},1000)

option.value = {
  title: {
    text: '在线人数',
    top:'8%'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds() +
           ' '+
          params.value[1]
      );
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    minInterval:60 * 1000,
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
      smooth:1
    }
  ]
};
  onMounted(()=>{
    watch(gameInfoStore.gameInfo,()=>{
      if(data.length>100){
        data.shift()
      }
      data.push({
        name: now.toString(),
        value: [
          now.getTime(),
          gameInfoStore.gameInfo.onLineCount
        ]
      });
      console.log(data)
      option.value={
        series: [
          {
            data:data
          }
        ]
      }
    })
  })

</script>