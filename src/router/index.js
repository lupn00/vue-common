import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    { // 登录
        path: '/login',
        component: () => import( '../views/login.vue'),
        meta: {title: '登录'},
    },
    { // 系统管理
        path: '/system',
        component: () => import( '../components/home.vue'),
        meta: {title: '系统管理'},
        children: [
            {
                path: 'role',
                component: () => import( '../views/system/role.vue'),
                meta: {title: '角色管理'},
            },
            {
                path: 'user',
                component: () => import( '../views/system/user.vue'),
                meta: {title: '用户管理'},
            },
            {
                path: 'password',
                component: () => import( '../views/system/password.vue'),
                meta: {title: '修改密码'},
            }
        ]
    },
    { // 登录
        path: '/',
        redirect: '/login'
    },
    { // 404
        path: '*',
        component: () => import( '../views/404.vue'),
        meta: {title: '404'}
    },
    { // video
        path: '/video',
        component: () => import( '../views/video.vue'),
        meta: {title: '视频'},
    },
    { // demo
        path: '/demo',
        component: () => import( '../views/demo.vue'),
        meta: {title: 'demo'},
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
