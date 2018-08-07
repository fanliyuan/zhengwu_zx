import apis from '../api'

const { passInfo } = apis

export default {
  namespace: 'passOperation',
  state: {
    params: {
      startCode: '0',
      targetCode: '0',
      isTwoWay: '0',
      isCompress: '0',
      isEncrypt: '0',
    },
    list: [],
    pagination:false,
  },
  effects: {
    *transmit({ payload }, { put }) {
      yield put({
        type: 'initial',
        payload,
      })
    },
    *querys({ payload },{ call, put }){
      const response = yield call(passInfo,{params: payload})
      try {
        const pagination = response.result.totalCounts > 9 ? { current: response.result.pageSize } : false
        if(+response.code === 0){
          yield put({
            type:'queryPass',
            payload:{
              list: response.result.datas,
              pagination,
            },
          })
        }
      } catch(err){
        const pagination = false
        yield put({
          type:'queryPass',
          payload:{
            list: [],
            pagination,
          },
        })
      }

    },
    // *getStartNode({ payload }, { call, put }){
    //   const response = yield call(startNode,{ params:payload })
    // },
  },
  reducers: {
    initial(state, action) {
      this.setState({
        params: action.payload,
      })
      return {
        ...state,
      }
    },
    // startNode(state, { payload }){
    //   return {
    //     ...state,
    //     startNode:payload,
    //   }
    // },
    queryPass(state, {payload}){
      return {
        ...state,
        list: payload.list,
        pagination: payload.pagination,
      }
    },
    saveRowInfo(state, { payload }) {
      return {
        ...state,
        params: {
          ...state.params,
          ...payload,
        },
      }
    },
  },
}
