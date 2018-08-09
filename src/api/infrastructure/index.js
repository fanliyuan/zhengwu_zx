const module = {
  moduleName: 'pass',
  apis: [
    {
      name: 'passInfo',
      url: 'channels',
      baseUrl:'channelManager',
    },
    {
      name: 'startNode',
      url: 'startNodes',
      baseUrl:'channelManager',
    },
    {
      name: 'targetNode',
      url: 'targetNodes',
      baseUrl:'channelManager',
    },
    {
      name: 'channel',
      url: 'channel',
      baseUrl:'channelManager',
    },
    {
      name: 'getRegion',
      url: 'regionManager/regions',
    },
    {
      name: 'getRegionNodes',
      url: 'regionManager/regions/nodes',
    },
    {
      name: 'startRegion',
      url: 'regionManager/start',
    },
    {
      name: 'stopRegion',
      url: 'regionManager/stop',
    },
    {
      name: 'deleteRegion',
      url: 'regionManager/region',
      method: 'delete',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://goverinfrast.tpaas.youedata.com'
  }
})

export default module