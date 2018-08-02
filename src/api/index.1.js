import apiBase from './apiBase'
import apiFactory from './apiFactory'

const userModule = {
  moduleName: 'user',
  apis: [
    {
      name: 'getUserList',
      url: 'rolegroups',
      baseUrl: 'yyqxzx/api/v1',
    },
    {
      url: 'session',
      baseUrl: 'yyzhzx/api/v1',
    },
    {
      name: 'getRoleList',
      url: 'projects',
      method: 'post',
      baseUrl: 'yyzhzx/api/v1',
    },
    {
      name: 'delteRole',
      url: 'deleteRole',
      method: 'DELETE',
    },
  ],
}

class ApiSub extends apiBase {
  constructor (module) {
    super()
    this.module = module.module
    this.apis = module.apis
  }
}

export default {
  ...apiFactory(new ApiSub(userModule)),
}
