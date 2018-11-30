import { message } from 'antd'
import apis from '../../../api'

const { getEntityInfo } = apis

export default {
  namespace: 'dbView',

  state: {
    entityInfo: {},
  },

  effects: {
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
    setEntityInfo(state, { payload }) {
      return {
        ...state,
        entityInfo: payload.data,
      }
    },
    reset(state) {
      return {
        ...state,
        entityInfo: {},
      }
    },
  },
}
