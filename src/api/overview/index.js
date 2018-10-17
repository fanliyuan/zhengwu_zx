const module =  {
  moduleName: 'overview',
  apis: [
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
      baseHost:'http://testcommons.tpaas.youedata.com',
    },
    {
      name: 'insertLogging',
      url: 'insertGoveSysLog',
      method: 'post',
      baseHost:'http://testcommons.tpaas.youedata.com',
    },
    {
      name: 'notifyManagerList',
      url: 'notifyManager/notifies',
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
    item.baseHost = 'http://testgoverinfrast.tpaas.youedata.com'
    // item.baseHost = 'http://192.168.100.16:8081'
  }
})
export default module