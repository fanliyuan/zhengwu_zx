const module = {
  moduleName: 'sourceManagement',
  apis: [
    {
      name: 'getCatalogList',
      url: 'resourceSearchList',
    },
    {
      name: 'getCatalog',
      url: 'listResourceBasicByType',
    },
    {
      name: 'getResourceItemList',
      url: 'getResourceItemList',
    },
    {
      name: 'getResourceTitle',
      url: 'getResourceTypeById',
    },
    {
      name: 'getResourceList',
      url: '',
    },
    {
      name: 'getResourceTaskInfo',
      url: 'getResourceTaskInfo',
    },
    {
      name: 'getDBInfo',
      url: 'getReqBeanEntityInfo',
    },
    {
      name: 'getSourceList',
      url: 'queryResourceList',
      method: 'post',
    },
    {
      name: 'list',
      url: 'zwjh/api/v1/list',
      // method: 'get',
      baseHost:'http://cdyoue.com.cn:19006',
    },
    {
      name: 'deletes',
      url: 'zwjh/api/v1/delete',
      method: 'delete',
      baseHost:'http://cdyoue.com.cn:19006',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    // item.baseHost = 'http://192.168.100.16:8803'
    // item.baseUrl = 'apis'
    item.baseHost = 'http://testresource.tpaas.youedata.com'
  }
})
export default module