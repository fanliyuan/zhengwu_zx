import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'

const { getNodes, getParentNodes, getDepartments, deleteNode, addNode, editNode } = apis

function number2String(array, field) {
  return array.map((item) => {
    if ((!Array.isArray(item.children)) || item.children.length === 0) {
      return {...item, [field]: `${item[field]}`}
    } else {
      return {...item, [field]: `${item[field]}`, children: number2String(item.children)}
    }
  })
}

 export default {
  namespace:'nodeManagement',

  state:{
    list: [],
    pagination: false,
    parentNodeList: [],
    parentNodeListT: [],
    departmentListT: [],
    departmentList: [],
  },

  effects:{
    *getNodes({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getNodes, {body:payload})
        const { list, total = 0, pageSize = 10, pageNum = 1 } = response.data
        const pagination = {total, pageSize, current: pageNum}
        if (+response.code === 200) {
          yield put({
            type: 'changeNodeList',
            payload: {
              list,
              pagination,
            },
          })
        } else {
          message.error(response.msg)
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
        if (response.code === '604') {
          yield put({
            type: 'changeParentNodeList',
            payload: {
              parentNodeList: JSON.parse(JSON.stringify(response.data).replace(/nodeId/g, 'value').replace(/nodeName/g, 'label').replace(/childNodes/g, 'children')),
              parentNodeListT: number2String(JSON.parse(JSON.stringify(response.data).replace(/nodeId/g, 'value').replace(/nodeName/g, 'title').replace(/childNodes/g, 'children')), 'value'),
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
            parentNodeListT: [],
          },
        })
      }
    },
    *getDepartments(_, { call, put }) {
      let response
      try {
        response = yield call(getDepartments, {})
        // response.data.list.unshift({key: '全部机构', value: '全部机构'})
        if (+response.code === 200) {
          yield put({
            type: 'changeDepartmentList',
            payload: {
              departmentList: number2String(JSON.parse(JSON.stringify(response.data.list).replace(/title/g, 'label')), 'value'),
              departmentListT: number2String(response.data.list, 'value'),
            },
          }) 
        } else {
          message.error(response.msg)
          throw new Error('非200')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'changeDepartmentList',
          payload: {
            departmentListT: [],
          },
        })
      }
    },
    *deleteNode({ payload }, { call, put }) {
      let response
      try {
        response = yield call(deleteNode, {params: payload.item})
        if (+response.code === 200) {
          message.success('删除成功!')
          yield put({
            type: 'getNodes',
            payload: payload.params,
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
        if (+response.code === 200) {
          message.success('新增成功')
          yield put(routerRedux.push('/infrastructure/node'))
        } else {
          message.error(`新增失败, ${response.msg}`)
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    *editNode({ payload }, { call, put }) {
      let response
      try {
        // console.log(payload)
        response = yield call(editNode, {body: payload.body})
        if (+response.code === 200) {
          message.success('修改成功')
          yield put(routerRedux.push('/infrastructure/node'))
        } else {
          message.error(`修改失败, ${response.msg}`)
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
    changeDepartmentList(state, { payload: { departmentListT, departmentList } }) {
      return {
        ...state,
        departmentListT,
        departmentList,
      }
    },
  },
}