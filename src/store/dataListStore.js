import {defineStore} from 'pinia'
import {ref} from "vue";

const useDataStore =defineStore('data',
    ()=>{
        const dataList = ref([])


        return{
            dataList
        }
    },
)

export default useDataStore