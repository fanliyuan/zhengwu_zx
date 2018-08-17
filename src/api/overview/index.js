const module =  {
  moduleName: 'overview',
  apis: [
    {
      name: 'getLoginLogging',
      url: 'queryGoveSysLogInfoList',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://govecommons.tpaas.youedata.com'
  }
})
export default module