import { message } from 'antd'
import apis from '../api'

const { getCatalogList, getCatalog } = apis
 export default {
  namespace: 'catalogManagement',

  state:{
    catalogTreeList: [],
    catalogData: [],
    pagination: {},
  },

  effects:{
    *getCatalogList(_, { call, put }) {
      let response
      try {
        response = yield call(getCatalogList, {})
        // const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        // const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          response.data = JSON.parse(JSON.stringify(response.data).replace(/"typeName"/g, '"title"').replace(/"id"/g,'"key"').replace(/"children":\[\],/g,''))
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
      }
      }
    },
    *getCatalog({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getCatalog, {params: payload.params})
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          yield put({
            type: 'saveCatalogData',
            payload: {
              datas,
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
  },
}