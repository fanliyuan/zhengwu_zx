import { message } from 'antd'
import apis from '../api'

const { setPermissions, getRoleList } = apis
 export default {
  namespace:'roles',

  state:{
    roleList: [],
  },

  effects:{
    *getRoleList(_, { call, put }) {
      let response
      try {
        response = yield call(getRoleList, {path: 5})
        if (+response.code === 0) {
          yield put({
            type: 'changeRoleList',
            payload: {
              roleList: response.result.datas,
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeRoleList',
          payload: {
            roleList: [],
          },
        })
      }
    },
    *setPermissions({ payload }, { call, put }) {
      let response
      try {
        response = yield call(setPermissions, {body: payload.body, path: payload.path})
        if (+response.code === 0) {
          message.success('修改成功!')
          yield put({
            type: 'accounts/getAccounts',
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
  },

  reducers:{
    changeRoleList(state, {payload:{roleList}}) {
      return {
        ...state,
        roleList,
      }
    },
  },
}