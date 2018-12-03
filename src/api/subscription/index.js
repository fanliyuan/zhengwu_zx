// 对应后台  resource-subscribe-info-controller : 全部资源订阅信息
const module = {
  moduleName: 'subscription',
  apis: [
    {
      name: 'getSourceList',
      url: 'queryResourceList',
      method: 'post',
    },
    {
      name: 'getResourceSubscribeInfoInfo',
      url: 'getResourceSubscribeInfoInfo',
    },
    {
      name: 'getSubscription',
      url: 'queryResourceSubscribeInfoInfoList',
      method: 'post',
    },
    {
      name: 'updateResourceSubscribeInfoInfo',
      url: 'updateResourceSubscribeInfoInfo',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.16:8800'
    } else {
      item.baseHost = 'http://cdyoue.com.cn:19006' // 公网接口(生成接口)
    }
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module