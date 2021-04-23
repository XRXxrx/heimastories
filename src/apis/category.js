import myaxios from '@/utils/request'

export const getCateInfo = () => {
    return myaxios({
        method: 'get',
        url: '/category'
    })
}