import {defineStore} from 'pinia'
import {reactive, ref} from 'vue'
import {Competitor} from "@/model";

const useCompetitorStore = defineStore(
    'user',
    ()=>{
        const userList = ref([
            {
                // name:new Competitor()
            }
        ])

        const setCompetitor = (data)=>{

        }

        return{
            userList,
            setCompetitor
        }
    }
)

export default useCompetitorStore