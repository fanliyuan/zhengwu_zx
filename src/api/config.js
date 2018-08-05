/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:18:26
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-08-05 17:18:26
 * @Description: 全局接口配置
 */
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