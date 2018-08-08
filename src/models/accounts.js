/*
 * @Author: ChouEric
 * @Date: 2018-08-03 14:59:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-08 21:13:46
 * @Description: 用户管理
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'

const { getAccounts, getRoleName, addAccount, deleteAccount, updateAccount } = apis
export default {
  namespace: 'accounts',

  state: {
    accountList: [],
    roleNameList: [],
    pagination: false,
    accountDetail: {},
  },

  effects: {
    *getAccounts({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getAccounts, {params: payload})
        const { datas = [], total = 0, pageSize = 10, pageNumber = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNumber} : false
        const accountIdList = datas.reduce((pre, cur) => {
          pre.push(cur.accountId)
         return pre 
        }, [])
        datas.forEach((item) => {
          if (!item.extendedProperties) {
            return false
          }
          const object = JSON.parse(item.extendedProperties.replace(/'/g, '"'))
          for (const key in object) {
            // eslint-disable-next-line
            if (object.hasOwnProperty(key)) {
              item[key] = object[key]
            }
          }
        })
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
        if (code === 0) {
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
        response = yield call(deleteAccount, {path: payload.path})
        if (response.code === 0) {
          message.success('删除成功')
          yield put({
            type: 'getAccounts',
          })
        } else {
          message.error('删除失败')
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
        response = yield call(updateAccount, {path: payload.path, body: payload.body})
        const { code } = response
        if (code === 0) {
          if (payload.flag === 'status') {
            message.success('修改成功')
            yield put({
              type: 'getAccounts',
            })
          } else {
            message.success('修改成功')
            yield put(routerRedux.push('/institutionalUserManage/userManage'))
          }
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
        accountList: payload.datas,
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
  },
}
