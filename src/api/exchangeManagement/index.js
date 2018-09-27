const module = {
  moduleName: 'exchangeManagement',
  apis: [
    {
      name: 'getSubscription',
      url: 'queryResourceSubscribeInfoInfoList',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://192.168.100.16:8803'
    // item.baseHost = 'http://testresource.tpaas.youedata.com'
  }
})
export default module