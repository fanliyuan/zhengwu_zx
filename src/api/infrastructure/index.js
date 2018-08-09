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
      method:'put',
      baseUrl:'channelManager',
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