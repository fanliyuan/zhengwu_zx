const baseConfig = {
  uploadServer: 'http://www.baidu.com',
  downloadServer: 'http://www.baidu.com',
  apiServer: 'http://www.baidu.com',
}
const devConfig = {
  uploadServer: 'http://www.qq.com',
  downloadServer: 'http://www.qq.com',
  apiServer: 'http://www.qq.com',
}
const buildConfig = {
  uploadServer: 'http://www.taobao.com',
  downloadServer: 'http://www.taobao.com',
  apiServer: 'http://www.taobao.com',
}
const config = process.env.NODE_ENV === 'development' ? devConfig : buildConfig
export default {
  ...baseConfig,
  ...config,
}