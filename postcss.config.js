// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度
      // 设计图750，调成1倍 =>  适配375标准屏
      // 设计图640，调成1倍 =>  适配320标准屏

      viewportWidth: 375
    }
  }
}
