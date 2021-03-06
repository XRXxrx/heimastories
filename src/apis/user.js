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
        // headers: { Authorization: localStorage.getItem('heima_token') }
    })
}

//编辑用户信息
export const updateUserInfo = (id, data) => {
    return myaxios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}

// 5.关注用户
export const followUser = (id) => {
    return myaxios({
        url: `/user_follows/${id}`
    })
}


// 6.取消关注用户
export const unFollowUser = (id) => {
    return myaxios({
        url: `/user_unfollow/${id}`
    })
}

//获取关注数据
export const myfollow = () => {
    return myaxios({
        method: 'get',
        url: '/user_follows'
    })
}

//获取收藏数据
export const mystarinfo = () => {
    return myaxios({
        method: 'get',
        url: '/user_star'
    })
}