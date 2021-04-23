import myaxios from '@/utils/request'

export const postList = (category) => {
    return myaxios({
        method: 'get',
        url: `/post?category=${category}&pageSize=100`,
    })
}