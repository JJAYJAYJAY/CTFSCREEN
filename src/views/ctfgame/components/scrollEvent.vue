<style scoped>
    .event_online{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: ease 1s;
    }
    .info{
        width: 100%;
        height: 100px;
        padding: 10px;
        color: aliceblue;
        background-color:  rgba(1, 215, 211, 0.252);
        border-radius: 10px;
        border: solid rgba(0, 9, 47, 0.683) 1px;
        position: absolute;
        visibility: hidden;
        translate:0 360%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
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
        translate:0 0;
        transition: ease 1s;
    }
    .info:nth-of-type(2){
        visibility: visible;
        translate:0 120%;
        transition: ease 1s;
    }
    .info:nth-of-type(3){
        visibility: visible;
        translate:0 240%;
        transition: ease 1s;
    }
    .info:nth-of-type(4){
        visibility: hidden;
        opacity: 0;
        translate:0 360%;
        transition: ease 1s;
    }
    .info span{
        font-weight: bold;
        color: rgb(160, 208, 250);
    }
</style>

<template>
    <dv-border-box-12 style="padding: 20px; height: 380px;">
        <div class="event_online">
            <div class="info" v-for="data in usedatastore.dataList" :key="data.id">
                <p>{{ data.time }}</p>
                <div v-if="data.eventType=='FIRST_BLOOD'" style="color: rgb(212, 95, 95);">[FirstBlood]</div>
                <span>{{ data.nickname }}</span>成功解决了题目<span>[{{ data.problemType }}]{{ data.problemName }}</span>,取得了{{ data.point }}分
            </div>
        </div>
    </dv-border-box-12>
</template>

<script setup lang="js">
import { gameWebSocket } from '@/api/game';
import { getDate } from '@/libs/tools';
import { usedataStore } from '@/store/dataList';
import { nanoid } from 'nanoid';

    //获取dataStore
    const usedatastore=usedataStore();
    //用于临时储存信息
    let data_store=([]);

    const ws=gameWebSocket();
    //重写ws的onmessage方法，对接收数据进行处理
    ws.onmessage=(msg)=>{
        const datas=JSON.parse(msg.data);
        for(let data of datas.params){
            data.time=getDate(data.createTimestamp,'date');
            data.id=nanoid();//随机生成一个id
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