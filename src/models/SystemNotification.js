import moment from 'moment'

import apis from '../api'
import { getNotices, deleteTableRows, changeTableStates, selectInfos } from '../api/test' // 删

const { notifyManagerList } = apis // deleteNotifyManager

export default {
  namespace: 'SystemNotification',
  state: {
    data: [], // 删
    pagination: {},// 删
    backInfo: '',// 删
    changeBack: '',// 删
    infos: {},// 删
  },
  effects: {
    *getNoticeList({ payload }, { call, put }){
      const response = yield call(notifyManagerList,payload)
      try{
        if(+response.code === 0){
          yield put({
            type:'',
            payload:response.data,
          })
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
    *getIntros({ payload }, { call, put }) { // 删
      const response = yield call(getNotices, payload)
      response.data = response.data.map(item => {
        return { ...item, noteTime: moment(item.noteTime).format('YYYY-MM-DD HH:mm:ss') }
      })
      yield put({
        type: 'initial',
        payload: response,
      })
    },
    *deleteRows({ payload }, { call, put }) { // 删
      const response = yield call(deleteTableRows, payload)
      yield put({
        type: 'delete',
        payload: response,
      })
    },
    *changeState({ payload }, { call, put }) { // 删
      const response = yield call(changeTableStates, payload)
      yield put({
        type: 'change',
        payload: response,
      })
    },
    *selectById({ payload }, { call, put }) { // 删
      const response = yield call(selectInfos, payload)
      response.noteTime = moment(response.noteTime).format('YYYY-MM-DD HH:mm:ss')
      yield put({
        type: 'select',
        payload: response,
      })
    },
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
  },
}
