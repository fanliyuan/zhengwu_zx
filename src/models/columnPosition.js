import { message } from 'antd'
import apis from '../api'

const { columnList, updateColumnInfo, selectColumnPage} = apis
export default {
  namespace:'columnPosition',
  state:{
    list:[],
    pageList:[],
  },
  effects:{
    *queryList({ payload },{ call, put }){
      const response = yield call(columnList,{body:payload})
      try{
        if(+response.code === 0){
          yield put({
            type:'columnPositions',
            payload:response.result.datas,
          })
        }
      }catch(error){
        yield put({
          type:'columnPositions',
          payload:[],
        })
      }
    },
    *updateItem({ payload },{ call, put }){
      const response = yield call(updateColumnInfo,{body:payload})
      try{
        if(+response.code === 0){
          message.success(response.msg)
          const pagination={pageNum:1,pageSize:10}
          yield put({
            type:'queryList',
            payload:pagination,
          })
        }
      }catch(error){
        console.log(error) // eslint-disable-line
      }
    },
    *selectColumnPage({ payload }, { call, put }){
      const response = yield call(selectColumnPage,{ params:payload })
      try{
        if(+response.code === 0){
          yield put({
            type:'columnPage',
            payload:response.result.datas,
          })
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
  },
  reducers:{
    columnPositions(state, { payload }){
      return {
        ...state,
        list:payload,
      }
    },
    columnPage(state, { payload }){
      return {
        ...state,
        pageList:payload,
      }
    },
  },
}