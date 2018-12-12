import { message } from 'antd'
import apis from '../../../api'

const { getTaskData, getEntityInfo } = apis

export default {
  namespace: 'taskView',

  state: {
    runLogList: {},
    syncLogList: {},
    info: {},
    basicInfo: {},
    pageRun: 1,
    pageSync: 1,
  },

  effects: {
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getTaskData, {path: `${payload.id}/task/${payload.type}`})
      if (response && response.code === '200') {
        yield put({
          type: 'saveBasicInfo',
          payload: response.data,
        })
      } else {
        message.error(response.msg)
      }
    },
    *getBasicDetail({ payload }, { call, put }) {
      const response = yield call(getEntityInfo, {params: payload})
      if (response && response.code === '200') {
        yield put({
          type: 'saveInfo',
          payload: response.data,
        })
      } else {
        message.error(response.msg)
      }
    },
    *getRunlog({ payload }, { call, put }) {
      const response = yield call(getTaskData, {path: `${payload.id}/task/${payload.type}`, params: payload.query})
      if (response && response.code === '200') {
        yield put({
          type: 'saveRunlog',
          payload: response.data,
        })
        if (payload.page) {
          yield put({
            type: 'savePage',
            payload: payload.page,
          })
        }
      } else {
        message.error(response.msg)
      }
    },
    *getSynclog({ payload }, { call, put }) {
      const response = yield call(getTaskData, {path: `${payload.id}/task/${payload.type}`, params: payload.query})
      if (response && response.code === '200') {
        yield put({
          type: 'saveSynclog',
          payload: response.data,
        })
        if (payload.page) {
          yield put({
            type: 'saveSyncPage',
            payload: payload.page,
          })
        }
      } else {
        message.error(response.msg)
      }
    },
  },

  reducers: {
    saveBasicInfo(state, { payload }) {
      return {
        ...state,
        basicInfo: payload,
      }
    },
    saveInfo(state, { payload }) {
      return {
        ...state,
        info: payload,
      }
    },
    saveRunlog(state, { payload }) {
      return {
        ...state,
        runLogList: payload,
      }
    },
    saveSynclog(state, { payload }) {
      return {
        ...state,
        syncLogList: payload,
      }
    },
    savePage(state, { payload }) {
      return {
        ...state,
        pageRun: payload,
      }
    },
    saveSyncPage(state, { payload }) {
      return {
        ...state,
        pageSync: payload,
      }
    },
    reset(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
