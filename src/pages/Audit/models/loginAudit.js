import moment from 'moment'
import apis from '../../../api'

const { getLoginAudit } = apis

export default {
  namespace: 'loginAudit',

  state: {
    loginList: [],
    pagination: false,
    queryData: {},
    stateList: [
      {
        value: '0',
        label: '登录成功',
      },
      {
        value: '1',
        label: '登录失败',
      },
    ],
  },

  effects: {
    *getLoginAudit({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getLoginAudit, {body: payload.body})
        const { list, total = 0, pageSize = 10, pageNum = 1 } = response.data
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        list.forEach(item => {moment(item.createTime).format('lll')})
        if (+response.code === 200) {
          yield put({
            type: 'saveLoginList',
            payload: {
              loginList: list || [],
              pagination,
            },
          })
        } else {
          throw new Error('返回非200')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveLoginList',
          payload: {
            loginList: [],
            pagination: false,
          },
        })
      }
    },
  },

  reducers: {
    saveLoginList(state, { payload: { loginList, pagination } }) {
      return {
        ...state,
        loginList,
        pagination,
      }
    },
  },
}