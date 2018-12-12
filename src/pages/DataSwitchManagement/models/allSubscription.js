import { message } from 'antd'
import apis from '../../../api'

const { getSubscription, getResourceSubscribeInfoInfo, getAssessLogs } = apis
 export default {
  namespace:'allSubscription',

  state:{
    dataList: [],
    pagination: false,
    subData: {},
    assessLogs: [],
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
    *getResourceSubscribeInfoInfo({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getResourceSubscribeInfoInfo, {params: payload.params})
        const { data } = response
        if (+response.code === 200) {
          yield put({
            type: 'savaSubData',
            payload: {
              subData: data,
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
    *getAssessLogs({ payload: params }, { call, put }) {
      let assessLogs = {}
      try {
        const res = yield call(getAssessLogs, params)
        assessLogs = res.result.datas
      } catch (error) {
        console.log(error) // eslint-disable-line
      } finally {
        yield put({
          type: 'saveAssessLogs',
          payload: [assessLogs],
        })
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
    savaSubData(state, {payload:{subData}}) {
      return {
        ...state,
        subData,
      }
    },
    saveAssessLogs(state, { payload: assessLogs }) {
      return {
        ...state,
        assessLogs,
      }
    },
  },
}