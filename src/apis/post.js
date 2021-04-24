import myaxios from '@/utils/request'

export const postList = (params) => {
    return myaxios({
        method: 'get',
        url: '/post',
        params
    })
}

export const postDetail = (id) => {
    return myaxios({
        method: 'get',
        url: `/post/${id}`
    })
}

//点赞文章
export const likeCate = (id) => {
    return myaxios({
        method: 'get',
        url: `/post_like/${id}`
    })
}