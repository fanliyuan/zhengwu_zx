/*
 * @Author: ChouEric
 * @Date: 2018-08-05 16:23:27
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-08-05 16:23:27
 * @Description: 
 */

import apiBase from './apiBase'
import apiFactory from './apiFactory'

// 配置示例
const userModule = {
  name: 'user',
  apis: [
    {
      name: 'getRoleList', // 函数名称,如果不写将和url同名
      url: 'projects', // 请求地址,没有前后没有 /
      method: 'post', // 请求方式,不写将为GET,做了小写兼容.
      baseUrl: 'yyzhzx/api/v1', // 请求的地址的前缀,可以为空, 目前是后面循环统一添加
    },
  ],
}

class ApiSub extends apiBase {
  constructor(module) {
    super()
    this.name = module.name
    this.apis = module.apis
  }
}

export default {
  ...apiFactory(new ApiSub(userModule)),
}

// api导出使用方法  
// import { getRoleList } from '这个文件'
// getRoleList({
//  params: {} //请求参数,键值对形式
//  headers: {'accessToken': '1231231',} //请求头, 可以不写
// })