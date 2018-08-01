import { stringify } from 'qs'
import request from '../utils/request'
import config from '../../apiconfig'

const { apiServer } = config


export async function queryProjectNotice() {
  return request(`${apiServer}/api/project/notice`)
}

export async function queryActivities() {
  return request(`${apiServer}/api/activities`)
}

export async function queryRule(params) {
  return request(`${apiServer}/api/rule?${stringify(params)}`)
}

export async function removeRule(params) {
  return request(`${apiServer}/api/rule`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  })
}

export async function addRule(params) {
  return request(`${apiServer}/api/rule`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  })
}

export async function fakeSubmitForm(params) {
  return request(`${apiServer}/api/forms`, {
    method: 'POST',
    body: params,
  })
}

export async function fakeChartData() {
  return request(`${apiServer}/api/fake_chart_data`)
}

export async function queryTags() {
  return request(`${apiServer}/api/tags`)
}

export async function queryBasicProfile() {
  return request(`${apiServer}/api/profile/basic`)
}

export async function queryAdvancedProfile() {
  return request(`${apiServer}/api/profile/advanced`)
}

export async function queryFakeList(params) {
  return request(`${apiServer}/api/fake_list?${stringify(params)}`)
}

export async function fakeAccountLogin(params) {
  return request(`${apiServer}/api/login/account`, {
    method: 'POST',
    body: params,
  })
}

export async function fakeRegister(params) {
  return request(`${apiServer}/api/register`, {
    method: 'POST',
    body: params,
  })
}

export async function queryNotices() {
  return request(`${apiServer}/api/notices`)
}

export async function getLog(params) {
  return request(`${apiServer}/api/log`, {
    method: 'POST',
    body: params,
  })
}

export async function getNotices(params) {
  return request(`${apiServer}/api/sysNotices`, {
    method: 'POST',
    body: params,
  })
}

export async function deleteTableRows(params) {
  return request(`${apiServer}/api/deleteRows`, {
    method: 'POST',
    body: params,
  })
}

export async function changeTableStates(params) {
  return request(`${apiServer}/api/changeRows`, {
    method: 'POST',
    body: params,
  })
}

export async function selectInfos(params) {
  return request(`${apiServer}/api/selectTableInfo`, {
    method: 'POST',
    body: params,
  })
}

export async function getLogState() {
  return request(`${apiServer}/api/log/state`)
}

export async function getOrganization() {
  return request(`${apiServer}/api/organization`)
}

export async function getAuditLog(params) {
  return request(`${apiServer}/api/audit/logging`, {
    method: 'POST',
    body: params,
  })
}

export async function getAuditOperation(params) {
  return request(`${apiServer}/api/audit/operation`, {
    method: 'POST',
    body: params,
  })
}

export async function getOperationList() {
  return request(`${apiServer}/api/audit/operation-list`)
}

export async function getNodeList() {
  return request(`${apiServer}/api/node/list`)
}

export async function getState() {
  return request(`${apiServer}/api/state/list`)
}

export async function getInfrastructureManagementNode(params) {
  return request(`${apiServer}/api/infrastructure/node`, {
    method: 'POST',
    body: params,
  })
}

export async function deleteInfrastructureManagementNode(params) {
  return request(`${apiServer}/api/infrastructure/delnode/${params.id}`, {
    method: 'DELETE',
  })
}

export async function deleteInfrastructureManagementNodeSome(params) {
  return request(`${apiServer}/api/infrastructure/delnodes`, {
    method: 'POST',
    body: params,
  })
}
