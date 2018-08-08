import apis from '../api'

const { getRegion } = apis
 export default {
  namespace:'regionManagement',

  state:{
    list: [],
    pagination: false,
  },

  effects:{
    *getRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getRegion, { params: payload })
        const { datas, total = 0, pageSize = 10, pageNumber = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNumber} : false
        if (+response.code === 0) {
          yield put({
            type: 'changeList',
            payload: {
              list: datas,
              pagination,
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeList',
          payload: {
            list: [],
            pagination: false,
          },
        })
      }
    },
  },

  reducers:{
    changeList(state, { payload }) {
      return {
        ...state,
        list: payload.list,
        pagination: payload.pagination,
      }
    },
  },
}