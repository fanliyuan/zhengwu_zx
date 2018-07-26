import moment from 'moment'

import { getNotices, deleteTableRows, changeTableStates, selectInfos } from '../services/api'

export default {
  namespace: 'SystemNotification',
  state: {
    data: [],
    pagination: {},
    backInfo: '',
    changeBack: '',
    infos: {},
  },
  effects: {
    *getIntros({ payload }, { call, put }) {
      const response = yield call(getNotices, payload)
      response.data = response.data.map(item => {
        return { ...item, noteTime: moment(item.noteTime).format('YYYY-MM-DD HH:mm:ss') }
      })
      yield put({
        type: 'initial',
        payload: response,
      })
    },
    *deleteRows({ payload }, { call, put }) {
      const response = yield call(deleteTableRows, payload)
      yield put({
        type: 'delete',
        payload: response,
      })
    },
    *changeState({ payload }, { call, put }) {
      const response = yield call(changeTableStates, payload)
      yield put({
        type: 'change',
        payload: response,
      })
    },
    *selectById({ payload }, { call, put }) {
      const response = yield call(selectInfos, payload)
      response.noteTime = moment(response.noteTime).format('YYYY-MM-DD HH:mm:ss')
      yield put({
        type: 'select',
        payload: response,
      })
    },
  },
  reducers: {
    initial(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    delete(state, action) {
      return {
        ...state,
        backInfo: action.payload,
      }
    },
    change(state, action) {
      return {
        ...state,
        changeBack: action.payload,
      }
    },
    select(state, action) {
      return {
        ...state,
        infos: action.payload,
      }
    },
  },
}
