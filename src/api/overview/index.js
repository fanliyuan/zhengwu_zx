const module =  {
  moduleName: 'overview',
  apis: [
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
      method: 'post',
    },
    {
      name: 'notifyManagerList',
      url: 'notifyManager/notifies',
      baseHost: 'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'deleteNotifyManager',
      url: 'notifyManager/DeleteNotifies',
      method: 'get',
    },
    {
      name: 'nextNotifyManager',
      url: 'notifyManager/next',
    },
    {
      name: 'notifyManager',
      url: 'notifyManager/notify',
    },
    {
      name: 'prevNotifyManager',
      url: 'notifyManager/prev',
    },
    {
      name: 'readMarkNotifyManager',
      url: 'notifyManager/readMark',
      method: 'get',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.15:3306' // 局域网接口(开发接口)
    } else {
      item.baseHost = 'http://cdyoue.com.cn:19106' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://govecore.tpaas.youedata.com' // 公网接口(生成接口)
    // item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
  
})
export default module