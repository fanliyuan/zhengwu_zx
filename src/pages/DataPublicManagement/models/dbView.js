import { message } from 'antd'
import apis from '../../../api'

const { getEntityInfo, getDataByMog } = apis

export default {
  namespace: 'dbView',

  state: {
    entityInfo: {},
    dataList: {},
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
    *getDataByMog({ payload }, { call, put }) {
      try {
        const response = yield call(getDataByMog, { params: payload })
        if (+response.code === 200) {
          yield put({
            type: 'saveDataList',
            payload: response,
          })
        }
      } catch (error) {
        console.log(error)
        yield put({
          type: 'saveDataList',
          payload: {
            dataList: {},
          },
        })
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
    saveDataList(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      }
    },
    reset(state) {
      return {
        ...state,
        entityInfo: {},
        dataList: {},
      }
    },
  },
}
