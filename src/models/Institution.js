import { message } from 'antd'
import apis from '../api'

const { queryGoveDeptInfoList, deleteGoveDept } = apis // , deleteGoveDept, getGoveDeptInfo, getGoveDeptInfoByIds, insertGoveDept, updateGoveDept

export default {
  namespace: 'Institution',
  state: {
    lists:[],
    pagination:{},
    editId:0,
    paginations:{},
  },
  effects: {
    *querys({ payload }, { call, put }){
      const response = yield call(queryGoveDeptInfoList,{params:payload})
      let pagination
      try {
        if(response.code === '200'){
          pagination = response.data.total > 9 ? { current:response.data.pageNum,pageSize:response.data.pageSize,total:response.data.total } : false
          yield put({
            type:'queryInstitution',
            payload:{list:response.data.list,pagination},
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
        list:payload.list,
        paginations:payload.pagination,
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
