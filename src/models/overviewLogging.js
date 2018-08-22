import moment from 'moment'
import apis from '../api'

const { getLoginLogging } = apis

export default {
  namespace: 'overviewLogging',

  state: {
    loggingList: [],
    pagination: false,
    stateList: [],
    queryData: {},
  },

  effects: {
    *state(_, { put }) {
      // const response = yield call(getLogState)
      const response = [
        {
          value: '1',
          label: '登录成功',
        },
        {
          value: '0',
          label: '登录失败',
        },
      ]
      response.unshift({ value: '全部结果', label: '全部结果' })
      yield put({
        type: 'savestate',
        payload: response,
      })
    },
    *log({ payload }, { call, put, select, take }) {
      let stateList = yield select(state => state.overviewLogging.stateList)
      // 保存和获取查询参数
      if (payload) {
        yield put({
          type: 'saveQueryData',
          payload,
        })
      } else {
        payload = yield select(state => state.overviewLogging.queryData)
      }
      const response = yield call(getLoginLogging, { params: payload.params })
      // 获取状态表
      if (!stateList.length) {
        yield put({ type: 'state' })
        yield take('state/@@end')
        stateList = yield select(state => state.overviewLogging.stateList)
      }
      // 将状态数组转换为状态对象,方便后面取值
      // const stateObject = stateList.reduce((pre, cur) => {
      //   pre[cur.value] = cur.label // eslint-disable-line
      //   return pre
      // }, {})
      // 遍历返回结果加工数据
      // response.data = response.data.map(item => {
      //   return {
      //     ...item,
      //     result: stateObject[item.result],
      //     time: moment(item.time, 'x').format('LLL'),
      //   }
      // })
      try {
        const pagination = response.data.total > (payload && payload.params && payload.params.pageSize || 10) ? { total: response.data.total, pageSize: response.data.pageSize, current: response.data.pageNum } : false
        response.data.list.forEach(item => {
          item.createTime = moment(item.createTime).format('lll')
        })
        if (+response.code === 200) {
          yield put({
            type: 'save',
            payload: {
              pagination,
              loggingList: response.data.list,
            },
          })
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
      }
    },
  },

  reducers: {
    savestate(state, action) {
      return {
        ...state,
        stateList: action.payload,
      }
    },
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    saveQueryData(state, { payload }) {
      return {
        ...state,
        queryData: payload,
      }
    },
  },
}
