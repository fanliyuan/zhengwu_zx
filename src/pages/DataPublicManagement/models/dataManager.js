import { message } from 'antd'
import apis from '../../../api'

const { getSourceList, getParentNodes, getEntityInfo } = apis

export default {
  namespace: 'dataManager',

  state: {
    data: {
      data: [],
      total: 0,
    },
    nodes: [],
    entityInfo: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getSourceList, { body: payload })
      yield put({
        type: 'queryList',
        payload: response,
      })
    },
    *getNodes({ payload }, { call, put }) {
      const response = yield call(getParentNodes, { params: payload })
      if (response.code === '604') {
        yield put({
          type: 'setNodes',
          payload: response,
        })
      } else {
        message.error(response.msg)
      }
    },
    *getReqBeanEntityInfo({ payload }, { call, put }) {
      const response = yield call(getEntityInfo, { params: payload })
      if (response.code === '200') {
        yield put({
          type: 'setEntityInfo',
          payload: response,
        })
      } else {
        message.error(response.msg)
      }
    },
  },

  reducers: {
    queryList(state, { payload }) {
      if (payload && payload.data) {
        return {
          ...state,
          data: {
            ...payload.data,
          },
        }
      }
      return {
        ...state,
        data: {
          ...payload,
        },
      }
    },
    setNodes(state, { payload }) {
      return {
        ...state,
        nodes: payload.data,
      }
    },
    setEntityInfo(state, { payload }) {
      return {
        ...state,
        entityInfo: payload.data,
      }
    },
    resetEntityInfo(state) {
      return {
        ...state,
        entityInfo: {},
      }
    },
  },
}
