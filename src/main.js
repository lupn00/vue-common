import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

Vue.use(ElementUI);
Vue.use(VideoPlayer);

Vue.config.productionTip = false;

import rules from "./assets/js/rules";

Vue.prototype.$rules = rules;

// 全局过滤器
import * as filters from './assets/js/filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 页面加载前
router.beforeEach((to, from, next) => {
    // 页面加title
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // 回到登录页面，初始化store
    // if (to.path === '/login') {
    //     store.commit('updateUserId', '');
    //     store.commit('updateUserName', '');
    //     store.commit('updateNavList', []);
    //     store.commit('updateUserStatus', '');
    // }

    // 判断userId是否存在
    // let userId = store.state.userId;
    // if (!userId && to.path !== '/login') {
    //     next({
    //         path: '/login'
    //     })
    // } else {
    //     next();
    // }

    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
