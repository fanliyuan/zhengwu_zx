import { message } from 'antd'
import apis from '../../../api'

const { getEntityInfo, getResourceByDataId } = apis

export default {
  namespace: 'infoSource',

  state: {
    dataDetail: {},
    resourceDetail: {},
  },

  effects: {
    *getDataDetail({ payload }, { call, put }) {
      const response = yield call(getEntityInfo, { params: payload })
      if (response.code === '200') {
        yield put({
          type: 'saveDataDetail',
          payload: response.data,
        })
      } else {
        message.error(response.msg)
      }
    },
    *getResourceDetail({ payload }, { call, put }) {
      const response = yield call(getResourceByDataId, { params: payload })
      if (response.code === '0') {
        yield put({
          type: 'saveResourceDetail',
          payload: response.data,
        })
      } else {
        message.error(response.msg)
      }
    },
  },

  reducers: {
    saveDataDetail(state, { payload }) {
      return {
        ...state,
        dataDetail: payload,
      }
    },
    saveResourceDetail(state, { payload }) {
      return {
        ...state,
        resourceDetail: payload,
      }
    },
    reset(state) {
      return {
        ...state,
        dataDetail: {},
        resourceDetail: {},
      }
    },
  },
}
