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
    item.baseHost = 'http://testcommons.tpaas.youedata.com'
  }
})
export default module