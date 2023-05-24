import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/index.vue'
import Home from '../pages/home/index.vue'

import QuickHelp from '../pages/quickhelp/index.vue'
import QuickHelpList from '../pages/quickhelp/list.vue'
import QuickHelpDetail from '../pages/quickhelp/detail.vue'
import QuickHelpAdd from '../pages/quickhelp/editor/index.vue'

import Chat from '../pages/chat/index.vue'
import ChatList from '../pages/chat/list.vue'
import ChatRoom from '../pages/chat/chat.vue'

import Profile from '../pages/profile/index.vue'


import AuthPage from '../pages/auth/index.vue'
import RegisterPage from '../pages/auth/register.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AuthPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
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
                children: [
                    {
                        path: '',
                        component: QuickHelpList,
                    },
                    {
                        path: 'detail',
                        component: QuickHelpDetail,
                    },
                    {
                        path: 'add',
                        component: QuickHelpAdd,
                    },
                ]
            },
            {
                path: 'chat',
                component: Chat,
                children: [
                    {
                        path: '',
                        component: ChatList,
                    },
                    {
                        path: 'room',
                        meta: {no_nav: true},
                        component: ChatRoom,
                    },
                ]
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
