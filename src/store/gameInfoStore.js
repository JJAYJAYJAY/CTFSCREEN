import {defineStore} from 'pinia'
import {ref} from "vue";

const useGameInfoStore = defineStore('gameInfo',
    ()=>{
        const gameInfo = ref({
            name: '',
            subtitle: '',
            matchLogo: '',
            sponsor:'',
            sponsorLogo:'',
            problemCount: 0,
            playerCount: 0,
            onLineCount: 0,
            autoPlay: true,
            startTimeStamp: 0,
            endTimeStamp: 0,
        })

        return{
            gameInfo,
        }
    },
)

export default useGameInfoStore