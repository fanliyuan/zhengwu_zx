import { message } from 'antd'
import apis from '../api'

const { columnList, updateColumnInfo, selectColumnPage, searchColumn} = apis
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
          const list = response.result.datas.map(item => {
            return {
              ...item,
              name:item.columnPage,
              children:item.children.map(items => {
                return {
                  ...items,
                  name:items.columnPage,
                  columnPage:item.columnPage,
                  children:null,
                }
              }),
            }
          })
          yield put({
            type:'columnPositions',
            payload:list,
          })
        }
      }catch(error){
        console.log(error) // eslint-disable-line
      }
    },
    *searchList({ payload },{ call, put }){
      const response = yield call(searchColumn,{body:payload})
      try{
        if(+response.code === 0){
          message.success(`搜索${response.msg}`)
          const list = response.result.datas.map(item => {
            return {
              ...item,
              name:item.columnPage,
              children:item.children.map(items => {
                return {
                  ...items,
                  name:items.columnPage,
                  columnPage:item.columnPage,
                  children:null,
                }
              }),
            }
          })
          yield put({
            type:'columnPositions',
            payload:list,
          })
        }
      }catch(error){
        console.log(error) // eslint-disable-line
      }
    },
    *updateItem({ payload },{ call, put }){
      const response = yield call(updateColumnInfo,{body:payload})
      try{
        if(+response.code === 0){
          message.success(`修改${response.msg}`)
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
    *selectColumnPage(_, { call, put }){
      const response = yield call(selectColumnPage)
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