<style scoped>
.c{
  color: #6fd6f6c2;
}
</style>

<template>
  <div style="height: 70%">
    <dv-border-box-7 :color="['#747fff7c','#5194c7']" style="height:100%;padding:18px">
      <chart :option="option" theme="" :size="size"></chart>
    </dv-border-box-7>
  </div>
</template>

<script setup lang="js">
import Chart from "@/components/chart.vue";
import { useCompetitorStore } from "@/store";
import {onMounted, reactive, ref, watch} from 'vue'

const size=ref({width:'100%',height:'100%'})
const option=ref({});

let usecompetitorstore=useCompetitorStore()

let user_names=ref([]);
let user_score=ref([]);
onMounted(()=>{
  watch(usecompetitorstore.userMap,(newVal,oldVal)=>{
    let users=Object.values(newVal)
    for(let user of users){
      user_names.value.push(user.nickname)
      user_score.value.push(user.score)
    }
    option.value={
      series: [
        {
          data: user_score.value
        }
      ],
      yAxis: {
        data:user_names.value
      }
    }
  })
})



//图表参数配置
option.value = {
  grid:{
    left:'15%',
    height:'80%'
  },
  title:{//标题设置
    text: '实时排行榜',
    textStyle: {
      color: '#2E7EEA'
    }
  },
  yAxis: {//y轴（隐藏）设置
    type: 'category',
    data: user_names.value,
    inverse:'false',
    axisLine:{//坐标轴
      show:false
    },
    axisTick:{//轴刻度线
      show:false
    },
    axisLabel:{//标签
      fontWeight:'bold',
      color:'#6fd6f6c2'
    },
    nameTruncate:{
      maxWidth:5,
      ellipsis:'..'
    }
  },
  xAxis: {//x轴设置
    type: 'value',
    show: false
  },
  series: [
    {//数据设置
      realtimeSort: true,
      data: user_score.value,
      type: 'bar',//以柱状显示
      barWidth:'50%',
      label: {//在右方显示数据（分数）
        show: true,
        position: 'right',
        valueAnimation: true,
        color:'white'
      },
      showBackground: true,
      backgroundStyle: {//背景色
        color: 'rgba(180, 180, 180, 0.2)',
      }
    }
  ]
};

setInterval(()=>{
  for(let i=0;i<user_names.value.length;i++){
    user_score.value[i]+=Math.floor(Math.random()*21-10)
  }
  option.value={
    series: [
      {
        data: user_score.value
      }
    ],
    yAxis: {
      data:user_names.value
    }
  }
},1000)

</script>