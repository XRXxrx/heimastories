import myaxios from '@/utils/request'

export const userLogin = (data) => {
    return myaxios({
        method: 'post',
        url: '/login',
        data
    })
}
export const userRegister = (data) => {
    return myaxios({
        method: 'post',
        url: '/register',
        data
    })
}