import axios from 'axios'

//添加默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // console.log(config);
    //获取本地令牌
    let token = localStorage.getItem('heima_token')
        //安全判断
    if (token) {
        //添加令牌
        config.headers['Authorization'] = token
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

import { Toast } from 'vant';
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // console.log(response);
    // console.log(window.location.href);
    if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
        Toast('用户信息验证失败!')
            // location.href = '#/login'
            // 传递当前页面地址
        location.href = '#/login?redirect_url=' + window.location.href
    }
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios