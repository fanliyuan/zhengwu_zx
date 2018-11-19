/*
 * @Author: ChouEric
 * @Date: 2018-08-03 14:59:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-11-19 15:06:44
 * @Description: 用户管理
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'

const { getAccounts, getRoleName, addAccount, deleteAccount, updateAccount, postNotification } = apis
export default {
  namespace: 'accounts',

  state: {
    accountList: [],
    roleNameList: [],
    pagination: false,
    accountDetail: {},
    queryData: {},
  },

  effects: {
    *getAccounts({ payload }, { call, put, select }) {
      let response
      if (payload) {
        yield put({
          type: 'changeQueryData',
          payload,
        })
      } else {
        payload = yield select(state => state.accounts.queryData)
      }
      try {
        response = yield call(getAccounts, {body: payload})
        const { data = [], total = 0, pageSize = 10, pageNum = 1 } = response.data
        const pagination = total > 10 ? {total, pageSize, current: pageNum} : false
        yield put({
          type: 'changeAccountList',
          payload: { data, pagination },
        })
      } catch (error) {
        console.log(error) // eslint-disable-line
        message.error('网络错误')
        yield put({
          type: 'changeAccountList',
          payload: {
            data: [],
            pagination: {
              total: 0,
            },
          },
        })
      }
    },
    *getRoleName({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getRoleName, {params: payload, path: 2})
        const { datas = [] } = response.result
        yield put({
          type: 'changeRoleNameList',
          payload: { datas },
        })
      } catch (error) {console.log(error)} // eslint-disable-line
    },
    *addAccount({ payload }, { call, put }) {
      let response
      try {
        response = yield call(addAccount, {body: payload})
        const { code } = response
        if (+code === 200) {
          yield call(postNotification, {body: { 
            content: `您有一条新的用户待分配角色：${payload.accountName}!`,
            notifier: 'security',
            notifyTime: Date.now(),
            title: '新用户待分配角色',
           }})
          message.success('添加成功')
          yield put(routerRedux.push('/institutionalUserManage/userManage'))
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *deleteAccount({ payload }, { call, put }) {
      let response
      try {
        // 原来是 路径参数, 现在改为query参数
        response = yield call(deleteAccount, {params: payload})
        response = JSON.parse(response)
        if (+response.code === 200) {
          message.success('删除成功')
          yield put({
            type: 'getAccounts',
          })
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *getAccount({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getAccounts, {path: payload.path})
        if (response.code === 0) {
          yield put({
            type: 'changeAccountDetail',
            payload: { accountDetail: response.result.datas },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *updateAccount({ payload }, { call, put }) {
      let response
      try {
        response = yield call(updateAccount, {body: payload.body})
        const { code } = response
        if (+code === 200) {
          if (payload.flag === 'status') {
            message.success('修改成功')
            yield put({
              type: 'getAccounts',
            })
          } else {
            message.success('修改成功')
            yield put(routerRedux.push('/institutionalUserManage/userManage'))
          }
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
  },

  reducers: {
    changeAccountList(state, { payload }) {
      return {
        ...state,
        accountList: payload.data,
        pagination: payload.pagination,
      }
    },
    changeRoleNameList(state, { payload }) {
      return {
        ...state,
        roleNameList: payload.datas,
      }
    },
    changeAccountDetail(state, { payload }) {
      return {
        ...state,
        accountDetail: payload.accountDetail,
      }
    },
    changeQueryData(state, { payload }) {
      return {
        ...state,
        queryData: payload,
      }
    },
  },
}
