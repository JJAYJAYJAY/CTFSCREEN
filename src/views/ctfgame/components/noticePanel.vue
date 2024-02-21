<style scoped>

</style>

<template>
<dv-border-box13  style="height: 300px;padding: 20px">
  <div w50rem h24rem p3 flex="~ col" justify-center items-center bg-dark>
    <div>
      <dv-scroll-ranking-board :config="config" style="width:500px;height:300px" />
    </div>
  </div>
  <button></button>
</dv-border-box13>
</template>

<script setup lang="js">
import {reactive} from "vue";
import emitter from "view-ui-plus/src/mixins/emitter.js";


const props = defineProps({
  config: Object,
})
const config = reactive({
  data: [
    {
      name: '周口',
      value: 55,
    },
    {
      name: '南阳',
      value: 120,
    },
    {
      name: '西峡',
      value: 78,
    },
    {
      name: '驻马店',
      value: 66,
    },
    {
      name: '新乡',
      value: 80,
    },
    {
      name: '信阳',
      value: 45,
    },
    {
      name: '漯河',
      value: 29,
    },
  ],
  unit: '万元',
})
</script>