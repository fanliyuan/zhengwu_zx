import apis from '../api'
import logo from '../assets/logo.svg'

const { getAccountInfo } = apis 

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {
      avatar: "",
      name: "",
      notifyCount: 0,
      userid: "00000001",
    },
  },


  effects: {
    *fetchCurrent(_, { call, put }) {
      let response
      try {
        response = yield call(getAccountInfo, {path: localStorage.getItem('accountId')})
        if (+response.code === 0) {
          localStorage.setItem('accountRealName', JSON.parse(response.result.datas.extendedProperties).name || response.result.datas.accountName)
          yield put({
            type: 'saveCurrentUser',
            payload: {
              name: JSON.parse(response.result.datas.extendedProperties).name || response.result.datas.accountName,
              avatar: JSON.parse(response.result.datas.extendedProperties).avatar || logo,
            },
          })
        }
      } catch (error) {
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: '获取姓名错误',
            avatar: logo,
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
