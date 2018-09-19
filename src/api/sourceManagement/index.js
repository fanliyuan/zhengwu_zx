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
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://192.168.100.16:8803'
  }
})
export default module