import request from '@/utils/request'

// 获取个人信息
export const requestGetUserInfoDetail = () => {
  return request.get('/user/info')
}
