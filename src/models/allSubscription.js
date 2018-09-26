import { message } from 'antd'
import apis from '../api'

const { getSubscription } = apis
 export default {
  namespace:'allSubscription',

  state:{
    dataList: [],
    pagination: false,
  },

  effects:{
    *getSubscription({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getSubscription, {body: payload.body})
        const { data, total = 0, pageSize = 10, pageNum: current = 1 } = response.data
        const pagination = total > pageSize ? {total, pageSize, current} : false
        if (+response.code === 604) {
          yield put({
            type: 'savaDataList',
            payload: {
              dataList: data,
              pagination,
            },
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
       // eslint-disable-next-line
       console.log(error)
      } else {
        message.error(error || '操作失败')
      }
      }
    },
  },

  reducers:{
    savaDataList(state, {payload: {dataList, pagination}}) {
      return {
        ...state,
        dataList,
        pagination,
      }
    },
  },
}