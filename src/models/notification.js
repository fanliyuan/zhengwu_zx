import { message } from 'antd'
import { routerRedux } from 'dva/router'
import apis from '../api'

const { getNotifications, deleteNotifications, readNotification } = apis

export default {
  namespace: 'notification',

  state: {
    dataList: [],
    pagination: false,
    queryData: {},
    notificationDetail: {},
  },

  effects: {
    *getNotifications({ payload }, { call, put, select }) {
      let response
      if (payload && payload.params) {
        yield put({
          type: 'saveQueryData',
          payload,
        })
      } else {
        payload = yield select(state => state.notification.queryData)
      }
      try {
        response = yield call(getNotifications, {params: payload.params})
        const { datas, total = 0, pageSize = 10, pageNumber: current = 1 } = response.result
        const pagination = total > pageSize ? {total, pageSize, current} : false
        if (+response.code === 0) {
          yield put({
            type: 'saveDataList',
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
    *getNotificationDetail({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getNotifications, {path: payload.path})
        const { data } = response.result
        if (+response.code === 0) {
          yield put({
            type: 'saveNotificationDetail',
            payload: {
              notificationDetail: data,
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
    *deleteNotifications({ payload }, { call,put }) {
      let response
      try {
        response = yield call(deleteNotifications, {params: payload.params})
        if (payload && payload.flag) {
          routerRedux.push('/overview/systemNotification')
          return null
        }
        if (+response.code === 0) {
          message.success(response.msg || '删除成功')
          yield put({
            type: 'notification/getNotifications',
            payload: {},
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error) // eslint-disable-line
        } else {
          message.error(error || '操作失败')
        }
      }
      
    },
    *readNotification({ payload }, { call, put }) {
      let response
      try {
        response = yield call(readNotification, {body:payload.body})
        if (payload && payload.flag) {
          return null
        }
        if (+response.code === 0) {
          message.success(response.msg || '')
          yield put({
            type: 'notification/getNotifications',
            payload: {},
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

  reducers: {
    saveDataList(state, {payload: {pagination,dataList}}) {
      return {
        ...state,
        dataList,
        pagination,
      }
    },
    saveQueryData(state, {payload:queryData}) {
      return {
        ...state,
        queryData,
      }
    },
    saveNotificationDetail(state, {payload: {notificationDetail}}) {
      return {
        ...state,
        notificationDetail,
      }
    },
  },
}