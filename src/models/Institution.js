import apis from '../api'

const { queryGoveDeptInfoList } = apis // , deleteGoveDept, getGoveDeptInfo, getGoveDeptInfoByIds, insertGoveDept, updateGoveDept

export default {
  namespace: 'Institution',
  state: {
    lists:[],
  },
  effects: {
    *querys({ payload }, { call, put }){
      const response = yield call(queryGoveDeptInfoList,{body:payload})
      try {
        yield put({
          type:'queryInstitution',
          payload:response.result,
        })
      }catch(err){
        yield put({
          type:'queryInstitution',
          payload:[],
        })
      }
    },
  },
  reducers: {
    queryInstitution(state, {payload}){
      return {
        ...state,
        list:payload.list,
      }
    },
  },
}
