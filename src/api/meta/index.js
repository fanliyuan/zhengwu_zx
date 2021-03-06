// 对应后端接口 resource-entity-info-controller : 实体资源元数据信息
const module = {
  moduleName: 'meta',
  apis: [
    {
      name: 'getResourceTaskInfo',
      url: 'getResourceTaskInfo',
    },
    {
      name: 'getEntityInfo',
      url: 'getReqBeanEntityInfo',
      method:'get',
    },
    {
      name: 'getDataById',
      url: 'getDataById',
      method:'get',
    },
    {
      name: 'getDataByMog',
      url: 'getDataByMog',
      method:'get',
    },
    {
      name: 'getResourceByDataId',
      url: 'getResourceByDataId',
      method:'get',
    },
    {
      name: 'getTaskData',
      url: 'data',
      method:'get',
    },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost) {
    // item.baseHost = 'http://testresource.tpaas.youedata.com'
    item.baseHost = '/api'
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module