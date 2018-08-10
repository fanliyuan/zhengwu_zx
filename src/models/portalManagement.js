import apis from '../api'

const { directoryList } = apis

export default {
  namespace: 'portalManagement',
  state:{
    lists:[],
  },
  effects:{
    *querys ({ payload }, { call, put }){
      const response = yield call(directoryList,{ body: payload })
      try {
        yield put ({
          type:'queryDirectory',
          payload:{
            lists:response,
          },
        })
      }catch(err){
        yield put ({
          type:'queryDirectory',
          payload:{
            lists:[],
          },
        })
      }
    },
  },
  reducers:{
    queryDirectory(state, { payload }){
      return {
        ...state,
        lists:payload,
      }
    },
  },
}