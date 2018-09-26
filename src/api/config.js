/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:18:26
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-26 09:42:24
 * @Description: 全局接口配置
 */
const baseConfig = {
  // uploadServer: 'http://192.168.100.16:8804',
  // downloadServer: 'http://192.168.100.16:8804',
  uploadServer: 'http://testgoveportalback.tpaas.youedata.com', // 文件上传的地址
  downloadServer: 'http://testgoveportalback.tpaas.youedata.com', // 文件下载的地址
  portalsServer: 'www.baidu.com/portals', // 门户网站的文章地址
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