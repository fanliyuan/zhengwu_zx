/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:24
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-11-14 14:41:49
 * @Description: 用户模块请求
 */
const module = {
  moduleName: 'user',
  apis: [
    // 登录
    {
      name: 'accountLogin',
      method: 'post',
      url: 'login',
    },
    // 退出登录
    {
      name: 'accountLogout',
      method: 'post',
      url: 'loginOut',
    },
    // 获取用户列表
    {
      name: 'getAccounts',
      method: 'post',
      url: 'queryGoveAccountInfoList',
    },
    // 新增用户
    {
      name: 'addAccount',
      method: 'post',
      url: 'insertGoveAccount',
    },
    // 删除用户
    {
      name: 'deleteAccount',
      method: 'delete',
      url: 'deleteGoveAccount',
    },
    // 修改用户,包括启用,停用状态修改
    {
      name: 'updateAccount',
      method: 'put',
      url: 'updateGoveAccount',
    },
    // 获取用户信息
    {
      name: 'getAccountInfo',
      method: 'post',
      url: 'getTokenByAccount',
    },
  ],
}

module.apis.forEach(item => {
  if (!item.baseHost) {
    // item.baseHost = 'http://cdyoue.com.cn:19006' // 线上接口
    item.baseHost = 'http://192.168.100.15:8807' // 开发接口
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})

export default module