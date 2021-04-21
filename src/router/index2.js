import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            name: 'login2',
            path: '/login2',
            component: () =>
                import ('@/views/user2/login2.vue')
        },
        {
            name: 'register2',
            path: '/register2',
            component: () =>
                import ('@/views/user2/register2.vue')
        },
        {
            name: 'personal2',
            path: '/personal2/:id',
            component: () =>
                import ('@/views/user2/personal2.vue')
        }
    ]
})

import { Toast } from 'vant';
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal2/') !== -1) {
        let token = localStorage.getItem('heima_token2')
        if (token) {
            next()
        } else {
            Toast('未登录');
            next({ name: 'login2' })
        }
    } else {
        next()
    }

})
export default router