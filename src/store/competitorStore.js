import {defineStore} from 'pinia'
import {reactive, ref} from 'vue'
import {Competitor} from "@/model";

const useCompetitorStore = defineStore(
    'user',
    ()=>{
        const userList = ref([])

        const addCompetitor = (data)=>{
            for(let user of userList.value){
                if(user.id==data.id){
                    return false;
                }
            }
            userList.value.push(data)
            return true
        }

        return{
            userList,
            addCompetitor
        }
    }
)

export default useCompetitorStore