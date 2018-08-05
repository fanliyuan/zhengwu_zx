/*
 * @Author: ChouEric
 * @Date: 2018-08-05 16:29:25
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-08-05 16:29:25
 * @Description: 测试api
 */
import request from '../utils/request'

export async function query() {
  return request('/api/users')
}

export async function queryCurrent() {
  return request('/api/currentUser')
}
