import apis from '../api'
import logo from '../assets/logo.svg'

const { getAccountInfo, notifyManagerList } = apis 

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {
      avatar: "",
      name: "",
      notifyCount: 0,
      userid: "00000001",
    },
    noticeList:[],
  },


  effects: {
    *fetchCurrent(_, { call, put }) {
      let response
      try {
        response = yield call(getAccountInfo, {path: localStorage.getItem('accountId')})
        if (+response.code === 0) {
          localStorage.setItem('accountRealName', JSON.parse(response.result.datas.extendedProperties).name || response.result.datas.accountName)
          yield put({
            type: 'saveCurrentUser',
            payload: {
              name: JSON.parse(response.result.datas.extendedProperties).name || response.result.datas.accountName,
              avatar: JSON.parse(response.result.datas.extendedProperties).avatar || logo,
            },
          })
        }
      } catch (error) {
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: '获取姓名错误',
            avatar: logo,
          },
        })
       // eslint-disable-next-line 
       console.log(error)
      }
    },
    *getNoticeList({ payload }, { call, put }){
      const response = yield call(notifyManagerList,{params:payload})
      try{
        if(+response.code === 0){
          yield put({
            type:'noticesList',
            payload:response.result.datas,
          })
        }
        else{
          throw response.msg
        }
      }catch(error){
        console.log(error) //eslint-disable-line
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      }
    },
    noticesList(state,action){
      return {
        ...state,
        noticeList:action.payload,
      }
    },
  },
}
