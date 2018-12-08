/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:24
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-12-08 10:40:42
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
    // 查询机构树形数据
    {
      name: 'getDepartments',
      url: 'getGoveDeptInfos',
    },
  ],
}

module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.16:8000' // 局域网接口(开发接口)
    } else {
      item.baseHost = 'http://cdyoue.com.cn:19106' // 公网接口(生成接口)
    }
    // item.baseHost = 'http://cdyoue.com.cn:19106' // 公网接口(生成接口)
    // item.baseHost = 'http://192.168.100.15:8807' // 局域网接口(开发接口)
  }
  if (!item.baseUrl) {
    item.baseUrl = 'zwjh/api/v1'
  }
})

export default module