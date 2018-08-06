/*
 * @Author: ChouEric
 * @Date: 2018-08-05 17:19:00
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-06 18:03:28
 * @Description: 角色模块请求
 */
const module = {
  moduleName: 'role',
  apis: [
    {
      name: 'getRoleName',
      url: 'roles',
    },
  ],
}
module.apis.forEach(item => {
  if (!item.baseUrl) {
    item.baseUrl = 'yyqxzx/api/v1'
  }
})

export default module
