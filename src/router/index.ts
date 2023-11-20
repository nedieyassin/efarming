import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import Layout from '../layout/index.vue';
import Home from '../pages/home/index.vue';

import QuickHelp from '../pages/quickhelp/index.vue';
import QuickHelpList from '../pages/quickhelp/list.vue';
import QuickHelpDetail from '../pages/quickhelp/detail.vue';
import QuickHelpAdd from '../pages/quickhelp/editor/index.vue';

import Users from '../pages/users/index.vue';
import UsersList from '../pages/users/list.vue';
// import UsersDetail from '../pages/users/detail.vue'

import Notification from '../pages/notification/index.vue';
import NotificationList from '../pages/notification/list.vue';
import NotificationRoom from '../pages/notification/chat.vue';

import Profile from '../pages/profile/Profile.vue';


import AuthPage from '../pages/auth/index.vue';
import RegisterPage from '../pages/auth/register.vue';

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
                path: 'users',
                component: Users,
                children: [
                    {
                        path: '',
                        component: UsersList,
                    },
                ]
            },
            {
                path: 'notifications',
                component: Notification,
                children: [
                    {
                        path: '',
                        component: NotificationList,
                    },
                    {
                        path: 'room',
                        meta: {no_nav: true},
                        component: NotificationRoom,
                    },
                ]
            },
            {
                path: 'profile',
                component: Profile,
            },
            {
                path: '/:pathMatch(.*)',
                redirect: '/app/home',
            },


        ]
    },
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
