/*
 * @Author: ChouEric
 * @Date: 2018-08-02 11:20:49
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-02 16:05:32
 * @Description: 请求工厂函数
 */
import { stringify } from 'qs'
import request from '../utils/request'
import config from './config'

const { apiHost } = config

export default (module) => {
  const apiObject = {}
  if (!Array.isArray(module.apis)) {
    module.apis = []
  }
  module.apis.forEach(item => {
    if (!item.name) {
      item.name = item.url
    }
    apiObject[item.name] = async (params = {}) => {
      const headers = params.headers || {}
      const moduleUrl = item.baseUrl || ''
      if (!item.method || item.method.toUpperCase === 'GET') {
        if (!params.params) {
          return request(`${apiHost?`${apiHost}/`:''}${moduleUrl?`${moduleUrl}/`:''}${item.url}`, {
            headers: {...headers},
          })
        } else {
          return request(`${apiHost?`${apiHost}/`:''}${moduleUrl?`${moduleUrl}/`:''}${item.url}/?${stringify(params.params)}`, {
            headers: {...headers},
          })
        }
      }
      return request(`${apiHost?`${apiHost}/`:''}${moduleUrl?`${moduleUrl}/`:''}${item.url}`,{
        method: item.method.toUpperCase(),
        body: {...params.body},
        headers: {...headers},
      })
    }
  })
  return apiObject
}