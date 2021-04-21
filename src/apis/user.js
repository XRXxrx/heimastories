import myaxios from '@/utils/request'

//登录
export const userLogin = (data) => {
    return myaxios({
        method: 'post',
        url: '/login',
        data
    })
}

//注册
export const userRegister = (data) => {
    return myaxios({
        method: 'post',
        url: '/register',
        data
    })
}

//个人中心首页
export const getUserInfo = (id) => {
    return myaxios({
        method: 'get',
        url: `/user/${id}`,
        headers: { Authorization: localStorage.getItem('heima_token') }
    })
}