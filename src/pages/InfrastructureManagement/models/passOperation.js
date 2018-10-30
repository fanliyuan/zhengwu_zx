import apis from '../../../api'

const { passInfo, startNode, targetNode, channel } = apis

export default {
  namespace: 'passOperation',
  state: {
    params: {
      id:0,
      startNode: '0',
      startNodeId:1,
      targetNode: '0',
      targetNodeId:2,
      isDoubleSide: '0',
      isCompress: '0',
      isEncryption: '0',
    },
    list: [],
    pagination:false,
    startNode:[],
    targetNode:[],
    editMessage:'',
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
        const pagination = response.result.total > 9 ? { current: response.result.pageNumber, total:response.result.total,pageSize:response.result.pageSize } : false
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
    *editChannel({ payload }, { call, put }){
      const response = yield call(channel,{ body:payload })
      try{
        yield put({
          type:'responseAction',
          payload:response.msg,
        })
      }catch(err){
        yield put({
          type:'responseAction',
          payload:'',
        })
      }
    },
    *getStartNode({ payload }, { call, put }){
      const response = yield call(startNode,{ params:payload })
      try{
        response.result.unshift({key:-1,value:'起始节点'})
        yield put({
          type:'startNode',
          payload:response.result,
        })
      }catch(err){
        yield put({
          type:'startNode',
          payload:[],
        })
      }
    },
    *getTargetNode ({ payload }, { call, put }){
      const response = yield call(targetNode,{ params:payload })
      try{
        response.result.unshift({key:-1,value:'目标节点'})
        yield put({
          type:'targetNode',
          payload:response.result,
        })
      }catch(err){
        yield put({
          type:'targetNode',
          payload:[],
        })
      }
    },
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
    startNode(state, { payload }){
      return {
        ...state,
        startNode:payload,
      }
    },
    targetNode(state, { payload }){
      return {
        ...state,
        targetNode:payload,
      }
    },
    queryPass(state, {payload}){
      return {
        ...state,
        list: payload.list,
        pagination: payload.pagination,
      }
    },
    responseAction(state, { payload }){
      return {
        ...state,
        editMessage:payload,
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
