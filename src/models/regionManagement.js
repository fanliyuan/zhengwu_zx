import { message } from 'antd'
import { routerRedux } from 'dva/router'
import apis from '../api'

const { getRegion, getRegionNodes, startRegion, stopRegion, deleteRegion, addRegion, editRegion } = apis
 export default {
  namespace:'regionManagement',

  state:{
    list: [],
    pagination: false,
    nodeList: [],
  },

  effects:{
    *getRegion({ payload }, { call, put }) {
      let response
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
    *startRegion({ payload }, { call }) {
      let response
      try {
        response = yield call(startRegion, {path: payload.regionId})
        if (response.code === 0) {
          message.success('交换域启用成功!')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *stopRegion({ payload }, { call }) {
      let response
      try {
        response = yield call(stopRegion, {path: payload.regionId})
        if (response.code === 0) {
          message.success('交换域停用成功!')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *deleteRegion({ payload }, { call }) {
      let response
      try {
        response = yield call(deleteRegion, {path: payload.regionId})
        if (response.code === 0) {
          message.success('交换域删除成功!')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *addRegion({ payload }, { call, put }) {
      let response
      try {
        response = yield call (addRegion, { body: payload.body })
        if (+response.code === 0) {
          message.success('新建成功')
          yield put(routerRedux.push('/infrastructure/switch'))
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
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
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
  },
}