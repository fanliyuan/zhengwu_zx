// 对应后台  resource-subscribe-info-controller : 开放api资源管理
const module = {
  moduleName: 'openApi',
  apis: [
    {
      name: 'openApiData',
      url: 'openApiData',
      method: 'post',
    },
    {
      name: 'openApiErrorCode',
      url: 'openApiErrorCode',
    },
    {
      name: 'openApiReqParam',
      url: 'openApiReqParam',
    },
    {
      name: 'openApiRequestInfo',
      url: 'openApiRequestInfo',
    },
    {
      name: 'openApiResParam',
      url: 'openApiResParam',
    },
    {
      name: 'openApiResultInfo',
      url: 'openApiResultInfo',
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
    item.baseUrl = 'zwjh/api/v1/open'
  }
})
export default module