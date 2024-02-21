import {createApp, watch} from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import router from "@/router";
import DataVVue3 from '@kjgl77/datav-vue3'
import { createPinia } from 'pinia'

const pinia=createPinia()
pinia.use(({ store }) => {
    // Load initial state from sessionStorage
    const savedState = sessionStorage.getItem(store.$id)
    if (savedState) {
        store.$patch(JSON.parse(savedState))
    }

    // Watch for changes in the state and save to sessionStorage
    watch(() => store.$state, (newState) => {
        sessionStorage.setItem(store.$id, JSON.stringify(newState))
    }, { deep: true })
})

const app = createApp(App)
app.use(pinia)
app.use(ViewUIPlus,)
app.use(router)
app.use(DataVVue3);
app.mount('#app')
