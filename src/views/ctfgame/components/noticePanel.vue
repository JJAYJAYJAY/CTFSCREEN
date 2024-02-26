<style scoped>

</style>

<template>
  <dv-border-box-12 style="padding: 20px; height: 28%;">
    <p>公告</p>
      <div class="notice">
        <div class="info" v-for="data in noticeList" :key="data.id">
          <p>{{ data.time }}</p>
          <span>{{ data.title }}</span>
          <p>{{ data.content }}</p>
        </div>
      </div>
  </dv-border-box-12>
</template>

<script setup lang="js">

import {getNotice} from "@/api/game.js";
import {ref} from "vue";
import {Scroll} from "view-ui-plus";

const noticeList = ref([]);
getNotice().then(res=>{
  noticeList.value = res.data.data;
})
</script>