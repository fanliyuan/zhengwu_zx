import apis from '../../../api'

const { listResourceBasicByDity } = apis

export default {
  namespace: 'sourceCatalog',

  state: {
    dataList: {},
    dataListApi: {},
    page: 1,
    pageApi: 1,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const response = yield call(listResourceBasicByDity, { params: payload })
        if (+response.code === 0) {
          yield put({
            type: 'queryList',
            payload: response,
          })
          yield put({
            type: 'setPage',
            payload: response.page,
          })
        }
      } catch (error) {
        console.log(error)
        yield put({
          type: 'queryList',
          payload: {
            dataList: [],
          },
        })
      }
    },
    *fetchApi({ payload }, { call, put }) {
      const response = yield call(listResourceBasicByDity, { params: payload })
      if (response.code === 0) {
        yield put({
          type: 'queryListApi',
          payload: response,
        })
        yield put({
          type: 'setPageApi',
          payload: response.page,
        })
      }
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      }
    },
    queryListApi(state, { payload }) {
      return {
        ...state,
        dataListApi: payload,
      }
    },
    setPage(state, { payload }) {
      return {
        ...state,
        page: payload,
      }
    },
    setPageApi(state, { payload }) {
      return {
        ...state,
        pageApi: payload,
      }
    },
  },
}
