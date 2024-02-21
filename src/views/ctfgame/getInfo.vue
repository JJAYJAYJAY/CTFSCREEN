<template>
  <div v-for="data in datalist" :key=data.userId>
    <span>{{ data.nickname }}</span>
  </div>
</template>

<script setup lang='js'>
import {ref} from 'vue'
import {gameWebSocket} from '@/infoget/gameWebSocket'
// import{getinfo}from '@/infoget/test'
// getinfo()

let datalist=ref([{
  createTimestamp: 1703747123829,
  eventType: "FIRST_BLOOD",
  nickname: "Donat",
  point: 200,
  problemId: "10",
  problemName: "find_crossing_and_read",
  problemType: "Web",
  userId: "88adb8a7-633c-4a55-b88c-c7d8885228ff",
}]);

const ws=gameWebSocket()

ws.onopen=()=>{
  console.log('websocket open');
}

ws.onmessage=(msg)=>{
  let datas=JSON.parse(msg.data)
  for(let d of datas.params){
    datalist.value.unshift(d)
  }
  console.log(datalist.value)
}

ws.onclose=()=>{
  console.log("websocket close")
}

ws.onerror=()=>{
  console.log('websocket error')
}
</script>
<style scoped>
</style>