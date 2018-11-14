import { message } from 'antd'
import apis from '../../../api'

const { saveRoleByAccount, getRoleList } = apis
 export default {
  namespace:'roles',

  state:{
    roleList: [],
  },

  effects:{
    *getRoleList(_, { call, put }) {
      let response
      try {
        response = yield call(getRoleList, {body: { pageNum:0, pageSize: 0 }})
        if (+response.code === 604) {
          yield put({
            type: 'changeRoleList',
            payload: {
              roleList: response.data.data,
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
    *saveRoleByAccount({ payload }, { call, put }) {
      let response
      try {
        response = yield call(saveRoleByAccount, {body: payload.body})
        if (+response.code === 200) {
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