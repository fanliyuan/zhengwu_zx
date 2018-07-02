/*
 * @Author: ChouEric
 * @Date: 2018-07-02 14:26:50
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-02 18:00:23
*/
import { getNodeList, getOrganization, getState, getInfrastructureManagementNode } from '../services/api'

export default {
  namespace: 'infrastructureManagementNode',
  state: {
    list: [],
    pagination: {},
    nodeList: [],
    organizationList:[],
    stateList: [],
  },
  effects: {
    *query({ payload }, { call, put, select, take }) {
      let { nodeList, organizationList, stateList } = yield select(state => state.infrastructureManagementNode)
      if (nodeList.length === 0) {
        yield put({type: 'node'})
        yield take('node/@@end')
        nodeList = yield select(state => state.infrastructureManagementNode.nodeList)
      }
      if (organizationList.length === 0) {
        yield put({type: 'organization'})
        yield take('organization/@@end')
        organizationList = yield select(state => state.infrastructureManagementNode.organizationList)
      }
      if (stateList.length === 0) {
        yield put({type: 'state'})
        yield take('state/@@end')
        stateList = yield select(state => state.infrastructureManagementNode.stateList)
      }
      try {
        const response = yield call(getInfrastructureManagementNode, payload)
        const nodeObject = yield nodeList.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})
        const organizationObject = yield organizationList.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})
        const stateObject = yield stateList.reduce((pre, cur) => {
          pre[cur.value] = cur.label
          return pre
        }, {})

        yield response.data.list.forEach(item => {
          item.name = nodeObject[item.name]
          item.parentNode = nodeObject[item.parentNode]
          item.organization = organizationObject[item.organization]
          item.state = stateObject[item.state]
        })
        console.log(response)
        yield put({
          type: 'saveQuery',
          payload: response.data,
        })
      } catch (error) {console.log(error)} finally {}// eslint-disable-line
    },
    *node(_, { call, put }) {// eslint-disable-line
      try {
        const response = yield call(getNodeList)
        response.data.unshift({
          value: -1,
          label: '所有节点',
        })
        yield put({
          type: 'saveNodeList',
          payload: response.data,
        })
      } catch (error) {console.log(error)} finally {}// eslint-disable-line
    },
    *organization(_, { call, put }) {// eslint-disable-line
      try {
        const response = yield call(getOrganization)
        yield put({
          type: 'saveOrganizationList',
          payload: response.data,
        })
      } catch (error) {console.log(error)} finally {}// eslint-disable-line
    },
    *state(_, { call, put }) {// eslint-disable-line
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
      } catch (error) {console.log(error)} finally {}// eslint-disable-line
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
    saveQuery(state, { payload: { list, pagination } }) {
      return {
        ...state,
        list,
        pagination,
      }
    },
  },
}
