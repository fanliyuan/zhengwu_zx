// 对应后端 resource-classify-controller : 资源属性分类
const module = {
  moduleName: 'resource',
  apis: [
    {
      name: 'list',
      url: 'list',
    },
    {
      name: 'deletes',
      url: 'delete',
      method: 'delete',
    },
    {
      name: 'getResourceProperty',
      url: 'getResourcePropertyByCodeAndLevel',
      method: 'get',
    },
    {
      name: 'addResourceProperty',
      url: 'add',
      method: 'post',
    },
    {
      name: 'autoGetCode',
      url: 'curCode',
      method: 'get',
    },
    {
      name: 'getItemByIdLevel',
      url: 'target',
      method: 'get',
    },
    {
      name: 'editResourceProperty',
      url: 'update',
      method: 'post',
    },
    {
      name: 'isMountResource',
      url: 'isMountResource',
      method: 'get',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = '/api'
    } else {
      item.baseHost = '/api'
    }
    // item.baseHost = 'http://cdyoue.com.cn:19006'
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module