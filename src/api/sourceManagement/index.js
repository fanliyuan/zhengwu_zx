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
      url: 'gove/resourceProperty/list',
      // method: '',
      baseHost:'http://192.168.100.16:8083',
    },
    {
      name: 'deletes',
      url: 'gove/resourceProperty/delete',
      method: 'post',
      baseHost:'http://192.168.100.16:8083',
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