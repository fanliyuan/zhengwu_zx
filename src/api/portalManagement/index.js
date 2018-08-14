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
   {
    name:'searchCategory',
    url:'searchCategory',
    method:'post',
   },
   {
    name:'deleteCategory',
    url:'deleteCategory',
    method:'get',
   },
   {
    name:'updateCategory',
    url:'updateCategory',
    method:'put',
   },
   {
    name:'insertCategory',
    url:'insertCategory',
    method:'post',
   },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://192.168.100.16:8804' // http://testgoveportalback.tpaas.youedata.com
  }
})

export default module