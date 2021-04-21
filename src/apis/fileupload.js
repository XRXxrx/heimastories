import myaxios from '@/utils/request'

//获取头像
export const userFile = (data) => {
    return myaxios({
        method: 'post',
        url: '/upload',
        data
    })
}