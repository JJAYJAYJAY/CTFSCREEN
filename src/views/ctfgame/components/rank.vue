<style scoped>
.c{
  color: #5194c7;
}
</style>

<template>
  <div style="height: 70%">
    <dv-border-box-7 :color="['#747fff7c','#5194c7']" style="height:100%;padding:18px">
      <p>排行榜</p>
      <div id="rank">
        <div id="container">
          <!-- <div v-for: ></div> -->
        </div>
      </div>
    </dv-border-box-7>
  </div>
</template>

<script setup lang="js">

import Chart from "@/components/chart.vue";
</script>