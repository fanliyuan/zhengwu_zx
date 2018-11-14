const module =  {
  moduleName: 'overview',
  apis: [
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
      method: 'post',
    },
    // 写入日志,已经废弃
    // {
    //   name: 'insertLogging',
    //   url: 'insertGoveSysLog',
    //   method: 'post',
    //   baseHost:'http://testcommons.tpaas.youedata.com',
    // },
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
    // item.baseHost = 'http://cdyoue.com.cn:19006' // 线上(生产接口)
    item.baseHost = 'http://192.168.100.15:8807'  // 开发接口
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
  
})
export default module