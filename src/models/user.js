import { query as queryUsers, queryCurrent } from '../api/user'

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
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent)
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      })
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      }
    },
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
