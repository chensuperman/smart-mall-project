import { requestGetCartList, requestChangeCount, requestDelSelect } from '@/api/cart'

import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter((item) => item.isChecked)
    },

    // 选择的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods.goods_price_min * item.goods_num
      }, 0).toFixed(2)
    },

    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }

  },
  mutations: {
    // 提供一个cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },

    // 实现复选框的反选
    toggleAllCheck (state, goodsId) {
      // 让对应的id的项 状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },

    // 实现全选
    totalAllCheck (state, flag) {
      // 让所有的小选框，同步设置
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },

    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data: { list } } = await requestGetCartList()
      // 为后台返回的数据每一个都加上一个isChecked属性，便于后续操作
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
      // console.log(list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 再提交到服务器
      await requestChangeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSelect (context) {
      const selCarList = context.getters.selCartList
      const cartIds = selCarList.map(item => item.id)
      await requestDelSelect(cartIds)
      setTimeout(() => { Toast.success('删除成功') }, 500)

      // 后台删除成功后，仓库也需要更新，重新获取一遍数据
      context.dispatch('getCartAction')
      // console.log(res)

      // Toast.allowMultiple()
    }
  },
  modules: {
  }
}
