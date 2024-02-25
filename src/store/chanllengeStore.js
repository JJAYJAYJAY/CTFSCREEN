import {defineStore} from 'pinia'
import {reactive, ref} from "vue";

const useChanllengeStore =defineStore('chanllenge',
    ()=>{
        const chanllengeMap = reactive({});

        const addchanllenge = (data)=>{
            chanllengeMap[data.id]=data;
        }
        return{
            chanllengeMap,
            addchanllenge
        }
    },
)

export default useChanllengeStore