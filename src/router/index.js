import {createRouter, createWebHistory} from 'vue-router'
import screen from "@/views/ctfgame/screen.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            meta: {
                title: '可视化大屏'
            },
            component: screen
        }
    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
})

export default router;