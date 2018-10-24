import moment from 'moment'

import { getOrganization, getLogState, getAuditLog } from '../api/test'

export default {
  namespace: 'auditLogging',
  state: {
    data: {
      list: [],
      pagination: {
        pageSie: 10,
        current: 1,
      },
    },
    stateList: [],
    organizationList: [],
  },
  effects: {
    *organization(_, { call, put }) {
      const response = yield call(getOrganization)
      yield put({
        type: 'saveOrganization',
        payload: response,
      })
    },
    *state(_, { call, put }) {
      const response = yield call(getLogState)
      response.unshift({
        value: -1,
        label: '全部结果',
      })
      yield put({
        type: 'saveState',
        payload: response,
      })
    },
    *log({ payload }, { call, put, select }) {
      const response = yield call(getAuditLog, payload)
      // const organizationList = yield call(getOrganization)
      const organizationList = yield select(state => state.auditLogging.organizationList)
      const list = organizationList.reduce((pre, cur) => {
        return [...pre, ...cur.children]
      }, [])
      const organizatioObject = list.reduce((pre, cur) => {
        pre[cur.value] = cur.label // eslint-disable-line
        return pre
      }, {})
      response.data.list.forEach(item => {
        item.result = item.result === 0 ? '登录失败' : '登录成功' // eslint-disable-line
        item.time = moment(item.time).format('lll') // eslint-disable-line
        item.organization = organizatioObject[item.organization] // eslint-disable-line
      })
      yield put({
        type: 'save',
        payload: response.data,
      })
    },
  },

  reducers: {
    saveOrganization(state, action) {
      return {
        ...state,
        organizationList: action.payload.data,
      }
    },
    saveState(state, action) {
      return {
        ...state,
        stateList: action.payload,
      }
    },
    save(state, action) {
      return {
        ...state,
        data: { ...action.payload },
      }
    },
  },
}
