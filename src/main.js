import Vue from 'vue'
import App from './App.vue'

//引用路由
import router from '@/router/index'

//引入vant配置文件
import { Toast, Icon, Uploader, Dialog, Field } from 'vant';

Vue.use(Toast).use(Icon).use(Uploader).use(Dialog).use(Field);

//引入全局样式
import '@/styles/reset.less'

Vue.config.productionTip = false

new Vue({
    //注册路由
    router,
    render: h => h(App),
}).$mount('#app')