import myaxios from '@/utils/request'

export const userLogin = (data) => {
    return myaxios({
        method: 'post',
        url: '/login',
        data
    })
}