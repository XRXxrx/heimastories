import meaxios from '@/utils/request2'

//登录
export const userLogin = (data) => {
    return meaxios({
        method: 'post',
        url: '/login',
        data
    })
}

//注册
export const userRegister = (data) => {
    return meaxios({
        method: 'post',
        url: '/register',
        data
    })
}

//个人中心首页
export const getUserInfo = (id) => {
    return meaxios({
        method: 'get',
        url: `/user/${id}`,
    })
}