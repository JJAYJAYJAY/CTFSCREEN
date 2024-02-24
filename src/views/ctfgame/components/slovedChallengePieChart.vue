<style scoped>

</style>

<template>
  <dv-border-box-8 style="height: 240px; padding:18px" >
    <chart :option="option" theme="" :size="size"></chart>
  </dv-border-box-8>
</template>

<script setup lang="js">
import Chart from "@/components/chart.vue";
import {ref} from "vue";

const size=ref({width:'360px',height:'240px'})
const option=ref({});

const pieData=ref([
  { value: 108, name: 'WEB' },
  { value: 735, name: 'CRYPTO' },
  { value: 580, name: 'MISC' },
  { value: 484, name: 'RESERVE' },
  { value: 300, name: 'PWN' }
])
option.value = {
  title: {
    text: '解题分布情况',
    textStyle: {
      color: '#2E7EEA'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: "vertical",
    padding:5,
    left:0,
    top:25,
    textStyle: {
      color: '#2E7EEA'
    },
  },
  series: [
    {
      name: '解题情况',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      left: 120,
      width: 200,
      height: 200,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: true,
        fontSize: 10,
      },
      labelLine: {
        show: true,
        length: 5,
        length2: 5,
        lineStyle:{
          color: '#2E7EEA'
        }
      },
      emphasis: {
        label: {
          show: true,
          fontWeight: 'bold'
        }
      },
      data: pieData.value
    }
  ]
};

setInterval(()=>{
  pieData.value.forEach((item)=>{
    item.value=Math.floor(Math.random()*1000)
  })
  option.value = {
    series: [
      {
        data: pieData.value
      }
    ]
  };
}, 1000);
</script>