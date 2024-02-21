<style>
@import './css/bigscreen.css';
.bg{
  /*background:url("@/assets/images/starwar/space.jpg") no-repeat;*/
  background: #010149;
}
.mainContent{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.left-sider{
  width: 25%;
  margin-top: 8%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
.right-sider{
  width: 25%;
  margin-top: 8%;
  height: 100%;
  background: rgba(241, 224, 224, 0.5);
}
.content{
  width: 50%;
  margin-top: 8%;
  height: 100%;
  background: rgba(148, 20, 20, 0.5);
}
</style>
<template>
  <dv-full-screen-container class="bg">
    <div class="screen-head">
      <div class="screen-head-title">
        <p > {{gameInfo.name}}</p>
        <span class="screen-head-title-time">
          <Icon type="md-clock" size='16' color='#FFF' />{{timer==false?'已结束':timer}}</span>
      </div>
    </div>
    <div class="mainContent">
      <div class="left-sider">
        <notice-panel :config="notice"/>
      

      </div>
      <div class="content">
        飞线图
      </div>
      <div class="right-sider">
        <ScrollEvent />
        <LoveTalk/>
      </div>
    </div>
  </dv-full-screen-container>
</template>
<script setup lang="js">
import { ref, onMounted, watch,reactive} from "vue"
import { useRoute } from "vue-router"
import { SCREENSOCKET_URL } from "@/constants/index.js"
import { getDate, TimeDown, getGameState } from '@/libs/tools'
import {BorderBox1} from "@kjgl77/datav-vue3";
import {getGameInfo, getNotice} from "@/api/game.js";
import {Icon} from "view-ui-plus";
import NoticePanel from "@/views/ctfgame/components/noticePanel.vue";
import emitter from "view-ui-plus/src/mixins/emitter.js";
import ScrollEvent from "./components/scrollEvent.vue";
import LoveTalk from "./components/LoveTalk.vue";
const route = useRoute()
const gameInfo = reactive({});
const timer = ref(null);
const interTime = ref(null);

const notice=ref({})

getNotice({
  matchId: "123"
}).then(res => {
  notice.value = res.data.data
})

onMounted(() => {
  // setInterval(_getGameInfo, 3000)
 _getGameInfo()
})
function _getGameInfo() {
  getGameInfo({
    matchId: "123"
  })
  .then(res => {
    let data =res.data.data
    gameInfo.name = data.name
    gameInfo.subtitle = data.subtitle
    gameInfo.matchLogo = data.matchLogo
    gameInfo.sponsor = data.sponsor
    gameInfo.sponsorLogo = data.sponsorLogo
    gameInfo.problemCount = data.problemCount
    gameInfo.playerCount = data.playerCount
    gameInfo.onLineCount = data.onLineCount
    gameInfo.autoPlay = data.autoPlay
    gameInfo.game_state = getGameState({
      start_at: res.data.startTimestamp,
      end_at: res.data.endTimestamp
    })
    //倒计时
    interTime.value = setInterval(() => {
      timer.value = gameInfo.game_state.time ? TimeDown(gameInfo.game_state.time) : false
      if (timer.value === false) {
        clearInterval(interTime.value)
      }
    }, 1000)
  });
  console.log(gameInfo)
}

</script>
