const module =  {
  moduleName: 'overview',
  apis: [
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
    },
    {
      name: 'insertLogging',
      url: 'insertGoveSysLog',
      method: 'post',
    },
    {
      name: 'notifyManagerList',
      url: 'notifyManager/notifies',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'deleteNotifyManager',
      url: 'notifyManager/DeleteNotifies',
      method: 'get',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'nextNotifyManager',
      url: 'notifyManager/next',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'notifyManager',
      url: 'notifyManager/notify',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'prevNotifyManager',
      url: 'notifyManager/prev',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
    {
      name: 'readMarkNotifyManager',
      url: 'notifyManager/readMark',
      method: 'get',
      baseHost:'http://testgoverinfrast.tpaas.youedata.com',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://testcommons.tpaas.youedata.com'
    // item.baseHost = 'http://192.168.100.16:8081'
  }
})
export default module