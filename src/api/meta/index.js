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
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    // item.baseHost = 'http://testresource.tpaas.youedata.com'
    item.baseHost = 'http://192.168.100.15:8801'
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module