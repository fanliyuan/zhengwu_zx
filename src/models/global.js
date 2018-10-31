// import { queryNotices } from '@/services/api'
import apis from '../api'

const { notifyManagerList } = apis 

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices({payload}, { call, put }) {
      let noticeList = []
      let noticeCount = 0
      try {
        const response = yield call(notifyManagerList, {params:payload})
        if (+response.code === 0) {
          noticeList = response.result.datas
          noticeCount = response.result.datas.length
        } else {
          throw response.msg
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
       noticeList = []
       noticeCount = 0
      }finally{
        yield put({
          type:'user/noticesList',
          payload:noticeList,
        })
        yield put({
          type:'user/changeNotifyCount',
          payload:noticeCount,
        })
      }
      // const data = yield call(notifyManagerList)
      // yield put({
      //   type: 'saveNotices',
      //   payload: data,
      // })
      // yield put({
      //   type: 'user/changeNotifyCount',
      //   payload: data.length,
      // })
    },
    // 清除消息,不知是否需要全部调用全部清空接口
    *clearNotices({ payload }, { put, select }) {// eslint-disable-line
      const count = yield select(state => state.global.notices.length)
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      })
      yield put({
        type:'user/noticesList',
        payload:[],
      })
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      }
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      }
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search)
        }
      })
    },
  },
}
