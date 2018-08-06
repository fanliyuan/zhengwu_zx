/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:24
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-06 17:53:10
 * @Description: 用户模块请求
 */
const module = {
  moduleName: 'user',
  apis: [
    {
      name: 'accountLogin',
      method: 'post',
      url: 'session',
    },
    {
      name: 'accountLogout',
      method: 'delete',
      url: 'session',
    },
    {
      name: 'getAccounts',
      method: 'get',
      url: 'accounts',
    },
    {
      name: 'addAccount',
      method: 'post',
      url: 'accounts',
    },
    {
      name:'deleteAccount',
      method:'delete',
      url: 'accounts',
    },
  ],
}

module.apis.forEach(item => {
  if (!item.baseUrl) {
    item.baseUrl = 'yyzhzx/api/v1'
  }
  if (!item.basePort) {
    item.basePort = '32404'
  }
})

export default module