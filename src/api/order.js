import request from '@/utils/request'

// 订单结算
// mode:cart  => obj{cartIds}
// mode:buyNow    => obj{goodsID,goodsNum,goodsSkuId}
export const requestCheckOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10,
      isUsePoints: 0,
      couponId: 0,
      ...obj
    }
  })
}

// 提交订单
// mode:cart  => obj{cartIds,remark}
// mode:buyNow    => obj{goodsID,goodsNum,goodsSkuId}
export const requestSubmitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const requestGetMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
