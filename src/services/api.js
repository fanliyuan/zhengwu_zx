import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getLog(params) {
  return request('/api/log', {
    method: 'POST',
    body: params,
  });
}

export async function getNotices(params) {
  return request('/api/sysNotices', {
    method: 'POST',
    body: params,
  });
}

export async function deleteTableRows(params) {
  return request('/api/deleteRows', {
    method: 'POST',
    body: params,
  });
}

export async function changeTableStates(params) {
  return request('/api/changeRows', {
    method: 'POST',
    body: params,
  });
}

export async function selectInfos(params) {
  return request('/api/selectTableInfo', {
    method: 'POST',
    body: params,
  });
}

export async function getLogState() {
  return request('/api/log/state');
}

export async function getOrganization() {
  return request('/api/organization');
}

export async function getAuditLog(params) {
  return request('/api/audit/logging', {
    method: 'POST',
    body: params,
  });
}

export async function getAuditOperation(params) {
  return request('/api/audit/operation', {
    method: 'POST',
    body: params,
  });
}

export async function getOperationList() {
  return request('/api/audit/operation-list');
}

export async function getNodeList() {
  return request('/api/node/list')
}

export async function getState() {
  return request('/api/state/list')
}

export async function getInfrastructureManagementNode(params) {
  return request('/api/infrastructure/node', {
    method: 'POST',
    body: params,
  })
}
