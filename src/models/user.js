import apis from '../api'

const { getAccountInfo } = apis 

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {
      avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
      name: "Serati Ma",
      notifyCount: 12,
      userid: "00000001",
    },
  },


  effects: {
    *fetchCurrent(_, { call, put }) {
      let response
      try {
        response = yield call(getAccountInfo, {path: localStorage.getItem('accountId')})
        if (+response.code === 0) {
          yield put({
            type: 'saveCurrentUser',
            payload: {
              name: JSON.parse(response.result.datas.extendedProperties).name || response.result.datas.accountName,
            },
          })
        }
      } catch (error) {
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: '获取姓名错误',
          },
        })
       // eslint-disable-next-line 
       console.log(error)
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      }
    },
  },
}
