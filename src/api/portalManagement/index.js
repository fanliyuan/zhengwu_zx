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
   {
     name: 'uploadOssImage',
     url: 'uploadOssImage',
     method: 'post',
   },
   {
     name: 'getArticleReleased',
     url: 'searchReleaList',
     method: 'post',
   },
   {
     name: 'getArticleNoRelease',
     url: 'searchNotReleaList',
     method: 'post',
   },
   {
     name: 'cancleArticleReleased',
     url: 'cancleArticle',
   },
   {
     name: 'changeAricleState',
     url: 'setArticle',
     method: 'post',
   },
   {
     name: 'getCarousels',
     url: 'imgList',
     method: 'post',
   },
   {
     name: 'insertCarousel',
     url: 'insertImg',
     method: 'post',
   },
   {
     name: 'updateCarousel',
     url: 'updateImg',
     method: 'post',
   },
   {
    name: 'resourceSearchList',
    url: 'resourceSearchList',
    method: 'post',
  },
  {
    name: 'updateResource',
    url: 'updateResource',
    method: 'post',
  },
  {
    name: 'judgeCategory',
    url: 'judgeCategory',
    method: 'get',
  },
  {
    name: 'judgeColumn',
    url: 'judgeColumn',
    method: 'get',
  },
   {
     name: 'deleteCarousel',
     url: 'deleteImg',
   },
   {
     name: 'toggleCarousel',
     url: 'stopImg',
   },
   {
     name: 'getCarousel',
     url: 'getImgInfo',
   },
  ],
}
module.apis.forEach(item => {
  if(!item.baseHost){
    // item.baseHost = 'http://192.168.100.16:8804'
    item.baseHost = 'http://testgoveportalback.tpaas.youedata.com' // http://testgoveportalback.tpaas.youedata.com  http://testgoveportalback.tpaas.youedata.com
  }
})

export default module