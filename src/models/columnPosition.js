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
    *queryList({ payload },{ call, put }){ // 这个接口目前不用了
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
    *searchList({ payload },{ call, put, select }){
      const response = yield call(searchColumn,{body:payload})
      const pageList = yield select(state => state.columnPosition.pageList)
      const selectPageName = (arr,ids) => {
        const name = arr.filter(item => {
          return +item.columnId === +ids
        })
        return name[0].columnPage
      }
      try{
        if(+response.code === 0){
          let list
          message.success(`搜索${response.msg}`)
          if(payload.columnPage === undefined){
            list = response.result.datas.map(item => {
              if(+item.columnPid === 0){
                return {
                  ...item,
                  name:item.columnPage,
                }
              }
              else {
                return {
                  ...item,
                  name:item.columnPage,
                  columnPage:selectPageName(pageList,item.columnPid),
                }
              }
            })
          }
          else {
            const colPageName = pageList.filter(item => {
              return +item.columnId === +payload.columnPage
            })
            list = response.result.datas.map(item => {
              return {
                ...item,
                name:item.columnPage,
                columnPage:colPageName[0].columnPage,
              }
            })
          }
          yield put({
            type:'columnPositions',
            payload:list,
          })
        }
        else {
          yield put({
            type:'columnPositions',
            payload:[],
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
          const pagination={pageNum:0,pageSize:0}
          yield put({
            type:'searchList',
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
          response.result.datas.unshift({columnId:-1,columnPage:'功能页面'})
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