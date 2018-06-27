import moment from 'moment'

import { getAuditOperation, getOperationList } from '../services/api'

export default {
  namespace: 'auditOperation',
  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 55,
      },
    },
    operationList: [],
  },

  effects: {
    search: [function* search({ payload }, { call, put, select }) {
      const response = yield call(getAuditOperation, payload)
      // let organizationList = yield call(getOrganization)
      // organizationList = organizationList.data
      // yield take(['operation/@@end', 'auditLogging/organization/@@end'])
      // yield take('operation/@@end')
      // yield take('auditLogging/organization/@@end')
      let organizationList = yield select(state => state.auditLogging.organizationList)
      organizationList = organizationList.reduce((pre, cur) => {
        return [...pre, ...cur.children]
      }, [])
      const organizationObject = organizationList.reduce((pre, cur) => {
        pre[cur.value] = cur.label// eslint-disable-line
        return pre
      }, {})
      const operationList = yield select(state => state.auditOperation.operationList)
      const operationObject = operationList.reduce((pre, cur) => {
        pre[cur.id] = cur.label// eslint-disable-line
        return pre
      }, {})
      response.data.list.forEach(item => {
        item.organization = organizationObject[item.organization]// eslint-disable-line
        item.operation = operationObject[item.operation]// eslint-disable-line
        item.time = moment(item.time, 'x').format('lll')// eslint-disable-line
      })
      yield put({
        type: 'saveSearch',
        payload: response.data,
      })
    }, { type: 'throttle', ms: 200 }],
    *operation(_, { call, put }) {
      const response = yield call(getOperationList)
      response.data.unshift({
        id: -1,
        label: '全部',
      })
      yield put({
        type: 'saveOperation',
        payload: response.data,
      })
    },
  },

  reducers: {
    saveOperation(state, action) {
      return {
        ...state,
        operationList: [...action.payload],
      }
    },
    saveSearch(state, action) {
      // let operationList = state.operationList.reduce((pre, cur) => {
      //   pre[cur.id] = cur.label
      //   return pre
      // })
      // action.payload.list.forEach(item =>{
      //   item.operation = operationList[item.operation]
      // })
      return {
        ...state,
        data: {...action.payload},
      }
    },
  },

}
