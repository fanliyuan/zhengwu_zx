const baseConfig = {
  uploadServer: 'http://www.baidu.com',
  downloadServer: 'http://www.baidu.com',
  apiHost: 'http://210.13.50.105:32404',
}
const devConfig = {
}
const buildConfig = {
}
const config = process.env.NODE_ENV === 'development' ? devConfig : buildConfig
export default {
  ...baseConfig,
  ...config,
}