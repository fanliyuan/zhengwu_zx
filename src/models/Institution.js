import { message } from 'antd'
import apis from '../api'

const { queryGoveDeptInfoList, deleteGoveDept, getProOneLevels, getProThreeLevels, getProTwoLevels } = apis // , deleteGoveDept, getGoveDeptInfo, getGoveDeptInfoByIds, insertGoveDept, updateGoveDept

export default {
  namespace: 'Institution',
  state: {
    lists:[],
    pagination:{},
    editId:0,
    paginations:{},
    cities:[],
    provices:[],
    areas:[],
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
        console.log(err) // eslint-disable-line
      }
    },
    *deleteItem ({ payload }, { call, put }){
      const response = yield call(deleteGoveDept,{params:payload})
      try{
        if(response.code === '200'){
          message.success(response.code)
          yield put({
            type:'querys',
            payload:{pageNum:0,pageSize:10},
          })
        }
      }catch(err){
        message.error("网络连接失败")
      }
    },
    *getOneLevel (_, { call, put }){
      const response = yield call(getProOneLevels)
      try{
        if(response.code === '200'){
          yield put({
            type:'getProvices',
            payload:response,
          })
        }
        else {
          yield put({
            type:'getProvices',
            payload:[],
          })  
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *getTwoLevel (_, { call, put }){
      const response = yield call(getProThreeLevels)
      try{
        if(response.code === '200'){
          yield put({
            type:'getProvices',
            payload:response,
          })
        }
      }catch(err){
        yield put({
          type:'getProvices',
          payload:response,
        })
      }
    },
    *getThreeLevel (_, { call, put }){
      const response = yield call(getProTwoLevels)
      try{
        if(response.code === '200'){
          yield put({
            type:'getcitys',
            payload:response,
          })
        }
      }catch(err){
        yield put({
          type:'getAreas',
          payload:response,
        })
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
    getProvices(state, {payload}){
      return {
        ...state,
        provices:payload,
      }
    },
    getcitys(state, {payload}){
      return {
        ...state,
        cities:payload,
      }
    },
    getAreas(state, {payload}){
      return {
        ...state,
        areas:payload,
      }
    },
  },
}
