const module = {
  moduleName: 'infrastructure',
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
      url: 'nodes',
      method: 'post',
    },
    {
      name: 'getParentNodes',
      url: 'parentnodestree',
    },
    // 同名,应该被替换了
    // {
    //   name: 'getDepartments',
    //   url: 'nodeManager/deptlist',
    // },
    {
      name: 'deleteNode',
      url: 'deleteNode',
    },
    {
      name: 'addNode',
      url: 'addNode',
      method: 'post',
    },
    {
      name: 'editNode',
      url: 'updateNode',
      method: 'put',
    },
    {
      name: 'checkNode',
      url: 'validateNodeInfo',
      method: 'post',
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
      name: 'getNodesByDepartment',
      url: 'nodeManager/deptnodes',
    },
    {
      name: 'notifyManagerList',
      url: 'notifyManager/notifies',
    },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = '/api' // 局域网接口(开发接口)
    } else {
      item.baseHost = '/api' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://cdyoue.com.cn:19006' // 公网接口(生成接口)
    // item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})

export default module