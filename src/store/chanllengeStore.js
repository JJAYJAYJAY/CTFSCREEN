import {defineStore} from 'pinia'
import {ref} from "vue";

const useChanllengeStore =defineStore('chanllenge',
    ()=>{
        const chanllengeList = ref([])

        const addchanllenge = (data)=>{
            for(let chanllenge of chanllengeList.value){
                if(chanllenge.id==data.id){
                    return false;
                }
            }
            chanllengeList.value.push(data)
            return true
        }
        return{
            chanllengeList,
            addchanllenge
        }
    },
)

export default useChanllengeStore