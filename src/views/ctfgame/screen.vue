<style>
@import './css/bigscreen.css';
.bg{
  /*background:url("@/assets/images/starwar/space.jpg") no-repeat;*/
  background: #010149;
  height: 100vh;
}
.contentHeight{
  margin-top: 8vh;
  height: 89vh;
}
.mainContent{
  display: flex;
  justify-content: space-between;
  height: 97vh;
}
.left-sider{
  width: 25%;
  background: rgba(0,0,0,0.5);
}
.right-sider{
  width: 25%;
  background: rgba(241, 224, 224, 0.5);
}
.content{
  width: 50%;
  background: rgba(148, 20, 20, 0.5);
}
</style>
<template>
  <div class="bg">
    <div class="screen-head">
      <div class="screen-head-title">
        <p> {{gameInfo.name}}</p>
        <span class="screen-head-title-time">
          <Icon type="md-clock" size='16' color='#FFF' />{{timer==false?'已结束':timer}}</span>
      </div>
    </div>
    <div class="mainContent">
      <div class="left-sider contentHeight">
        <RankLine/>
        <sloved-challenge-pie-chart />
      </div>
      <div class="content contentHeight">
        飞线图
      </div>
      <div class="right-sider contentHeight">
        <ScrollEvent />

      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import { ref, onMounted, watch,reactive} from "vue"
import { useRoute } from "vue-router"
import { SCREENSOCKET_URL } from "@/constants/index.js"
import { getDate, TimeDown, getGameState } from '@/libs/tools'
import {BorderBox1} from "@kjgl77/datav-vue3";
import {getExerciseInfo, getGameInfo, getNotice, getUserInfo} from "@/api/game.js";
import {Icon} from "view-ui-plus";
import NoticePanel from "@/views/ctfgame/components/noticePanel.vue";
import emitter from "view-ui-plus/src/mixins/emitter.js";
import ScrollEvent from "./components/scrollEvent.vue";
import RankLine from "./components/rankLine.vue";
import { useCompetitorStore } from "@/store";
import { Competitor,Challenge } from "@/model";
import useChanllengeStore from "@/store/chanllengeStore";
import SlovedChallengePieChart from "@/views/ctfgame/components/slovedChallengePieChart.vue";
const route = useRoute()
const gameInfo = reactive({});
const timer = ref(null);
const interTime = ref(null);

const usecompetitorstore=useCompetitorStore();
const usechanllengestore=useChanllengeStore();

const notice=ref({})

getNotice({
  matchId: "123"
}).then(res => {
  notice.value = res.data.data
})

//项目加载
onMounted(() => {
  // setInterval(_getGameInfo, 3000)
 _getGameInfo()
 _getCompetitionInfo()
 _getExerciseInfo()
})

//获取赛事信息
function _getGameInfo() {
  getGameInfo({
    matchId: "123"
  })
  .then(res => {
    let data =res.data
    // console.log(res.data)
    // gameInfo.name = data.name
    // gameInfo.subtitle = data.subtitle
    // gameInfo.matchLogo = data.matchLogo
    // gameInfo.sponsor = data.sponsor
    // gameInfo.sponsorLogo = data.sponsorLogo
    // gameInfo.problemCount = data.problemCount
    // gameInfo.playerCount = data.playerCount
    // gameInfo.onLineCount = data.onLineCount
    // gameInfo.autoPlay = data.autoPlay
    // gameInfo.game_state = getGameState({
    //   start_at: data.startTimestamp,
    //   end_at: data.endTimestamp
    // })
    // //倒计时
    // interTime.value = setInterval(() => {
    //   timer.value = gameInfo.game_state.time ? TimeDown(gameInfo.game_state.time) : false
    //   if (timer.value === false) {
    //     clearInterval(interTime.value)
    //   }
    // }, 1000)
  });
  // console.log(gameInfo)
}

//获取用户信息
function _getCompetitionInfo(){
  getUserInfo({
    matchId:"123"
  })
  .then(res=>{
    let datas =res.data.data
    for(let data of datas){
      usecompetitorstore.addCompetitor(new Competitor(data))
    }
  })
}

function _getExerciseInfo(){
  getExerciseInfo({
    matchId:"123"
  })
  .then(res=>{
    let datas =res.data.data
    for(let data of datas){
      usechanllengestore.addchanllenge(new Challenge(data))
    }
  })
}
</script>
