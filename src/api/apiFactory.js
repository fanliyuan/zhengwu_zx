/*
 * @Author: ChouEric
 * @Date: 2018-08-02 11:20:49
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-02 17:39:26
 * @Description: 请求工厂函数
 */
import { stringify } from 'qs'
import request from '../utils/request'
import config from './config'

const { apiHost, apiPort, projectId } = config

export default (module) => {
  const apiObject = {}
  if (!Array.isArray(module.apis)) {
    module.apis = []
  }
  module.apis.forEach(item => {
    const moduleHost = item.baseHost || ''
    const modulePort = item.basePort || ''
    const moduleUrl = item.baseUrl || ''
    if (!item.name) {
      item.name = item.url
    }
    apiObject[item.name] = async (params = {}) => {
      const apiUrl =` ${apiHost?`${apiHost}:`:''}${moduleHost?`${moduleHost}:`:''}${apiPort?`${apiPort}/`:''}${modulePort?`${modulePort}/`:''}${moduleUrl?`${moduleUrl}/`:''}${item.url}${item.path?`/${item.path}`:''}`
      const headers = params.headers || {
        projectId,
        assessToken: localStorage.getItem('accessToken') || 0,
      }
      if (!item.method || item.method.toUpperCase === 'GET') {
        if (!params.params) {
          return request(`${apiUrl}`, {
            headers: {...headers},
          })
        } else {
          return request(`${apiUrl}/?${stringify(params.params)}`, {
            headers: {...headers},
          })
        }
      }
      return request(`${apiUrl}`,{
        method: item.method.toUpperCase(),
        body: {...params.body},
        headers: {...headers},
      })
    }
  })
  return apiObject
}