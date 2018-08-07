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
  ],
}
module.apis.forEach(item => {
  if (!item.baseUrl) {
    item.baseUrl = 'channelManager'
  }
  if (!item.baseHost) {
    item.baseHost = 'http://goverinfrast.tpaas.youedata.com'
  }
})

export default module