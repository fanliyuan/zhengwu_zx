import { stringify } from 'qs'
import request from '../utils/request'
// import config from './config'

// const { apiHost } = config
const apiHost = ''

export async function queryProjectNotice() {
  return request(`${apiHost}/api/project/notice`)
}

export async function queryActivities() {
  return request(`${apiHost}/api/activities`)
}

export async function queryRule(params) {
  return request(`${apiHost}/api/rule?${stringify(params)}`)
}

export async function removeRule(params) {
  return request(`${apiHost}/api/rule`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  })
}

export async function addRule(params) {
  return request(`${apiHost}/api/rule`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  })
}

export async function fakeSubmitForm(params) {
  return request(`${apiHost}/api/forms`, {
    method: 'POST',
    body: params,
  })
}

export async function fakeChartData() {
  return request(`${apiHost}/api/fake_chart_data`)
}

export async function queryTags() {
  return request(`${apiHost}/api/tags`)
}

export async function queryBasicProfile() {
  return request(`${apiHost}/api/profile/basic`)
}

export async function queryAdvancedProfile() {
  return request(`${apiHost}/api/profile/advanced`)
}

export async function queryFakeList(params) {
  return request(`${apiHost}/api/fake_list?${stringify(params)}`)
}

export async function fakeAccountLogin(params) {
  return request(`${apiHost}/api/login/account`, {
    method: 'POST',
    body: params,
  })
}

export async function fakeRegister(params) {
  return request(`${apiHost}/api/register`, {
    method: 'POST',
    body: params,
  })
}

export async function queryNotices() {
  return request(`${apiHost}/api/notices`)
}

export async function getLog(params) {
  return request(`${apiHost}/api/log`, {
    method: 'POST',
    body: params,
  })
}

export async function getNotices(params) {
  return request(`${apiHost}/api/sysNotices`, {
    method: 'POST',
    body: params,
  })
}

export async function deleteTableRows(params) {
  return request(`${apiHost}/api/deleteRows`, {
    method: 'POST',
    body: params,
  })
}

export async function changeTableStates(params) {
  return request(`${apiHost}/api/changeRows`, {
    method: 'POST',
    body: params,
  })
}

export async function selectInfos(params) {
  return request(`${apiHost}/api/selectTableInfo`, {
    method: 'POST',
    body: params,
  })
}

export async function getLogState() {
  return request(`${apiHost}/api/log/state`)
}

export async function getOrganization() {
  return request(`${apiHost}/api/organization`)
}

export async function getAuditLog(params) {
  return request(`${apiHost}/api/audit/logging`, {
    method: 'POST',
    body: params,
  })
}

export async function getAuditOperation(params) {
  return request(`${apiHost}/api/audit/operation`, {
    method: 'POST',
    body: params,
  })
}

export async function getOperationList() {
  return request(`${apiHost}/api/audit/operation-list`)
}

export async function getNodeList() {
  return request(`${apiHost}/api/node/list`)
}

export async function getState() {
  return request(`${apiHost}/api/state/list`)
}

export async function getInfrastructureManagementNode(params) {
  return request(`${apiHost}/api/infrastructure/node`, {
    method: 'POST',
    body: params,
  })
}

export async function deleteInfrastructureManagementNode(params) {
  return request(`${apiHost}/api/infrastructure/delnode/${params.id}`, {
    method: 'DELETE',
  })
}

export async function deleteInfrastructureManagementNodeSome(params) {
  return request(`${apiHost}/api/infrastructure/delnodes`, {
    method: 'POST',
    body: params,
  })
}
