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
gameInfoStore.gameInfo={
  onLineCount:0
}
console.log(useGameInfoStore().gameInfo)
let data = [];
let now = new Date();
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
data.push({
  name: now.toString(),
  value: [
    [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
    gameInfoStore.gameInfo.onLineCount
  ]
});
// for (let i = 0; i < 1000; i++) {
//   data.push(randomData());
// }
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
    maxInterval:1000
    // splitLine: {
    //   show: false
    // }
  },
  yAxis: {
    type: 'value',
    // boundaryGap: [0, '100%'],
    // splitLine: {
    //   show: false
    // }
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
    watch(gameInfoStore.gameInfo,()=>{
      if(data.length>10){
        data.shift()
      }
      now = new Date();
      data.push({
        name: now.toString(),
        value: [
          // [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
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
// setInterval(()=>{
//   useGameInfoStore().gameInfo.onLineCount+=21;
// },1000)
  // setInterval(()=>{
  //   useGameInfoStore().gameInfo.onLineCount+=Math.random() * 21;
  // },1000)
// setInterval(function () {
//   for (var i = 0; i < 5; i++) {
//     data.shift();
//     data.push(randomData());
//   }
//   option.value = {
//     series: [
//       {
//         data: data
//       }
//     ]
//   };
// }, 1000);
// function randomData() {
//   now = new Date(+now + oneDay);
//   value = value + Math.random() * 21 - 10;
//   return {
//     name: now.toString(),
//     value: [
//       [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//       Math.round(value)
//     ]
//   };
// }

setInterval(()=>{
  const gameInfoStore=useGameInfoStore()
  console.log(gameInfoStore.gameInfo.onLineCount++)
  console.log('setInterval')
},1000)

</script>