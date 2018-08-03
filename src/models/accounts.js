/*
 * @Author: ChouEric
 * @Date: 2018-08-03 14:59:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-03 17:23:44
 * @Description: 用户管理
 */
// import { message } from 'antd'
import apis from '../api'

const { getAccounts, getRoleName } = apis
export default {
  namespace: 'accounts',

  state: {
    accountList: [],
    roleNameList: [],
    pagination: false,
  },

  effects: {
    *getAccounts({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getAccounts, {params: payload})
        const { datas = [], total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNum} : false
        const accountIdList = datas.reduce((pre, cur) => {
          pre.push(cur.accountId)
         return pre 
        }, [])
        yield put({
          type: 'changeAccountList',
          payload: { datas, pagination },
        })
        yield put({
          type: 'getRoleName',
          payload: {
            filter: accountIdList.join(','),
          },
        })
      } catch (error) {console.log(error)} // eslint-disable-line
    },
    *getRoleName({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getRoleName, {params: payload})
        const { datas = [] } = response.result
        yield put({
          type: 'changeRoleNameList',
          payload: { datas },
        })
      } catch (error) {console.log(error)} // eslint-disable-line
    },
  },

  reducers: {
    changeAccountList(state, { payload }) {
      return {
        ...state,
        accountList: payload.datas,
      }
    },
    changeRoleNameList(state, { payload }) {
      return {
        ...state,
        roleNameList: payload.datas,
        pagination: payload.pagination,
      }
    },
  },
}
