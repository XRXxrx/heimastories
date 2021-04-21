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
        }
    ]
})
export default router