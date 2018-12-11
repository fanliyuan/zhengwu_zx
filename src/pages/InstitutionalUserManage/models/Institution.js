import { message } from 'antd'
import apis from '../../../api'

const { deptNameIsTrueOrFalse, queryGoveDeptInfoList, deleteGoveDept, getProOneLevels, getProThreeLevels, getProTwoLevels, getGoveDeptInfo, getGoveDeptInfos, insertGoveDept, updateGoveDept } = apis // , deleteGoveDept, getGoveDeptInfo, getGoveDeptInfoByIds, insertGoveDept, updateGoveDept

export default {
  namespace: 'Institution',
  state: {
    lists:[],
    pagination:{},
    editId:0,
    paginations:{},
    cities:[],
    provices:[],
    areas:[],
    getItemByIdInfo:{},
    goveDeptInfos:[],
    isSameMessage:true,
  },
  effects: {
    *querys({ payload }, { call, put }){
      const response = yield call(queryGoveDeptInfoList,{params:payload})
      let pagination
      try {
        if(response.code === '200'){
          pagination = { current:response.data.pageNum,pageSize:response.data.pageSize,total:response.data.total }
          yield put({
            type:'queryInstitution',
            payload:{list:response.data.list, pagination},
          })
        }
        else {
          yield put({
            type:'queryInstitution',
            payload:{list:[]},
          })
          message.error(response.msg)
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *editItem ({ payload }, { call, put}){
      const response = yield call(updateGoveDept,{body:payload})
      try{
        if(response.code === '200'){
          message.success(response.msg)
          yield put({
            type:'querys',
            payload:{pageNum:1,pageSize:10},
          })
        }
        else {
          message.error(response.msg)
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *deptNameCheck({ payload },{call, put}){
      const response = yield call(deptNameIsTrueOrFalse,{params:payload})
      try{
        if(response.code === '200'){
          yield put({
            type:'getCheckMsg',
            payload:true,
          })
        }
        else {
          // message.error(response.msg)
          yield put({
            type:'getCheckMsg',
            payload:false,
          })
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *addItem ({ payload }, { call, put}){
      const response = yield call(insertGoveDept,{body:payload})
      try{
        if(+response.code === 200){
          message.success(response.msg)
          yield put({
            type:'querys',
            payload:{pageNum:1,pageSize:10},
          })
        }
        else {
          message.error(response.msg)
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *deleteItem ({ payload }, { call, put }){
      const response = yield call(deleteGoveDept,{params:payload})
      try{
        if(response.code === '200'){
          message.success(response.msg)
          yield put({
            type:'querys',
            payload:{pageNum:1,pageSize:10},
          })
        } else {
          message.error(response.msg)
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *getGoveDeptInfos(_, { call, put }){
      const response = yield call(getGoveDeptInfos)
      try{
        if(response.code === '200'){
          yield put({
            type:'goveDeptInfos',
            payload:response.data.list,
          })
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *getItmByIds ({ payload }, { call, put }){
      const response = yield call(getGoveDeptInfo,{params:payload})
      try {
        if(response.code === '200'){
          yield put({
            type:'queryItemInfo',
            payload:response.data,
          })
          const pro = response.data.proCityAreaInfo.split('|')[0]
          const cit = response.data.proCityAreaInfo.split('|')[2]
          yield put({
            type:'getTwoLevel',
            payload:{provinceId:pro},
          })
          yield put({
            type:'getThreeLevel',
            payload:{cityId:cit},
          })
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *getOneLevel (_, { call, put }){
      const response = yield call(getProOneLevels)
      try{
        // response.data.list.unshift({provinceId:-1,id:-1,name:'所属省'})
        if(response.code === '200'){
          yield put({
            type:'getProvices',
            payload:response.data.list,
          })
        }
        else {
          yield put({
            type:'getProvices',
            payload:[],
          })  
        }
      }catch(err){
        console.log(err) // eslint-disable-line
      }
    },
    *getTwoLevel ({ payload }, { call, put }){
      const response = yield call(getProTwoLevels,{params:payload})
      try{
        // response.data.list.unshift({cityId:-1,id:-1,name:'所属市'})
        if(response.code === '200'){
          yield put({
            type:'getCities',
            payload:response.data.list,
          })
        }
        else {
          yield put({
            type:'getCities',
            payload:[],
          })
        }
      }catch(err){
        console.log(err) //eslint-disable-line
      }
    },
    *getThreeLevel ({ payload }, { call, put }){
      const response = yield call(getProThreeLevels,{ params:payload })
      try{
        // response.data.list.unshift({areaId:-1,id:-1,name:'所属区域'})
        if(response.code === '200'){
          yield put({
            type:'getAreas',
            payload:response.data.list,
          })
        }
        else {
          yield put({
            type:'getAreas',
            payload:[],
          })
        }
      }catch(err){
        console.log(err) //eslint-disable-line
      }
    },
  },
  reducers: {
    queryInstitution(state, {payload}){
      return {
        ...state,
        list:payload.list,
        paginations:payload.pagination,
      }
    },
    queryItemInfo(state, {payload}){
      return {
        ...state,
        getItemByIdInfo:payload,
      }
    },
    goveDeptInfos(state,{ payload }){
      return {
        ...state,
        goveDeptInfos:payload,
      }
    },
    editId(state, {payload}){
      return {
        ...state,
        editId:payload.deptId,
      }
    },
    getCheckMsg(state, { payload }){
      return {
        ...state,
        isSameMessage:payload,
      }
    },
    getProvices(state, {payload}){
      return {
        ...state,
        provices:payload,
      }
    },
    getCities(state, {payload}){
      return {
        ...state,
        cities:payload,
      }
    },
    getAreas(state, {payload}){
      return {
        ...state,
        areas:payload,
      }
    },
  },
}
