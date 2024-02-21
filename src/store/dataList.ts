import {defineStore} from 'pinia'

export const usedataStore =defineStore('data',{
    state(){
        return{
            dataList:[],
        }
    }
})