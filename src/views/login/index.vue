<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)"/>

    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登陆后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号" type="text" >
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入验证码" type="text" >
          <img v-show="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" >
          <button @click="getCode">
            {{second===totalSecond?'获取验证码':`(${second})后重新验证`}}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>

  </div>
</template>

<script>
import { requestGetPicCode, requestGetMsgCode, requestCodeLogin } from '@/api/login'

export default {
  name: 'LoginIndex',

  data () {
    return {
      picKey: '', // 请求传递的图形验证码标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对 second--
      timer: null, // 定时器id
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: ''// 短信验证码
    }
  },

  created () {
    this.getPicCode()
  },

  methods: {
    // 获取图形验证码码
    async getPicCode () {
      const { data: { base64, key } } = await requestGetPicCode() // 将请求封装成函数，存放到到api中，与页面分离
      // console.log(res)
      this.picUrl = base64 // 存储图片的地址
      this.picKey = key // 存储图片的唯一标识
    },

    // 校验 手机号 和 图形验证码 是否合法
    // 通过校验返回true，不通过校验返回false
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getCode () {
      // 校验手机号和验证码
      if (!this.validFn()) {
        return
      }

      // 当目前没有定时器开着，且totalSecond 和 second 一致（秒数归位）才可以倒计时
      if (!this.timer && this.totalSecond === this.second) {
        // 发送请求
        await requestGetMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--

          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null// 重置定时器
            this.second = this.totalSecond// 归位
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }

      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }

      const res = await requestCodeLogin(this.msgCode, this.mobile)
      // console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('恭喜登录成功')

      // 进行判断，是否有回跳地址
      // 如果有，则跳转到回调地址
      // 如果没有，则跳转到主页
      this.$router.replace(this.$route.query.backUrl ? `${this.$route.query.backUrl}` : '/')
    }

  },

  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
