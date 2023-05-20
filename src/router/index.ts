import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/index.vue'
import Home from '../pages/home/index.vue'
import QuickHelp from '../pages/quickhelp/index.vue'
import Chat from '../pages/chat/index.vue'
import Profile from '../pages/profile/index.vue'

import HomePage from '../pages/home/Home.vue'


import Auth from '../pages/auth/index.vue'

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     component: Auth,
    //     redirect:'/app'
    // },
    {
        path: '/app',
        component: Layout,
        redirect: '/app/home',
        children: [
            {
                path: 'home',
                component: Home,
            },
            {
                path: 'quick-help',
                component: QuickHelp,
            },
            {
                path: 'chat',
                component: Chat,
            },
            {
                path: 'profile',
                component: Profile,
            },

        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.afterEach(() => {
    // window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    // })
})
export default router
