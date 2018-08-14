import { message } from 'antd'
import apis from '../api'

const { categoryList, searchCategory, deleteCategory, updateCategory, insertCategory} = apis

export default {
  namespace:'newsManagement',
  state:{
    list:[],
    searchList:[],
  },
  effects:{
    *querysCatagory({ payload }, { call, put }){
      const response = yield call(categoryList, { body:payload })
      try{
        yield put({
          type:'querys',
          payload:response.result.datas,
        })
      }catch(err){
        yield put({
          type:'querys',
          payload:[],
        })
      }
    },
    *deleteCatagory({ payload }, { call, put}){
      const response = yield call(deleteCategory, { params:payload })
      const pagination ={ pageSize:10,pageNum:1}
      try{
        if(+response.code === 0){
          message.success(response.message)
          yield put({
            type:'newsManagement/querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.message)
        }
      }catch(err){
        message.error("网络连接错误")
      }
    },
    *searchCatagory({ payload }, { call, put }){
      const response = yield call(searchCategory, { body:payload })
      try{
        yield put({
          type:'querys',
          payload:response.result.datas,
        })
      }catch(err){
        yield put({
          type:'querys',
          payload:[],
        })
      }
    },
    *insertCatagory({ payload }, { call, put }){
      const response = yield call(insertCategory, { body:payload })
      const pagination ={ pageSize:10,pageNum:1}
      try{
        if(+response.code === 0){
          message.success(response.message)
          yield put({
            type:'newsManagement/querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.message)
        }
      }catch(err){
        message.error("网络连接错误")
      }
    },
    *updateCatagory({ payload }, { call, put }){
      const response = yield call(updateCategory, { body:payload })
      const pagination ={ pageSize:10,pageNum:1}
      try{
        if(+response.code === 0){
          message.success(response.message)
          yield put({
            type:'newsManagement/querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.message)
        }
      }catch(err){
        message.error("网络连接错误")
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