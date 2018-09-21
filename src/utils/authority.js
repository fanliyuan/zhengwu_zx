import { message } from 'antd'

import apis from '../api'

const { getPermission } = apis 
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'guest'
}

export function setAuthority(authority = 'guest') {
  return localStorage.setItem('antd-pro-authority', authority)
}

// 从服务器获取权限
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