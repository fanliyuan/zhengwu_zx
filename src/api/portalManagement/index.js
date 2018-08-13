const module = {
  moduleName:'portalManagement',
  apis: [
   {
     name:'directoryList',
     url:'directoryList',
     method:'post',
   }, 
   {
      name:'categoryList',
      url:'categoryList',
      method:'post',
   },
   {
    name:'getCategoryInfo',
    url:'getCategoryInfo',
    method:'post',
 },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://testgoveportalback.tpaas.youedata.com' // http://goveportalback.tpaas.youedata.com
  }
})

export default module