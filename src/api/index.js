/*
 * @Author: ChouEric
 * @Date: 2018-08-02 16:47:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-09-26 11:35:50
 * @Description: 描述请求配置,以及请求生成.
 */
import apiBase from './apiBase'
import apiFactory from './apiFactory'
import userModule from './user/'
import roleModule from './role'
import InstitutionalUserManage  from './InstitutionalUserManage'
import pass  from './infrastructure'
import portalManagement  from './portalManagement'
import overview from './overview'
import audit from './audit'
import sourceManagement from './sourceManagement'
import exchangeManagement from './exchangeManagement'

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
  ...apiFactory(new ApiSub(pass)),
  ...apiFactory(new ApiSub(InstitutionalUserManage)),
  ...apiFactory(new ApiSub(portalManagement)),
  ...apiFactory(new ApiSub(overview)),
  ...apiFactory(new ApiSub(audit)),
  ...apiFactory(new ApiSub(sourceManagement)),
  ...apiFactory(new ApiSub(exchangeManagement)),
}
