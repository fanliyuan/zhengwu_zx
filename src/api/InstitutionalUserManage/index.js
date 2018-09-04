const module = {
  moduleName:'InstitutionalUserManage',
  apis: [
    {
      name:'queryGoveDeptInfoList',
      url:'queryGoveDeptInfoList',
      method:'get',
    }, 
    {
      name:'deleteGoveDept',
      url:'deleteGoveDept',
      method:'get',
    },
    {
      name:'getProOneLevels',
      url:'getProOneLevels',
      method:'get',
    },
    {
      name:'deptNameIsTrueOrFalse',
      url:'deptNameIsTrueOrFalse',
      method:'get',
    },
    {
      name:'getProThreeLevels',
      url:'getProThreeLevels',
      method:'get',
    },
    {
      name:'getProTwoLevels',
      url:'getProTwoLevels',
      method:'get',
    },
    {
      name:'getGoveDeptInfo',
      url:'getGoveDeptInfo',
    },
    {
      name:'getGoveDeptInfo',
      url:'getGoveDeptInfo',
      method:'get',
    },
    {
      name:'insertGoveDept',
      url:'insertGoveDept',
      method:'post',
    },
    {
      name:'getGoveDeptInfos',
      url:'getGoveDeptInfos',
      method:'get',
    },
    {
      name:'updateGoveDept',
      url:'updateGoveDept',
      method:'post',
    },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://192.168.100.11:8801' // http://192.168.100.11:8801  http://testcommons.tpaas.youedata.com http://testcommons.tpaas.youedata.com
  }
})

export default module