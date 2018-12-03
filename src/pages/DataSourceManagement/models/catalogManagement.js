import { message } from 'antd'
import apis from '../../../api'

const { getCatalog, getResourceItemList, getResourceTaskInfo, getResourceTitle, directoryListAll } = apis

// 用来过滤树形数据的
function filter(params, data) {
  const temp = JSON.parse(JSON.stringify(data))
  return temp.filter(item => {// eslint-disable-line
    if (item.name.includes(params)) {
      return item
    } else {
      if (item.children && item.children.length !== 0) { // eslint-disable-line
        if (filter(params, item.children).length !== 0) {
          item.children = filter(params, item.children)
          item.flag = true
          return item
        }
      }
    }
  })
}
function filterTreeList(params, data) {
  let temp = []
  filter(params, data).forEach(item => {
    if (!item.flag) {
      temp = [...temp, item]
    } else {
      temp = [...temp, ...item.children]
    }
  })
  return temp
}

 export default {
  namespace: 'catalogManagement',

  state:{
    catalogTreeList: [],
    catalogList: [],
    catalogData: [],
    pagination: false,
    queryData: {},
    catalogInfo: [],
    resourceTitle: {},
    pagination1: false,
    resourceTaskInfo: {},
    catalogQueryData: '',
    srcProsTree: [],
  },

  effects:{
    *getCatalogList(_, { call, put }) {
      let response
      try {
        response = yield call(directoryListAll, {})
        if (+response.code === 0) {
          yield put({
            type: 'savaCatalogTreeList',
            payload: response.data,
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
       // eslint-disable-next-line
       console.log(error)
      } else {
        message.error(error || '操作失败')
        yield put({
          type: 'savaCatalogTreeList',
          payload: [],
        })
        yield put({
          type: 'savaCatalogList',
          payload: {
            catalogList: [],
          },
        })
      }
      }
    },
    *getCatalog({ payload }, { call, put, select }) {
      let response
      if (payload && payload.body) {
        yield put({
          type: 'saveQueryData',
          payload: {
            queryData: payload,
          },
        })
      } else {
        payload = yield select(state => state.catalogManagement.queryData)
      }
      if (!payload || !payload.body) {
        // console.log('无查询信息') // eslint-disable-line
        return null
      }
      try {
        response = yield call(getCatalog, {body: payload.body})
        const { data, total = 0} = response
        const pagination = {total}
        if (+response.code === 0) {
          yield put({
            type: 'saveCatalogData',
            payload: {
              catalogData: data,
              pagination,
            },
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
       // eslint-disable-next-line
       console.log(error)
      } else {
        message.error(error || '操作失败')
      }
      }
    },
    *queryCatalog({ payload }, { select, put }) {
      const catalogTreeList = yield select(state => state.catalogManagement.catalogTreeList)
      const catalogList = filterTreeList(payload, catalogTreeList)
      yield put({
        type: 'savaCatalogList',
        payload: {
          catalogList,
        },
      })
      yield put({
        type: 'saveCatalogQueryData',
        payload: {
          catalogQueryData: payload,
        },
      })
    },
    *getCatalogInfo({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getResourceItemList, {params: payload.params})
        const { data, total = 0, size = 10, page = 1 } = response
        const pagination1 = total > size ? {total, pageSize: size, current: page} : false
        if (+response.code === 0) {
          yield put({
            type: 'savaCatalogInfo',
            payload: {
              catalogInfo: data,
              pagination1,
            },
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
       // eslint-disable-next-line
       console.log(error)
      } else {
        message.error(error || '操作失败')
      }
      }
    },
    *getResourceTitle({ payload }, { call, put }) {
      const response = yield call(getResourceTitle, { params: payload.params })
      if (typeof response.data === 'string') {
        response.data = JSON.parse(response.data.replace(/"\{/g,'{').replace(/\}"/g,'}'))
      }
      try {
        if (+response.code === 0) {
          yield put({
            type: 'saveResourceTitle',
            payload: {
              resourceTitle: response.data,
            },
          })
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
      }
    },
    *getResourceTaskInfo({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getResourceTaskInfo, {params: payload.params})
        const { data } = response
        if (+response.code === 200) {
          yield put({
            type: 'savaResourceTaskInfo',
            payload: {
              resourceTaskInfo: data || {},
            },
          })
        } else {
          throw response.msg
        }
      } catch (error) {
        if (error instanceof Error) {
       // eslint-disable-next-line
       console.log(error)
      } else {
        message.error(error || '操作失败')
        yield put({
          type: 'savaResourceTaskInfo',
          payload: {
            resourceTaskInfo: {},
          },
        })
      }
      }
    },
    *directoryListAll(_, { call, put }) {
      let srcProsTree = []
      try {
        const res = yield call(directoryListAll)
        if (+res.code === 0) {
          srcProsTree = res.data
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
      } finally {
        yield put({
          type: 'saveSrcProsTree',
          payload: {
            srcProsTree,
          },
        })
      }
    },
  },

  reducers:{
    savaCatalogTreeList(state, { payload }) {
      return {
        ...state,
        catalogTreeList: payload,
      }
    },
    saveCatalogData(state, {payload: { catalogData, pagination }}) {
      return {
        ...state,
        catalogData,
        pagination,
      }
    },
    savaCatalogList(state, {payload: {catalogList}}) {
      return {
        ...state,
        catalogList,
      }
    },
    savaCatalogInfo(state, {payload: {catalogInfo, pagination1}}) {
      return {
        ...state,
        catalogInfo,
        pagination1,
      }
    },
    savaResourceTaskInfo(state, {payload: {resourceTaskInfo}}) {
      return {
        ...state,
        resourceTaskInfo,
      }
    },
    saveQueryData(state, {payload: {queryData}}) {
      return {
        ...state,
        queryData,
      }
    },
    saveResourceTitle(state, {payload: {resourceTitle}}) {
      return {
        ...state,
        resourceTitle,
      }
    },
    saveCatalogQueryData(state,{payload: {catalogQueryData}}) {
      return {
        ...state,
        catalogQueryData,
      }
    },
    saveSrcProsTree(state, {payload:{srcProsTree}}) {
      return {
        ...state,
        srcProsTree,
      }
    },
  },
}