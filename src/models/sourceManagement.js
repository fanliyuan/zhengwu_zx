import { message } from 'antd'

import apis from '../api'

const { getResources } = apis
 export default {
  namespace:'sourceManagement',

  state:{
    queryData: {},
    dataList: [],
  },

  effects:{
    *getResources({ payload }, { call, put, select }) {
      let response
      if (payload && payload.params) {
        yield put({
          type: 'savaQueryData',
          payload: {
            savaQueryData: payload.params,
          },
        })
      } else {
        payload.params = select(state => state.queryData)
      }
      try {
        response = yield call(getResources, {params: payload.params})
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          yield put({
            type: 'savaDataList',
            payload: {
              dataList: datas,
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
    saveQueryData(state, { queryData }) {
      return {
        ...state,
        queryData,
      }
    },
    savaDataList(state, { dataList, pagination }) {
      return {
        ...state,
        dataList,
        pagination,
      }
    },
  },
}