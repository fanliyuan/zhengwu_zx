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
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    // item.baseHost = 'http://192.168.100.16:8803'
    item.baseHost = 'http://testresource.tpaas.youedata.com'
  }
})
export default module