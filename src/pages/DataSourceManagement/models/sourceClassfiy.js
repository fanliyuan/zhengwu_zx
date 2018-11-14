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
        if(+response.code === 0){
          const paginations = response.total > 9 ? {current:response.page,pageSize:response.size,total:response.total} : false
          yield put({
            type:'list',
            payload:{lists:response.data,paginations},
          })
          if((payload.name === '' && response.data.length === 0) ||  (payload.name && response.data.length === 0)){
            message.error("很遗憾,没有搜索到匹配的分类信息")
          }
        }else {
          yield put({
            type:'list',
            payload:{lists:[],paginations:false},
          })
          message.error("搜索结果异样,请重新搜索")
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *deleteItem({ payload} ,{ call }){
      let response = yield call(deletes,{params:payload})
      response = JSON.parse(response)
      try{
        if(+response.code === 0){
          message.success('删除成功')
          // yield put({
          //   type:'getLists',
          //   payload:{type:1,index:1,pageSize:10},
          // })
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