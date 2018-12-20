import { message } from 'antd'
import { routerRedux } from 'dva/router'
import apis from '../../../api'

const { list, deletes, getResourceProperty, addResourceProperty, autoGetCode, getItemByIdLevel, editResourceProperty, isMountResource } = apis
export default {
  namespace:'sourceClassfiy',
  state:{
    dataList:[],
    paginations:{},
    resourceLists:[],
    itemList:[],
    autoCodes:'',
    targetData:[],
    mountMessage:false,
    // editMessage:[0],
  },
  effects:{
    *getLists({ payload} ,{ call, put }){
      const response = yield call(list,{params:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          const paginations = response.total > 9 ? {current:response.page,pageSize:response.size,total:response.total} : false
          yield put({
            type:'list',
            payload:{lists:response.data,paginations},
          })
          // yield put({
          //   type:'getMessage',
          //   payload:[0],
          // })
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
          message.error("网络或系统异常，请重试")
        }
      }
    },
    // *switchEdit(_,{put}){
    //   yield put({
    //     type:'getMessage',
    //     payload:[0],
    //   }) 
    // },
    *deleteItem({ payload} ,{ call,put }){
      let response = yield call(deletes,{params:payload, headers: {token: undefined}})
      response = JSON.parse(response)
      try{
        if(+response.code === 0){
          message.success('删除成功')
          yield put(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
        }else {
          message.error('删除失败')
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *getTargetItem({ payload} ,{ call,put }){
      const response = yield call(getItemByIdLevel,{params:payload, headers: {token: undefined}})
      // response = JSON.parse(response)
      try{
        if(+response.code === 0){
          yield put({
            type:'getTarget',
            payload:JSON.parse(response.data),
          })
        }else {
          message.error('查询单条数据失败')
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *getCode({ payload} ,{ call, put }){
      const response = yield call(autoGetCode,{params:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          yield put({
            type:'autoCode',
            payload:response.data,
          })
        }else {
          message.error('获取自动编码失败,请手动填写')
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *isMount({ payload} ,{ call, put }){
      const response = yield call(isMountResource,{params:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          yield put({
            type:'getMount',
            payload:response.data,
          })
        }else {
          message.error(response.message)
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *addItem({ payload} ,{ call, put }){
      const response = yield call(addResourceProperty,{body:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          message.success('新增成功')
          yield put({
            type:'getLists',
            payload:{type:1,index:1,pageSize:10},
          })
          yield put(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
        }else {
          message.error(response.msg)
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *editItem({ payload} ,{ call, put }){
      const response = yield call(editResourceProperty,{body:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          message.success('修改成功')
          // yield put({
          //   type:'getMessage',
          //   payload:[0],
          // })
          yield put({
            type:'getLists',
            payload:{type:1,index:1,pageSize:10},
          })
          yield put(routerRedux.push('/dataSourceManagement/sourceClassfiy'))
        }else if(+response.code === -1){
          // yield put({
          //   type:'getMessage',
          //   payload:[1],
          // })
          message.error(response.msg)
        }
        else {
          message.error(response.msg)
        }
      }catch(err){
        if(err){
          console.log(err) // eslint-disable-line
        }
      }
    },
    *getResourceList({ payload} ,{ call, put }){
      const response = yield call(getResourceProperty,{params:payload, headers: {token: undefined}})
      try{
        if(+response.code === 0){
          if(+payload.level === 1){
            yield put({
              type:'resourceList',
              payload:response.data,
            })
            // if(response.data.length === 0){
            //   message.error("项不存在，请先创建项")
            //   yield put({
            //     type:'autoCode',
            //     payload:'',
            //   })
            // }
          }
          else if(+payload.level === 2){
            yield put({
              type:'itemsList',
              payload:response.data,
            })
            // if(response.data.length === 0){
            //   message.error("目不存在，请先创建目")
            //   yield put({
            //     type:'autoCode',
            //     payload:'',
            //   })
            // }
          }
        }else if(payload.level === 1) {
            yield put({
              type:'resourceList',
              payload:[],
            })
          }
          else if(payload.level === 2) {
            yield put({
              type:'itemsList',
              payload:[],
            })
          }
          // yield put({
          //   type:'getMessage',
          //   payload:[0],
          // })
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
    resourceList(state, { payload }){
      return {
        ...state,
        resourceLists:payload,
      }
    },
    itemsList(state, { payload }){
      return {
        ...state,
        itemList:payload,
      }
    },
    autoCode(state, { payload }){
      return {
        ...state,
        autoCodes:payload,
      }
    },
    getTarget(state, { payload }){
      return {
        ...state,
        targetData:payload,
      }
    },
    getMount(state, { payload }){
      return {
        ...state,
        mountMessage:payload,
      }
    },
    // getMessage(state, { payload }){
    //   return {
    //     ...state,
    //     editMessage:payload,
    //   }
    // },
  },
}