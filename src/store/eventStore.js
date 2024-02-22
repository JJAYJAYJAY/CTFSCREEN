import {defineStore} from 'pinia'
import {ref} from "vue";

const useEventStore =defineStore('event',
    ()=>{
        const eventList = ref([])


        return{
            eventList
        }
    },
)

export default useEventStore