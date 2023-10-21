import request from '@/utils/request'

// 获取地址列表
export const requestGetAddressList = () => {
  return request.get('/address/list')
}
