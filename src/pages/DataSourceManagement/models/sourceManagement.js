import { message } from 'antd'

import apis from '../../../api'

const { getSourceList, getDBInfo } = apis
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
      if (payload && payload.body) {
        yield put({
          type: 'savaQueryData',
          payload: {
            savaQueryData: payload.body,
          },
        })
      } else {
        payload = select(state => state.sourceManagement.queryData)
      }
      try {
        response = yield call(getSourceList, {body: payload.body})
        const { data, total = 0, pageSize = 10, pageNum = 1 } = response.data
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 604) {
          yield put({
            type: 'savaDataList',
            payload: {
              dataList: data || [],
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