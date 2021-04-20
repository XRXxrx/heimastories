//模块化
import Vue from 'vue'
import VueRouter from 'vue-router'
//明确安装路由功能
Vue.use(VueRouter)

//创建路由模块和配置路由
const router = new VueRouter({
    //使用toutes进行路由配置
    routes: [{
            name: 'login',
            path: '/login',
            component: () =>
                import ('@/views/user/login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: () =>
                import ('@/views/user/register.vue')
        }
    ]
})

//暴露
export default router