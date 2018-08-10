const module = {
  moduleName:'InstitutionalUserManage',
  apis: [
   {
     name:'queryGoveDeptInfoList',
     url:'/queryGoveDeptInfoList',
     method:'post',
   }, 
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://govecommons.tpaas.youedata.com'
  }
})

export default module