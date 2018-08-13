import { message } from 'antd'
import apis from '../api'

const { queryGoveDeptInfoList, deleteGoveDept } = apis // , deleteGoveDept, getGoveDeptInfo, getGoveDeptInfoByIds, insertGoveDept, updateGoveDept

export default {
  namespace: 'Institution',
  state: {
    lists:[],
    pagination:{},
    editId:0,
  },
  effects: {
    *querys({ payload }, { call, put }){
      const response = yield call(queryGoveDeptInfoList,{params:payload})
      try {
        if(response.code === '200'){
          // response.data.list.length >=
          yield put({
            type:'queryInstitution',
            payload:response.data.list,
          })
        }
      }catch(err){
        yield put({
          type:'queryInstitution',
          payload:{list:response.code},
        })
      }
    },
    *deleteItem ({ payload }, { call, put }){
      const response = yield call(deleteGoveDept,{params:payload})
      try{
        if(response.code === '200'){
          message.success(response.code)
          yield put({
            type:'Institution/querys',
            payload:{pageNum:0,pageSize:10},
          })
        }
      }catch(err){
        message.error("网络连接失败")
      }
    },
  },
  reducers: {
    queryInstitution(state, {payload}){
      return {
        ...state,
        list:payload,
      }
    },
    editId(state, {payload}){
      return {
        ...state,
        editId:payload.deptId,
      }
    },
  },
}
