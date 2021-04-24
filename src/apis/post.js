import myaxios from '@/utils/request'

export const postList = (params) => {
    return myaxios({
        method: 'get',
        url: '/post',
        params
    })
}