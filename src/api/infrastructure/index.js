const module = {
  moduleName: 'pass',
  apis: [
    {
      name: 'passInfo',
      url: 'channels',
    },
    {
      name: 'startNode',
      url: 'startNodes',
    },
    {
      name: 'targetNode',
      url: 'targetNodes',
    },
    {
      name: 'getRegion',
      url: 'regionManager/regions',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://goverinfrast.tpaas.youedata.com'
  }
})

export default module