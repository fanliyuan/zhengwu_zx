// 对应后端接口模块 gove-dept-controller : 机构信息
const module = {
  moduleName: 'organization',
  apis: [
    {
      name:'deleteGoveDept',
      url:'deleteGoveDept',
    },
    {
      name:'deptNameIsTrueOrFalse',
      url:'deptNameIsTrueOrFalse',
    },
    {
      name:'getGoveDeptInfo',
      url:'getGoveDeptInfo',
    },
    {
      name:'getGoveDeptInfos',
      url:'getGoveDeptInfos',
    },
    {
      name:'insertGoveDept',
      url:'insertGoveDept',
      method:'post',
    },
    {
      name:'queryGoveDeptInfoList',
      url:'queryGoveDeptInfoList',
    },
    {
      name:'updateGoveDept',
      url:'updateGoveDept',
      method:'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = '/userapi'
    } else {
      item.baseHost = '/userapi'
    }
    // item.baseHost = 'http://cdyoue.com.cn:19106'
    // item.baseHost = 'http://192.168.100.16:8000'
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})
export default module