//  对应后端模块 gove-sys-log-controller : 系统日志
const module = {
  moduleName: 'logging',
  apis: [
    {
      name: 'insertLogging',
      url: 'insertGoveSysLog',
      method: 'post',
    },
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.16:8000' // 局域网接口(开发接口)
    } else {
      item.baseHost = 'http://zwswpb.cdyoue.com.cn' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://zwswpb.cdyoue.com.cn' // 公网接口(生成接口)
    // item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module