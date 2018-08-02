import moment from 'moment'

import { getLog, getLogState } from '../api/test'

export default {
  namespace: 'overviewLogging',
  state: {
    data: [],
    pagination: {},
    stateList: [],
  },
  effects: {
    *state(_, obj) {
      const { call, put } = obj
      const response = yield call(getLogState)
      response.unshift({ value: -1, label: '全部结果' })
      yield put({
        type: 'savestate',
        payload: response,
      })
    },
    *log({ payload }, { call, put, select, take }) {
      let stateList = yield select(state => state.overviewLogging.stateList)
      const response = yield call(getLog, payload)
      if (!stateList.length) {
        yield put({ type: 'state' })
        yield take('state/@@end')
        stateList = yield select(state => state.overviewLogging.stateList)
      }
      const stateObject = stateList.reduce((pre, cur) => {
        pre[cur.value] = cur.label // eslint-disable-line
        return pre
      }, {})
      response.data = response.data.map(item => {
        return {
          ...item,
          result: stateObject[item.result],
          time: moment(item.time, 'x').format('LLL'),
        }
      })
      yield put({
        type: 'save',
        payload: response,
      })
    },
  },
  reducers: {
    savestate(state, action) {
      return {
        ...state,
        stateList: action.payload,
      }
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
