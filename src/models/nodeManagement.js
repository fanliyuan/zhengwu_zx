import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'

const { getNodes, getParentNodes, getDepartments, deleteNode, addNode, editNode } = apis

const arr = [
  {
    value: 1,
    chidren: [
      {
        value: 2,
        chidren: [
          {
            value: 4,
          },
        ],
      },
    ],
  },
  {
    value: 3,
  },
]

function number2String(params) {
  params.forEach((item) => {
    if ((!Array.isArray(item.chidren)) || item.chidren.length === 0) {
      item.value += ''
      console.log(item.value)// eslint-disable-line
    } else {
      number2String(item.chidren)
    }
  })
  return params
}


console.log(number2String(arr))// eslint-disable-line

 export default {
  namespace:'nodeManagement',

  state:{
    list: [],
    pagination: false,
    parentNodeList: [],
    parentNodeListT: [],
    departmentList: [],
  },

  effects:{
    *getNodes({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getNodes, {params:payload})
        const { datas, total = 0, pageSize = 10, pageNumber = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNumber} : false
        if (+response.code === 0) {
          yield put({
            type: 'changeNodeList',
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
          type: 'changeNodeList',
          payload: {
            list: [],
            pagination: false,
          },
        })
      }
    },
    *getParentNodes(_, { call, put }) {
      let response
      try {
        response = yield call(getParentNodes, {})
        if (+response.code === 0) {
          yield put({
            type: 'changeParentNodeList',
            payload: {
              parentNodeList: JSON.parse(JSON.stringify(response.result).replace(/nodeId/g, 'value').replace(/nodeName/g, 'label').replace(/childNodes/g, 'children')),
              parentNodeListT: JSON.parse(JSON.stringify(response.result).replace(/nodeId/g, 'value').replace(/nodeName/g, 'title').replace(/childNodes/g, 'children')),
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeParentNodeList',
          payload: {
            parentNodeList: [],
          },
        })
      }
    },
    *getDepartments(_, { call, put }) {
      let response
      try {
        response = yield call(getDepartments, {})
        response.result.unshift({key: -1, value: '全部机构'})
        if (+response.code === 0) {
          yield put({
            type: 'changeDepartmentList',
            payload: {
              departmentList: response.result,
            },
          })
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeDepartmentList',
          payload: {
            departmentList: [{key: -1, value: '全部机构'}],
          },
        })
      }
    },
    *deleteNode({ payload }, { call, put }) {
      let response
      try {
        response = yield call(deleteNode, {path: payload.nodeId})
        if (+response.code === 0) {
          message.success('删除成功!')
          yield put({
            type: 'getNodes',
          })
        } else {
          message.error(`删除失败,${response.msg}`)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *addNode({ payload }, { call, put }) {
      let response
      try {
        response = yield call(addNode, {body: payload.body})
        if (+response.code === 0) {
          message.success('新增成功')
          yield put(routerRedux.push('/infrastructure/node'))
        } else {
          message.error('新增失败!')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *editNode({ payload }, { call, put }) {
      let response
      try {
        response = yield call(editNode, {boyd: payload.body})
        if (+response.code === 0) {
          message.success('修改成功')
          yield put(routerRedux.push('/infrastructure/node'))
        } else {
          message.error('修改失败!')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
  },

  reducers:{
    changeNodeList(state, { payload: { list, pagination } }) {
      return {
        ...state,
        list,
        pagination,
      }
    },
    changeParentNodeList(state, { payload: { parentNodeList,parentNodeListT } }) {
      return {
        ...state,
        parentNodeList,
        parentNodeListT,
      }
    },
    changeDepartmentList(state, { payload: { departmentList } }) {
      return {
        ...state,
        departmentList,
      }
    },
  },
}