import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);

// 使用方法
// this.$store.commit('updateUserId', res.data.user.userId);

export default new Vuex.Store({
    state: {
        userId: '',
        userName: '',
        systemName: '后台登录系统',
        navList: [
            {
                url: '/index',
                name: '首页',
            },
            {
                url: '/person/maintain',
                name: '人员管理',
                child: [
                    {
                        url: '/person/maintain',
                        icon: 'icon-maintain',
                        name: '人员维护'
                    },
                ]
            },
            {
                url: '/notice/notice',
                name: '通知管理',
                child: [
                    {
                        url: '/notice/notice',
                        name: '通知管理'
                    },
                ]
            },
            {
                url: '/hardware/base-station',
                name: '基站管理',
                child: [
                    {
                        url: '/hardware/base-station',
                        name: '基站管理'
                    },
                ]
            },
            {
                url: '/system/setting',
                name: '系统管理',
                child: [
                    {
                        url: '/system/setting',
                        icon: 'icon-setting',
                        name: '系统设置'
                    },
                    {
                        url: '/system/role',
                        icon: 'icon-role',
                        name: '角色管理'
                    },
                    {
                        url: '/system/user',
                        icon: 'icon-user',
                        name: '用户管理'
                    },
                    {
                        url: '/system/password',
                        icon: 'icon-password',
                        name: '修改密码'
                    }
                ]
            },
        ],
        userStatus: ''
    },
    mutations: {
        updateUserId(state, data) {
            state.userId = data;
            // state.TestArr[2]=3  错误演示
            // Vue.set(state.TestArr,2,3) 正确演示

            // state.TestObj.age=11 错误演示
            // Vue.set(state.TestObj,'age',11) 正确演示
        },
        updateUserName(state, data) {
            state.userName = data;
        },
        updateNavList(state, data) {
            state.navList = data;
        },
        updateSystemName(state, data) {
            state.systemName = data;
        },
        updateUserStatus(state, data) {
            state.userStatus = data;
        },
    },
    actions: {
        // updateSystemNameFn({commit}, data) {
        //     commit('updateSystemName', data);
        // }
    },
    modules: {},
    plugins: [persistedState({storage: window.sessionStorage})]
})
