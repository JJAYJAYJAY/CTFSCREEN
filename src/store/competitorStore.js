import {defineStore} from 'pinia'
import {reactive, ref} from 'vue'
import {Competitor} from "@/model";

const useCompetitorStore = defineStore(
    'user',
    ()=>{
        const userMap = reactive({})
        const rank=reactive([])

        const addCompetitor = (data)=>{
            userMap[data.id]=data
        }

        return{
            userMap,
            addCompetitor
        }
    }
)

export default useCompetitorStore