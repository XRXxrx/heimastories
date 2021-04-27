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

//收藏文章
export const shouCang = (id) => {
    return myaxios({
        method: 'get',
        url: `/post_star/${id}`
    })
}

//获取评论列表
export const commentList = (id) => {
    return myaxios({
        method: 'get',
        url: `/post_comment/${id}`
    })
}

// 发表+回复 文章评论
export const publishComment = (id, data) => {
    return myaxios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}

//搜索
export const postSearch = (keyword) => {
    return myaxios({
        method: 'get',
        url: `/post_search?keyword=${keyword}`
    })
}