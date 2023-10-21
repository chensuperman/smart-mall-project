import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    // 个人权证相关
    userInfo: getInfo()

  },
  getters: {
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})
      // 购物车信息要重置(跨模块调用mutations)
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  modules: {
  }
}
