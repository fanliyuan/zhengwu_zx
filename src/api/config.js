/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:18:26
 * @Last Modified by: fly
 * @Last Modified time: 2018-12-20 11:04:39
 * @Description: 全局接口配置
 */
const baseConfig = {
  // uploadServer: 'http://192.168.100.16:8804',
  // downloadServer: 'http://192.168.100.16:8804',
  // uploadServer: 'http://192.168.100.16:2181/zwjh/api/v1', // 文件上传的地址
  uploadServer:'/portalapi/zwjh/api/v1',
  downloadServer: '/portalapi', // 文件下载的地址
  portalsServer: 'http://cdyoue.com.cn:19081', // 门户网站的文章地址
  // apiHost: 'http://api.tpaas.youedata.com',
  apiHost: 'http://localhost',
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