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
        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () =>
                import ('@/views/user/personal.vue')
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () =>
                import ('@/views/user/edit_profile.vue')
        }
    ]
})

//添加导航守卫
import { Toast } from 'vant';
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') !== -1) {
        let token = localStorage.getItem('heima_token')
        if (token) {
            next()
        } else {
            Toast('未登录，请先登录')
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

//暴露
export default router