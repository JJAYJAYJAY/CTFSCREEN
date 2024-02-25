import {defineStore} from 'pinia'
import {ref} from "vue";

const useEventStore =defineStore('event',
    ()=>{
        const eventList = ref([])
        let timer

        return{
            eventList,
            timer
        }
    },
)

export default useEventStore