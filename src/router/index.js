//模块化
import Vue from 'vue'
import VueRouter from 'vue-router'
//明确安装路由功能
Vue.use(VueRouter)

//创建路由模块和配置路由
const router = new VueRouter({
    //使用toutes进行路由配置
    routes: [{
            path: '/',
            redirect: { name: 'index' }
        },
        {
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
        },
        {
            name: 'index',
            path: '/index',
            component: () =>
                import ('@/views/index.vue')
        },
        {
            name: 'postDetail',
            path: '/postDetail/:id',
            component: () =>
                import ('@/views/post/postDetail.vue')
        },
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () =>
                import ('@/views/user/myfollow.vue')
        },
        {
            name: 'mystar',
            path: '/mystar',
            component: () =>
                import ('@/views/user/mystar.vue')
        },
        {
            name: 'comment',
            path: '/comment/:id',
            component: () =>
                import ('@/views/comment.vue')
        },
        {
            name: 'cateManager',
            path: '/cateManager',
            component: () =>
                import ('@/views/cateManager.vue')
        },
        {
            name: 'Search',
            path: '/Search',
            component: () =>
                import ('@/views/Search.vue')
        }
    ]
})

//添加导航守卫
import { Toast } from 'vant';
router.beforeEach((to, from, next) => {
    let arr = ['personal', 'edit_profile', 'cateManager']
        // let arr = ['personal', 'edit_profile']
        // if (to.path.indexOf('/personal/') !== -1) {
    if (arr.indexOf(to.name) !== -1) {
        let token = localStorage.getItem('heima_token')
        if (token) {
            next()
        } else {
            Toast('未登录，请先登录')
                // console.log(from);
                //使用from获取回退时的路由，用params传递参数到跳转对象中，再在登录页进行获取，进行判断
            next({ name: 'login', params: { url: from.path } })
        }
    } else {
        next()
    }
})

//暴露
export default router