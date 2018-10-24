/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:00
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-25 17:32:13
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
      url: 'roles',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseHost) {
    item.baseHost = 'http://api.tpaas.youedata.com/yyqxzx/api/v1'
  }
})

export default module
