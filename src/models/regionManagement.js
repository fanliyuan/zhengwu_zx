import { message } from 'antd'
import { routerRedux } from 'dva/router'
import apis from '../api'

import { number2String } from '../utils/utils'

const { getRegion, getRegionNodes, startRegion, stopRegion, deleteRegion, addRegion, editRegion, getDepartments, getNodesByDepartment } = apis
 export default {
  namespace:'regionManagement',

  state:{
    list: [],
    pagination: false,
    nodeList: [],
    queryData: {},
    deptList: [],
    nodeListT: [],
  },

  effects:{
    *getRegion({ payload }, { call, put, select }) {
      let response
      if (payload) {
        yield put({
          type: 'changeQueryData',
          payload,
        })
      } else {
        payload = yield select(state => state.regionManagement.queryData)
      }
      try {
        response = yield call(getRegion, { params: payload.params })
        const { datas, total = 0, pageSize = 10, pageNumber = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNumber} : false
        if (+response.code === 0) {
          yield put({
            type: 'changeList',
            payload: {
              list: datas,
              pagination,
            },
          })
        } else {
          message.error(response.msg)
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeList',
          payload: {
            list: [],
            pagination: false,
          },
        })
      }
    },
    *getRegionNodes(_, { call, put }) {
      let response
      try {
        response = yield call(getRegionNodes, {})
        const nodeList = response.result
        yield put({
          type: 'changeNodeList',
          payload: {
            nodeList: JSON.parse(JSON.stringify(nodeList).replace(/nodeId/g, 'value').replace(/nodeName/g, 'label').replace(/childNodes/g, 'children'))
            ,
          },
        })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeNodeList',
          payload: {
            nodeList: [],
          },
        })
      }
    },
    *startRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call(startRegion, {path: payload.regionId})
        if (+response.code === 0) {
          message.success('交换域启用成功!')
          yield put({
            type: 'getRegion',
          })
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *stopRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call(stopRegion, {path: payload.regionId})
        if (+response.code === 0) {
          message.success('交换域停用成功!')
          yield put({
            type: 'getRegion',
          })
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *deleteRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call(deleteRegion, {path: payload.regionId})
        if (+response.code === 0) {
          message.success('交换域删除成功!')
          yield put({
            type: 'getRegion',
          })
        } else {
          message.error(response.msg)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *addRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call (addRegion, { body: payload.body, params: payload.params })
        if (+response.code === 0) {
          message.success('新建成功')
          yield put(routerRedux.push('/infrastructure/switch'))
        } else {
          message.error(response.msg)
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
      }
    },
    *editRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call (editRegion, { body: payload.body })
        if (+response.code === 0) {
          message.success('修改成功')
          yield put(routerRedux.push('/infrastructure/switch'))
        } else {
          message.error(response.msg)
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
      }
    },
    *getDepartments(_, { call, put }) {
      let response
      try {
        response = yield call(getDepartments, {})
        if (+response.code === 200) {
          yield put({
            type: 'changeDeptList',
            payload: {
              deptList: number2String(response.data.list),
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeDeptList',
          payload: {
            deptList: [],
          },
        })
      }
    },
    *getNodes({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getNodesByDepartment, {params: {deptIds: payload.deptIds}})
        if (+response.code === 0) {
          yield put({
            type: 'changeNodeListT',
            payload: {
              nodeListT: number2String(JSON.parse(JSON.stringify(Object.values(response.result).reduce((pre, cur) => [...pre, ...cur],[])).replace(/nodeId/g, 'value').replace(/nodeName/g, 'title').replace(/childNodes/g, 'children'))),
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeNodeListT',
          payload: {
            nodeListT: [],
          },
        })
      }
    },
  },

  reducers:{
    changeList(state, { payload }) {
      return {
        ...state,
        list: payload.list,
        pagination: payload.pagination,
      }
    },
    changeNodeList(state, { payload: {nodeList} }) {
      return {
        ...state,
        nodeList,
      }
    },
    changeQueryData(state, { payload }) {
      return {
        ...state,
        queryData: payload,
      }
    },
    changeDeptList(state, { payload: {deptList} }) {
      return {
        ...state,
        deptList,
      }
    },
    changeNodeListT(state, { payload: {nodeListT} }) {
      return {
        ...state,
        nodeListT,
      }
    },
  },
}