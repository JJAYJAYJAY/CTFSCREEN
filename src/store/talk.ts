import {defineStore} from 'pinia'

export const usetalkStore =defineStore('talk',{
    state(){
        return{
            talkList :[
                {id:'sentence1',title:'t1'},
                {id:'sentence2',title:'t2'},
                {id:'sentence3',title:'t3'}
            ]
        }
    }
})