import { message } from 'antd'
import Cookies from 'js-cookie'

import apis from '../api'

const { getPermission } = apis 
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return Cookies.get('antd-pro-authority') || 'guest'
}

export function setAuthority(authority = 'guest') {
  return Cookies.set('antd-pro-authority', authority)
}

// 从服务器获取权限
/** 
 * 返回[{path: 'xxx',permission: true},{path: 'xxxx', premission: false,children:[]}]
 * @returns {Array}
*/
export async function getPermissions() {
  let permissions = []
  try {
    const response = await getPermission()
    if (+response.code === 0) {
      permissions = response.result.datas
    } else {
      throw response.msg
    }
  } catch (error) {
   // eslint-disable-next-line 
   if (error instanceof Error) {
     console.log(error)// eslint-disable-line
   } else {
     message.error(error || '无权限登录')
   }
  }
  return permissions
}