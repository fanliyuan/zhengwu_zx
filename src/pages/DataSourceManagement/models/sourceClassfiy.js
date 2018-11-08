import { message } from 'antd'
import apis from '../../../api'

const { list, deletes } = apis
export default {
  namespace:'sourceClassfiy',
  state:{
    dataList:[],
    paginations:{},
  },
  effects:{
    *getLists({ payload} ,{ call, put }){
      const response = yield call(list,{params:payload})
      try{
        if(response.code === 0){
          const paginations = response.total > 9 ? {current:response.page,pageSize:response.size,total:response.total} : false
          yield put({
            type:'list',
            payload:{lists:response.data,paginations},
          })
        }else {
          message.error("查询失败")
          yield put({
            type:'list',
            payload:{lists:[],paginations:false},
          })
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *deleteItem({ payload} ,{ call }){
      const response = yield call(deletes,{body:payload})
      try{
        if(response.code === 0){
          message.success('删除成功')
        }else {
          message.error('删除失败')
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
  },
  reducers:{
    list(state, { payload:{lists,paginations} }){
      return {
        ...state,
        dataList:lists,
        paginations,
      }
    },
  },
}