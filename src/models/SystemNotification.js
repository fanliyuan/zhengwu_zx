// import moment from 'moment'
import { message } from 'antd'

import apis from '../api'
// import { getNotices, deleteTableRows, changeTableStates, selectInfos } from '../api/test' // 删

const { notifyManagerList, deleteNotifyManager, nextNotifyManager, notifyManager, prevNotifyManager, readMarkNotifyManager } = apis // 

export default {
  namespace: 'SystemNotification',
  state: {
    data: [], // 删
    pagination: {},// 删
    backInfo: '',// 删
    changeBack: '',// 删
    infos: {},// 删
    dataList: [],
    itemDetail:{},
  },
  effects: {
    *getNoticeList({ payload }, { call, put }){
      const response = yield call(notifyManagerList,{params:payload})
      try{
        if(+response.code === 0){
          const { datas, pageNumber, pageSize, total } = response.result
          const pagination = total > 9 ? { current:pageNumber, total, pageSize } : false
          yield put({
            type:'initialList',
            payload:{
              datass:datas || [],
              pagination,
            },
          })
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *deleteNoticeItem({ payload }, { call,put}){
      const response = yield call(deleteNotifyManager,{params:payload})
      try{
        if(+response.code === 0){
          message.success(`删除${response.msg}`)
          const accountId = localStorage.getItem("accountId")
          yield put({
            type:'getNoticeList',
            payload:{accountId},
          })
        }
        else{
          message.error(response.msg)
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *getNextNoticeItem({ payload }, { call, put }){
      const response = yield call(nextNotifyManager,{path:payload.curNotifyId,params:{accountId:payload.accountId}})
      try{
        if(+response.code === 0){
          if(response.result){
            yield put({
              type:'noticeItemDetail',
              payload:response.result,
            })
          }
          else {
            message.info("没有数据")
          }

        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *getNoticeItem({ payload }, { call, put }){
      const response = yield call(notifyManager,{path:payload.id,params:{accountId:payload.accountId}})
      try{
        if(+response.code === 0){
          yield put({
            type:'noticeItemDetail',
            payload:response.result,
          })
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *getPreNoticeItem({ payload }, { call, put }){
      const response = yield call(prevNotifyManager,{path:payload.curNotifyId,params:{accountId:payload.accountId}})
      try{
        if(+response.code === 0){
          if(response.result){
            yield put({
              type:'noticeItemDetail',
              payload:response.result,
            })
          }
          else {
            message.info("没有数据")
          }
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *MarkReadNoticeItem({ payload }, { call,put }){
      const response = yield call(readMarkNotifyManager,{params:payload})
      try{
        if(+response.code === 0){
          const accountId = localStorage.getItem("accountId")
          message.success(`标记已读${response.msg}`)
          yield put({
            type:'getNoticeList',
            payload:{accountId},
          })
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
  //   *getIntros({ payload }, { call, put }) { // 删
  //     const response = yield call(getNotices, payload)
  //     response.data = response.data.map(item => {
  //       return { ...item, noteTime: moment(item.noteTime).format('YYYY-MM-DD HH:mm:ss') }
  //     })
  //     yield put({
  //       type: 'initial',
  //       payload: response,
  //     })
  //   },
  //   *deleteRows({ payload }, { call, put }) { // 删
  //     const response = yield call(deleteTableRows, payload)
  //     yield put({
  //       type: 'delete',
  //       payload: response,
  //     })
  //   },
  //   *changeState({ payload }, { call, put }) { // 删
  //     const response = yield call(changeTableStates, payload)
  //     yield put({
  //       type: 'change',
  //       payload: response,
  //     })
  //   },
  //   *selectById({ payload }, { call, put }) { // 删
  //     const response = yield call(selectInfos, payload)
  //     response.noteTime = moment(response.noteTime).format('YYYY-MM-DD HH:mm:ss')
  //     yield put({
  //       type: 'select',
  //       payload: response,
  //     })
  //   },
  },
  reducers: {
    initial(state, action) { // 删
      return {
        ...state,
        ...action.payload,
      }
    },
    delete(state, action) { // 删
      return {
        ...state,
        backInfo: action.payload,
      }
    },
    change(state, action) {// 删
      return {
        ...state,
        changeBack: action.payload,
      }
    },
    select(state, action) {// 删
      return {
        ...state,
        infos: action.payload,
      }
    },
    initialList(state, {payload}) {
      return {
        ...state,
        dataList:payload.datass,
        pagination:payload.pagination,
      }
    },
    noticeItemDetail(state, {payload}){
      return {
        ...state,
        itemDetail:payload,
      }
    },
  },
}
