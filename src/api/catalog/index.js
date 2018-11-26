// 对应后台  directory-controller : 目录管理
const module = {
  moduleName: 'catalog',
  apis: [
    {
      name: 'getCatalogList',
      url: 'resourceSearchList',
    },
    // 根据资源属性分类展示信息资源管理列表
    {
      name: 'getCatalog',
      url: 'listResourceBasicByType',
      method: 'post',
    },
    {
      name: 'getResourceItemList',
      url: 'getResourceItemList',
    },
    {
      name: 'getResourceTitle',
      url: 'getResourceTypeById',
    },
    // 获取 资源属性分类目录树
    {
      name: 'directoryListAll',
      url: 'directoryListAll',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.16:8801'
    } else {
      item.baseHost = 'http://cdyoue.com.cn:19006/'
    }
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1/'
  }
})
export default module
