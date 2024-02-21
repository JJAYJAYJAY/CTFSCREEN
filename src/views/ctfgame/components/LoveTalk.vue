<template>
    <div class="talk">
        <button @click="getsentence">获取一句土味情话</button>
        <ul>
            <li class="item" v-for="talk in usetalkstore.talkList" :key="talk.id">{{ talk.title }}</li>
        </ul>
    </div>
</template>

<script setup lang='ts' name='LoveTalk' >
    import {reactive} from 'vue'
    import axios from "axios"
    import {nanoid} from 'nanoid'
    import { usetalkStore } from '@/store/talk';

    const usetalkstore=usetalkStore();
    console.log(usetalkstore);
    async function getsentence(){
        let result=await axios.get('https://api.uomg.com/api/rand.qinghua?format=json');
        usetalkstore.talkList.unshift({id:nanoid(),title:result.data.content})
}
</script>

<style scoped>
    .talk{
        background-color: skyblue;
        padding:10px;
        border-radius:10px;
        box-shadow:0 0 1px 1px;
        height: 120px;
        width: 800px;
        overflow: hidden;
        position: absolute;
    }
    .talk ul{
        transition: ease 1s;
    }
    .item{
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
    .item:nth-of-type(1){
        visibility: visible;
        animation-name:es-in;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        color: rgb(0, 0, 0,1);
        transition: ease 1s;
        translate:0 0;
    }
    .item:nth-of-type(2){
        color: rgb(0, 0, 0,1);
        visibility: visible;
        translate:0 120%;
    }
    .item:nth-of-type(3){
        color: rgb(0, 0, 0,1);
        visibility: visible;
        translate:0 240%;
    }
    .item:nth-of-type(4){
        visibility: hidden;
        opacity: 0;
        translate:0 360%;
    }
</style>