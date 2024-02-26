import {BASE_URL} from "@/constants/index.js";
import axios from 'axios';

export const getNotice = (data) => {
    return axios.get(BASE_URL+'/slab-match/notice',data)
}

export const getUserInfo = (data) => {
    return axios.get(BASE_URL+'/slab-match/user-info',data)
}

export const getGameInfo = (data) => {
    return axios.get("https://xhlj-cxs.dasctf.com/mock/11/slab-match/game-info",data)
}

export const getExerciseInfo = (data) => {
    return axios.get(BASE_URL+'/slab-match/exercise-info',data)
}

export const gameWebSocket = () => {
    const ws= new WebSocket('wss://fwwb-ws.dasctf.com:443/ws')
      ws.onopen=()=>{
        // console.log('websocket open');
      }

      ws.onmessage=(msg)=>{
        // console.log('获取到消息: ',msg);
      }

      ws.onclose=()=>{
        // console.log("websocket close")
      }

      ws.onerror=()=>{
        // console.log('websocket error')
      }
    return ws
}