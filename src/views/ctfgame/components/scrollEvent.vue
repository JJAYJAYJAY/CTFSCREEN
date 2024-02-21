<style scoped>
    .event_online{
        background-color: aliceblue;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: ease 1s;
    }
    .info{
        color: rgb(0, 0, 0,0);
        background-color:  rgb(26, 255, 251);
        margin: 10px;
        transition: ease 1s;
        position: absolute;
        visibility: hidden;
    }
    @keyframes es-in{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
    .info:nth-of-type(1){
        visibility: visible;
        animation-name:es-in;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        color: rgb(0, 0, 0,1);
        transition: ease 1s;
        translate:0 0;
    }
    .info:nth-of-type(2){
        color: rgb(0, 0, 0,1);
        visibility: visible;
        translate:0 120%;
    }
    .info:nth-of-type(3){
        color: rgb(0, 0, 0,1);
        visibility: visible;
        translate:0 240%;
    }
    .info:nth-of-type(4){
        visibility: hidden;
        opacity: 0;
        translate:0 360%;
    }
</style>

<template>
    <dv-border-box-12 style="padding: 20px; height: 600px;">
        <ul class="event_online">
            <li class="info" v-for="data in usedatastore.dataList" :key="data.id">
                {{ data.nickname }}
            </li>
        </ul>
    </dv-border-box-12>
</template>

<script setup lang="js">
import { gameWebSocket } from '@/api/game';
import { getDate } from '@/libs/tools';
import { usedataStore } from '@/store/dataList';
import {ref} from 'vue';

    //获取dataStore
    const usedatastore=usedataStore();
    //用于临时储存信息
    let data_store=([]);

    const ws=gameWebSocket();
    //重写ws的onmessage方法，对接收数据进行处理
    ws.onmessage=(msg)=>{
        const datas=JSON.parse(msg.data);
        for(let data of datas.params){
            data_store.push(data);
        }
        console.log(data_store);    
    }

    //设置定时器，每隔2秒将临时储存的信息加入dataList中
    setInterval(()=>{
        if(data_store.length>0){
           usedatastore.dataList.unshift(data_store.pop());
        }
    },2000)
</script>