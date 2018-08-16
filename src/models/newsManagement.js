import { message } from 'antd'
import apis from '../api'

const { categoryList, deleteCategory, updateCategory, insertCategory} = apis // searchCategory,

export default {
  namespace:'newsManagement',
  state:{
    list:[],
    searchList:[],
    pagination:{},
  },
  effects:{
    *querysCatagory({ payload }, { call, put }){
      const response = yield call(categoryList, { body:payload })  
      try{
        const pagination = response.result.total > 9 ? {current:response.result.pageNum,pageSize:response.result.pageSize,total:response.result.total} : false
        yield put({
          type:'querys',
          payload:{list:response.result.datas,pagination},
        })
      }catch(err){
        console.log(err) // eslint-disable-line
        yield put({
          type:'querys',
          payload:{list:[],pagination:false},
        })
      }
    },
    *deleteCatagory({ payload }, { call, put}){
      const response = yield call(deleteCategory, { params:payload })
      const pagination ={ pageSize:10,pageNum:1}
      try{
        if(+response.code === 0){
          message.success(`删除${response.msg}`)
          yield put({
            type:'querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.msg)
        }
      }catch(err){
        message.error("网络连接错误")
      }
    },
    // *searchCatagory({ payload }, { call, put }){
    //   const response = yield call(searchCategory, { body:payload })
    //   try{
    //     yield put({
    //       type:'querys',
    //       payload:response.result.datas,
    //     })
    //   }catch(err){
    //     yield put({
    //       type:'querys',
    //       payload:[],
    //     })
    //   }
    // },
    *insertCatagory({ payload }, { call, put }){
      const response = yield call(insertCategory, { body:payload })
      const pagination ={ pageSize:10,pageNum:1}
      try{
        if(+response.code === 0){
          message.success(`新增${response.msg}`)
          yield put({
            type:'querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.msg)
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
          message.success(`更新${response.msg}`)
          yield put({
            type:'querysCatagory',
            payload:{...pagination},
          })
        }
        else {
          message.info(response.msg)
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
        list:payload.list,
        pagination:payload.pagination,
      }
    },
  },
}