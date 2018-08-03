/*
 * @Author: ChouEric
 * @Date: 2018-08-02 16:47:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-03 16:23:54
 * @Description: 描述请求配置,以及请求生成.
 */
import apiBase from './apiBase'
import apiFactory from './apiFactory'

const userModule = {
  moduleName: 'user',
  apis: [
    // 配置示例
    // {
    //   name: 'getRoleList', // 函数名称,如果不写将和url同名
    //   url: 'projects', // 请求地址,没有前后没有 /
    //   method: 'post', // 请求方式,不写将为GET,做了小写兼容.
    //   baseUrl: 'yyzhzx/api/v1', //请求的地址的前缀,可以为空, 目前是后面循环统一添加
    // },
    {
      name: 'accountLogin',
      method: 'post',
      url: 'session',
    },
    {
      name: 'getAccounts',
      method: 'get',
      url: 'accounts',
    },
  ],
}
userModule.apis.forEach(item => {
  if (!item.baseUrl) {
    item.baseUrl = 'yyzhzx/api/v1'
  }
})

const roleModule = {
  moduleName: 'role',
  apis: [
    {
      name: 'getRoleName',
      url: 'roles',
      path: '2',
    },
  ],
}
roleModule.apis.forEach(item => {
  if (!item.baseUrl) {
    item.baseUrl = 'yyqxzx/api/v1'
  }
})

// 使用方法  
// import { getRoleList } from '这个文件'
// getRoleList({
//  params: {} //请求参数,键值对形式
//  headers: {'accessToken': '1231231',} //请求头, 可以不写
// })

class ApiSub extends apiBase {
  constructor (module) {
    super()
    this.module = module.module
    this.apis = module.apis
  }
}

export default {
  ...apiFactory(new ApiSub(userModule)),
  ...apiFactory(new ApiSub(roleModule)),
}
