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
    method:'post',
   },
   {
    name:'insertCategory',
    url:'insertCategory',
    method:'post',
   },
   {
    name:'columnList',
    url:'columnList',
    method:'post',
   },
   {
    name:'updateColumnInfo',
    url:'updateColumnInfo',
    method:'post',
   },
   {
    name:'selectColumnPage',
    url:'selectColumnPage',
    method:'get',
   },
   {
    name:'searchColumn',
    url:'searchColumn',
    method:'post',
   },
   {
     name:'getArticles',
     url: 'articleList',
     method: 'post',
   },
   {
     name: 'deleteArticle',
     url: 'deleteArticle',
   },
   {
     name: 'insertArticle',
     url: 'insertArticle',
     method: 'post',
   },
   {
     name: 'getArticleInfo',
     url: 'getArticleInfo',
   },
   {
     name: 'updateArticle',
     url:  'updateArticle',
     method: 'post',
   },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    item.baseHost = 'http://testgoveportalback.tpaas.youedata.com' // http://testgoveportalback.tpaas.youedata.com
  }
})

export default module