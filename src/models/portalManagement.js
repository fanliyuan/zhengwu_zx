import { message } from 'antd'
import apis from '../api'

const { updateResource, resourceSearchList } = apis

export default {
  namespace: 'portalManagement',
  state:{
    lists:[],
    pagination:{},
  },
  effects:{
    *querys ({ payload }, { call, put }){
      const response = yield call(resourceSearchList,{ body: payload })
      try {
        if(+response.code === 0){
          const pagination = response.result.datas.total > 9 ? {current:response.result.datas.pageNum,pageSize:response.result.datas.pageSize,total:response.result.datas.total} : false
          yield put ({
            type:'queryDirectory',
            payload:{
              lists:response.result.datas,
              pagination,
            },
          })
        }
        else {
          yield put ({
            type:'queryDirectory',
            payload:{
              lists:[],
            },
          }) 
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *updateItem ({ payload }, {call}){
      const response = yield call(updateResource,{ body: payload })
      try {
        if(+response.code === 0){
          message.info(response.msg)
      }
      }catch(err){
        console.log(err) // eslint-disable-line
      }   
    },
  },
  reducers:{
    queryDirectory(state, { payload }){
      return {
        ...state,
        lists:payload.lists,
        pagination:payload.pagination,
      }
    },
  },
}