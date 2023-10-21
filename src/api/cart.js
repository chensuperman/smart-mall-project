import request from '@/utils/request'

// 加入购物车
// goodsId  => 商品id
// goodsSkuId   => 商品规格id
export const requestAddCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const requestGetCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品的数量
export const requestChangeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const requestDelSelect = (cartIds) => {
  return request.post('/cart/clear', { cartIds })
}
