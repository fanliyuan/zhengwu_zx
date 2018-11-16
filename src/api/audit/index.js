const module =  {
  moduleName: 'audit',
  apis: [
    {
      name: 'getLoginAudit',
      url: 'queryGoveSysLogInfoList',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
    } else {
      item.baseHost = 'http://govecore.tpaas.youedata.com' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://govecore.tpaas.youedata.com' // 公网接口(生成接口)
    // item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module