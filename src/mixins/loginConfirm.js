export default {
  // 此处编写的就是Vue组件实例的配置项，通过一定的语法，可以直接混入到组件内部
  // data  methods computed 都可以提供

  // 注意点：
  // 1.如果此处 和 组件内部提供了同名的data或methods，组件中的内容优先级更高
  // 2.如果编写了生命周期函数，则mixins中的生命周期函数 和 页面中的生命周期函数，会用数组管理统一执行

  methods: {
    // 判断用户是否登录
    loginConfirm () {
      // 判断token是否存在
      // 1.如果不存在，弹框提示
      // 2.如果存在，加入购物车
      if (!this.$store.getters.token) {
        // 弹出确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要登陆才能继续操作',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        }).then(() => {
          // 如果希望，跳转到登陆=>后能跳转回来，需要跳转去携带参数（当前的路径地址）
          // this.$router.fullPath(带参数)
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
