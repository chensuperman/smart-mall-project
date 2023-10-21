// 此处用于存放所有登陆相关的接口请求
import request from '@/utils/request'
// request和axios使用是一样的

// 1，获取图形验证码
export const requestGetPicCode = () => {
  return request.get('/captcha/image')
}

// 2.获取短信验证码
export const requestGetMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录接口
export const requestCodeLogin = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}
