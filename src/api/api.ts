import request from '@/utils/request'

// 示例模块：环境相关接口
export function getScreenData() {
    return request({
       url: '/screen.do',
       method: 'get',
    })
}
