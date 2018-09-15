import { message } from 'antd'
import apis from '../api'

const { columnList, updateColumnInfo, selectColumnPage, searchColumn, judgeColumn} = apis
export default {
  namespace:'columnPosition',
  state:{
    list:[],
    pageList:[],
    pagination:{},
    msg:"",
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
    *checkColumn({ payload }, { call, put }){
      const response = yield call(judgeColumn, { params:payload })
      try{
        if(+response.code === 0){
          yield put({
            type:'getMsg',
            payload:response.result.data,
          })
        }
        else{
          message.error(response.msg)
        }
      }catch(error){
        console.log(err) // eslint-disable-line
      }
    },
    *searchList({ payload },{ call, put, select }){
      const response = yield call(searchColumn,{body:payload})
      const pageList = yield select(state => state.columnPosition.pageList)
      const selectPageName = (arr,ids) => {
        const name = arr.filter(item => {
          return +item.columnId === +ids
        })
        return name[0] && name[0].columnPage
      }
      try{
        if(+response.code === 0){
          let list
          const pagination = response.result.total > 9 ? { current:response.result.pageNum,total:response.result.total,pageSize:response.result.pageSize } : false
          const { pageNum = 1, pageSize = 10 } = response.result
          let index = ( pageNum -1 ) * pageSize < 0 ? 0 :( pageNum -1 ) * pageSize
          // message.success(`搜索${response.msg}`)
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
          list.forEach(item => {
            index++
            item.kid = index
          })
          yield put({
            type:'columnPositions',
            payload:{list,pagination},
          })
        }
        else {
          yield put({
            type:'columnPositions',
            payload:{list:[],pagination:false},
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
        else {
          message.error(`${response.msg}`)
        }
      }catch(error){
        console.log(error) // eslint-disable-line
      }
    },
    *selectColumnPage(_, { call, put }){
      const response = yield call(selectColumnPage)
      try{
        if(+response.code === 0){
          // response.result.datas.unshift({columnId:-1,columnPage:'功能页面'})
          response.result.datas = response.result.datas.filter(item => item.columnPage === '首页' || item.columnPage === '开放动态')
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
        list:payload.list,
        pagination:payload.pagination,
      }
    },
    columnPage(state, { payload }){
      return {
        ...state,
        pageList:payload,
      }
    },
    getMsg( state, { payload }){
      return {
        ...state,
        msg:payload,
      }
    },
  },
}