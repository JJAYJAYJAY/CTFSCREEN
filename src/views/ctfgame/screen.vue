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
  background: rgba(0,0,0,0.5);
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
        <p> {{gameInfoStore.gameInfo.name}}</p>
        <span class="screen-head-title-time">
          <Icon type="md-clock" size='16' color='#FFF' />{{timer==false?'已结束':timer}}</span>
      </div>
    </div>
    <div class="mainContent">
      <div class="left-sider contentHeight">
        <live-people/>
        <notice-panel/>
        <ScrollEvent />
      </div>
      <div class="content contentHeight">
        飞线图
      </div>
      <div class="right-sider contentHeight">
        <sloved-challenge-pie-chart />
        <rank/>
      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import { ref, onMounted, watch,reactive} from "vue"
import {getExerciseInfo, getGameInfo, getNotice, getUserInfo} from "@/api/game.js";
import {Icon} from "view-ui-plus";
import NoticePanel from "@/views/ctfgame/components/noticePanel.vue";
import ScrollEvent from "./components/scrollEvent.vue";
import livePeople from "./components/livePeople.vue";
import { useCompetitorStore } from "@/store";
import { Competitor,Challenge } from "@/model";
import useChanllengeStore from "@/store/chanllengeStore";
import SlovedChallengePieChart from "@/views/ctfgame/components/slovedChallengePieChart.vue";
import Rank from "@/views/ctfgame/components/rank.vue";
import {getGameState} from "@/libs/tools.js";
import useGameInfoStore from "@/store/gameInfoStore.js";
const interTime = ref(null);
const gameInfo = reactive({});
const timer = ref(null);

const usecompetitorstore=useCompetitorStore();
const usechanllengestore=useChanllengeStore();
const gameInfoStore = useGameInfoStore();

const notice=ref({})

getNotice({
  matchId: "123"
}).then(res => {
  notice.value = res.data.data
})

//项目加载
onMounted(() => {
  setInterval(_getGameInfo, 1000)
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
    let data =res.data.data
    console.log(res.data)
    gameInfoStore.gameInfo.name = data.name
    gameInfoStore.gameInfo.subtitle = data.subtitle
    gameInfoStore.gameInfo.matchLogo = data.matchLogo
    gameInfoStore.gameInfo.sponsor = data.sponsor
    gameInfoStore.gameInfo.sponsorLogo = data.sponsorLogo
    gameInfoStore.gameInfo.problemCount = data.problemCount
    gameInfoStore.gameInfo.playerCount = data.playerCount
    gameInfoStore.gameInfo.onLineCount = data.onLineCount
    gameInfoStore.gameInfo.autoPlay = data.autoPlay
    gameInfoStore.gameInfo.game_state = getGameState({
      start_at: data.startTimestamp,
      end_at: data.endTimestamp
    })
    //倒计时
    interTime.value = setInterval(() => {
      timer.value = gameInfo.game_state.time ? TimeDown(gameInfo.game_state.time) : false
      if (timer.value === false) {
        clearInterval(interTime.value)
      }
    }, 1000)
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
    console.log(datas)
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
