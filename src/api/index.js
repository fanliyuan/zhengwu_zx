/*
 * @Author: ChouEric
 * @Date: 2018-08-02 16:47:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-11-30 15:38:46
 * @Description: 描述请求配置,以及请求生成.
 */
import apiBase from './apiBase'
import apiFactory from './apiFactory'
import userModule from './user/'
import roleModule from './role'
// 郑群的接口
import infrastructure  from './infrastructure'
import portalManagement  from './portalManagement'
// 原来主要是 概览的通知
import overview from './overview'
import catalog from './catalog'
import subscription from './subscription'
import district from './district'
import meta from './meta'
import resource from './resource'
import organization from './organization'
import logging from './logging'
import openApi from './openApi'

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
  ...apiFactory(new ApiSub(infrastructure)),
  ...apiFactory(new ApiSub(portalManagement)),
  ...apiFactory(new ApiSub(overview)),
  ...apiFactory(new ApiSub(catalog)),
  ...apiFactory(new ApiSub(subscription)),
  ...apiFactory(new ApiSub(district)),
  ...apiFactory(new ApiSub(meta)),
  ...apiFactory(new ApiSub(resource)),
  ...apiFactory(new ApiSub(organization)),
  ...apiFactory(new ApiSub(logging)),
  ...apiFactory(new ApiSub(openApi)),
}
