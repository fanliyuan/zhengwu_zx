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
    {
      name: 'getAssessLogs',
      url: 'auditLog',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = '/api'
    } else {
      item.baseHost = '/api' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://cdyoue.com.cn:19006' // 公网接口(生成接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module