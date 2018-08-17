/*
 * @Author: ChouEric
 * @Date: 2018-08-02 16:47:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-05 17:02:34
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
}
