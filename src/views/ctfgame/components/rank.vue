<style scoped>

</style>

<template>
  <div style="height: 30%">
    <dv-border-box-9  style="height:100%;padding:18px">
      <chart :option="option" theme="" :size="size"></chart>
    </dv-border-box-9>
  </div>
</template>

<script setup lang="js">

import Chart from "@/components/chart.vue";
</script>