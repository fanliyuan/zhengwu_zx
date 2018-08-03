const baseConfig = {
  uploadServer: 'http://www.baidu.com',
  downloadServer: 'http://www.baidu.com',
  apiHost: 'http://api.tpaas.youedata.com/',
  projectId: '8aced467f44a4a458e763814912c3d47',
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