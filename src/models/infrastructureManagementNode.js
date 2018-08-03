/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:26:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-08-03 11:18:44
*/
import { message } from 'antd'

import {
  getNodeList,
  getOrganization,
  getState,
  getInfrastructureManagementNode,
  deleteInfrastructureManagementNode,
  deleteInfrastructureManagementNodeSome,
} from '../api/test'

export default {
  namespace: 'infrastructureManagementNode',
  state: {
    list: [],
    pagination: {},
    nodeList: [],
    organizationList: [],
    stateList: [],
  },
  effects: {
    *query({ payload }, { call, put, select, take }) {
      let { nodeList, organizationList, stateList } = yield select(
        state => state.infrastructureManagementNode
      )
      if (nodeList.length === 0) {
        yield put({ type: 'node' })
        yield take('node/@@end')
        nodeList = yield select(state => state.infrastructureManagementNode.nodeList)
      }
      if (organizationList.length === 0) {
        yield put({ type: 'organization' })
        yield take('organization/@@end')
        organizationList = yield select(
          state => state.infrastructureManagementNode.organizationList
        )
      }
      if (stateList.length === 0) {
        yield put({ type: 'state' })
        yield take('state/@@end')
        stateList = yield select(state => state.infrastructureManagementNode.stateList)
      }
      try {
        const response = yield call(getInfrastructureManagementNode, payload)
        let nodeArr = []
        nodeList.forEach(item => {
          if (Array.isArray(item.children)) {
            nodeArr = [...nodeArr, ...item.children]
          }
        })
        const nodeObject = nodeArr.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})
        let organizationArr = []
        organizationList.forEach(item => {
          if (Array.isArray(item.children)) {
            organizationArr = [...organizationArr, ...item.children]
          }
        })
        const organizationObject = organizationArr.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})
        const stateObject = stateList.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})
        response.data.list.forEach(item => {
          item.parentNode = nodeObject[item.parentNode]
          item.organization = organizationObject[item.organization]
          item.state = stateObject[item.state]
        })
        yield put({
          type: 'saveQuery',
          payload: response.data,
        })
      } catch (error) {
        console.log(error) // eslint-disable-line
      } finally {
        // eslint-disable-line
      } // eslint-disable-line
    },
    *node(_, { call, put }) {
      // eslint-disable-line
      try {
        const response = yield call(getNodeList)
        yield put({
          type: 'saveNodeList',
          payload: response.data,
        })
      } catch (error) {
        console.log(error) // eslint-disable-line
      } finally {
        // eslint-disable-line
      } // eslint-disable-line
    },
    *organization(_, { call, put }) {
      // eslint-disable-line
      try {
        const response = yield call(getOrganization)
        yield put({
          type: 'saveOrganizationList',
          payload: response.data,
        })
      } catch (error) {
        console.log(error) // eslint-disable-line
      } finally {
        // eslint-disable-line
      } // eslint-disable-line
    },
    *state(_, { call, put }) {
      // eslint-disable-line
      try {
        const response = yield call(getState)
        response.data.unshift({
          value: -1,
          label: '所有状态',
        })
        yield put({
          type: 'saveStateList',
          payload: response.data,
        })
      } catch (error) {
        console.log(error) // eslint-disable-line
      } finally {
        // eslint-disable-line
      } // eslint-disable-line
    },
    *delete(
      {
        payload: { row },
      },
      { call }
    ) {
      // 这里可以调用删除接口
      yield call(deleteInfrastructureManagementNode, row)
      yield message.success(`成功删除${row.id}`)
    },
    *deleteSome(
      {
        payload: { ids },
      },
      { call }
    ) {
      yield call(deleteInfrastructureManagementNodeSome, ids)
      yield message.success('删除成功')
    },
  },
  reducers: {
    saveNodeList(state, { payload }) {
      return {
        ...state,
        nodeList: payload,
      }
    },
    saveOrganizationList(state, { payload }) {
      return {
        ...state,
        organizationList: payload,
      }
    },
    saveStateList(state, { payload }) {
      return {
        ...state,
        stateList: payload,
      }
    },
    saveQuery(
      state,
      {
        payload: { list, pagination },
      }
    ) {
      return {
        ...state,
        list,
        pagination,
      }
    },
  },
}
