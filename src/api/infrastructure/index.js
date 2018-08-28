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
    {
      name: 'getNodes',
      url: 'nodeManager/nodes',
    },
    {
      name: 'getParentNodes',
      url: 'nodeManager/parentnodestree',
    },
    {
      name: 'getDepartments',
      url: 'nodeManager/deptlist',
    },
    {
      name: 'deleteNode',
      url: 'nodeManager/node',
      method: 'delete',
    },
    {
      name: 'addNode',
      url: 'nodeManager/node',
      method: 'post',
    },
    {
      name: 'editNode',
      url: 'nodeManager/node',
      method: 'put',
    },
    {
      name: 'addRegion',
      url: 'regionManager/region',
      method: 'post',
    },
    {
      name: 'editRegion',
      url: 'regionManager/region',
      method: 'put',
    },
    {
      name: 'getDepartments',
      url: 'getGoveDeptInfos',
      baseHost: 'http://testcommons.tpaas.youedata.com',
    },
    {
      name: 'getNodesByDepartment',
      url: 'nodeManager/deptnodes',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://testgoverinfrast.tpaas.youedata.com' // http://testgoverinfrast.tpaas.youedata.com/ http://goverinfrast.tpaas.youedata.com
  }
})

export default module