<style scoped>
.event_online {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation-name: es-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.info {
    width: 100%;
    height: 31%;
    padding: 2% 3%;
    color: aliceblue;
    background-color: rgba(1, 215, 211, 0.252);
    border-radius: 10px;
    border: solid rgba(0, 9, 47, 0.683) 1px;
    position: absolute;
    visibility: hidden;
    translate: 0 360%;
}

@keyframes es-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.info:nth-of-type(1) {
    visibility: visible;
    animation-name: es-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    translate: 0 0;
    transition: ease 1s;
}

.info:nth-of-type(2) {
    visibility: visible;
    translate: 0 110%;
    transition: ease 1s;
}

.info:nth-of-type(3) {
    visibility: visible;
    translate: 0 220%;
    transition: ease 1s;
}

.info:nth-of-type(4) {
    visibility: hidden;
    opacity: 0;
    translate: 0 330%;
    transition: ease 1s;
}

.info span {
    font-weight: bold;
    color: rgb(160, 208, 250);
    text-wrap: unrestricted;
}
.event_describtion{
    word-break: break-all;
    height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<template>
    <dv-border-box-12 style="padding: 4%; height: 42%;">
        <div class="event_online">
            <div class="info" v-for="data in useeventstore.eventList" :key="data.id">
                <p>{{ data.time }}</p>
                <div v-if="data.eventType == 'FIRST_BLOOD'" style="color: rgb(212, 95, 95);">[FirstBlood]</div>
                <p class="event_describtion">
                <span>{{ data.nickname }}</span>
                成功解决了题目
                <span>[{{ data.problemType }}]{{ data.problemName }}</span>
                ,取得了{{data.point }}分
                </p>
            </div>
        </div>
    </dv-border-box-12>
</template>

<script setup lang="js">
import { gameWebSocket } from '@/api/game';
import { getDate } from '@/libs/tools';
import { useEventListStore } from '@/store';
import { nanoid } from 'nanoid';

//获取dataStore
//事件信息不要存储，处理好后就行，这样太内存占用太大
const useeventstore = useEventListStore();
//用于临时储存信息
let data_store = ([]);

const ws = gameWebSocket();
//重写ws的onmessage方法，对接收数据进行处理
ws.onmessage = (msg) => {
    const datas = JSON.parse(msg.data);
    for (let data of datas.params) {
        data.time = getDate(data.createTimestamp, 'date');
        data.id = nanoid();//随机生成一个id
        data_store.push(data);
    }
    // console.log(data_store);
}

//设置定时器，每隔2秒将临时储存的信息加入dataList中
if (useeventstore.timer !== null) {
    clearInterval(useeventstore.timer)
}
    useeventstore.timer=setInterval(() => {
        if (data_store.length > 0) {
            useeventstore.eventList.unshift(data_store.pop());
            if(useeventstore.eventList.length>10){
                useeventstore.eventList.pop()
            }
            console.log(useeventstore.eventList)
        }
    }, 2000)
</script>