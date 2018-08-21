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
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://govecommons.tpaas.youedata.com'
    // item.baseHost = 'http://192.168.100.11:8801'
  }
})
export default module