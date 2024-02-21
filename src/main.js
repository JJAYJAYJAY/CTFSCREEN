import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import router from "@/router";
import DataVVue3 from '@kjgl77/datav-vue3'
import { createPinia } from 'pinia'

const pinia=createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ViewUIPlus,)
app.use(router)
app.use(DataVVue3);
app.mount('#app')
