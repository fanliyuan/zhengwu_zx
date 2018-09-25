import { message } from 'antd'

import apis from '../api'

const { getCatalog, getDBInfo } = apis
 export default {
  namespace:'sourceManagement',

  state:{
    queryData: {},
    dataList: [],
    pagination: false,
    DBInfo: {},
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
        payload = select(state => state.sourceManagement.queryData)
      }
      try {
        response = yield call(getCatalog, {params: payload.params})
        const { rows, total = 0, limit: pageSize = 10, index: pageNum = 1 } = response.data
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          yield put({
            type: 'savaDataList',
            payload: {
              dataList: rows || [],
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
    *getDBInfo({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getDBInfo, {params: payload.params})
        const { data } = response
        if (+response.code === 200) {
          yield put({
            type: 'saveDBInfo',
            payload: {
              DBInfo: data,
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
        yield put({
          type: 'saveDBInfo',
          payload: {
            DBInfo: {},
          },
        })
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
    savaDataList(state, { payload:{dataList, pagination} }) {
      return {
        ...state,
        dataList,
        pagination,
      }
    },
    saveDBInfo(state, {payload: {DBInfo}}) {
      return {
        ...state,
        DBInfo,
      }
    },
  },
}