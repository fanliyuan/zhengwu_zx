import apis from '../api'

const { categoryList } = apis

export default {
  namespace:'newsManagement',
  state:{
    list:[],
  },
  effects:{
    *querysCatagory({ payload }, { call, put }){
      const response = yield call(categoryList, { body:payload })
      try{
        yield put({
          type:'querys',
          payload:response,
        })
      }catch(err){
        yield put({
          type:'querys',
          payload:[],
        })
      }
    },
  },
  reducers:{
    querys( state ,{ payload }){
      return {
        ...state,
        list:payload,
      }
    },
  },
}