const module = {
  moduleName:'portalManagement',
  apis: [
   {
     name:'directoryList',
     url:'directoryList',
     method:'post',
   }, 
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://goveportalback.tpaas.youedata.com'
  }
})

export default module