/*
 * @Author: ChouEric
 * @Date: 2018-08-02 11:20:49
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-13 15:57:54
 * @Description: 请求工厂函数, 根据传入的接口模块,生成api请求
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
    const moduleHost = item.baseHost
    const modulePort = item.basePort ? `:${item.basePort}/`: ''
    const commonPort = apiPort ? `:${apiPort}/` : ''
    const moduleUrl = item.baseUrl || ''
    if (!item.name) {
      item.name = item.url
    }
    apiObject[item.name] = async (params = {}) => {
      let pathParams = ''
      if (params.path && Array.isArray(params.path)) {
        pathParams = `/${params.join('/')}`
      } else if (params.path) {
        pathParams = `/${params.path}`
      }
      const apiUrl =`${moduleHost?`${moduleHost}`:`${apiHost}`}${modulePort?`${modulePort}`:''}${commonPort}${!modulePort && !commonPort ? '/':''}${moduleUrl?`${moduleUrl}/`:''}${item.url}${pathParams?`${pathParams}`:''}`
      const headers = params.headers || {
        projectId,
        accessToken: localStorage.getItem('accessToken') || 0,
      }
      if (!item.method || item.method.toUpperCase() === 'GET') {
        if (!params.params) {
          return request(`${apiUrl}`, {
            headers: {...headers},
          })
        } else {
          return request(`${apiUrl}${stringify(params.params)?`?${stringify(params.params)}`:''}`, {
            headers: {...headers},
          })
        }
      }
      return request(`${apiUrl}${stringify(params.params)?`?${stringify(params.params)}`:''}`,{
        method: item.method.toUpperCase(),
        body: Array.isArray(params.body)?[...params.body]:{...params.body},
        headers: {...headers},
      })
    }
  })
  return apiObject
}