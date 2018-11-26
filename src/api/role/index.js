/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:00
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-11-26 15:49:09
 * @Description: 角色模块请求
 */
const module = {
  moduleName: 'role',
  apis: [
    {
      name: 'getRoleName',
      url: 'roles',
    },
    {
      name: 'getRoleList',
      url: 'queryGoveRoleInfoList',
      method: 'post',
    },
    {
      name: 'saveRoleByAccount',
      url: 'saveRoleByAccount',
      method: 'post',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    if (process.env.NODE_ENV === 'development') {
      item.baseHost = 'http://192.168.100.15:3306' // 局域网接口(开发接口)
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
