const module =  {
  moduleName: 'audit',
  apis: [
    {
      name: 'getLoginAudit',
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