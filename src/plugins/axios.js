"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const prefix = "/api";
const _axios = axios.create(config);

// 添加request拦截器---请求发送之前数据的统一处理
_axios.interceptors.request.use(
    config => { // 在发送请求之前做些什么
        config.url = prefix + config.url;
        // get请求增加时间戳 避免ie下get请求缓存
        let t = config.method === 'get' ? ('?t=' + (+new Date())) : '';

        if (config.url === '/sendNoticeMp3') {
            // mp3 上传blob格式
            config.processData = false;// 告诉axios不要去处理发送的数据(重要参数)
            config.contentType = false;// 告诉axios不要去设置Content-Type请求头
        } else {
            config.url = config.url + t;
        }
        return config;
    },
    error => { // 处理请求错误
        return Promise.reject(error);
    }
);

// 添加response拦截器---请求完成后数据的统一处理
_axios.interceptors.response.use(
    response => {
        // 请求后统数据一处理
        if (response.data.code === '1') {
            return response.data;
        } else if (response.data.code === 'E0001') {
            Vue.prototype.$message.error('身份验证失败');
            window.location.href = '/login';
        } else {
            Vue.prototype.$message.error(response.data.msg);
        }
    },
    error => {
        // 请求失败后统一处理
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    error.message = '内部进行重定向';
                    break;
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '登录超时，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
        } else {
            error.message = "连接到服务器失败"
        }
        Vue.prototype.$message.error(error.message);
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
