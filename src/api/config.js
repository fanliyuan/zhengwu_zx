/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:18:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-22 09:55:40
 * @Description: 全局接口配置
 */
const baseConfig = {
  // uploadServer: 'http://192.168.100.16:8804',
  // downloadServer: 'http://192.168.100.16:8804',
  uploadServer: 'http://testgoveportalback.tpaas.youedata.com/',
  downloadServer: 'http://testgoveportalback.tpaas.youedata.com/',
  apiHost: 'http://api.tpaas.youedata.com',
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