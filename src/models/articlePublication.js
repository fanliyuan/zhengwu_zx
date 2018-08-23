import { message } from 'antd'
import apis from '../api'
import { number2String } from '../utils/utils'

const { getArticleReleased, getArticleNoRelease, columnList, cancleArticleReleased } = apis // eslint-disable-line

export default {
  namespace: 'articlePublication',

  state: {
    queryData: {},
    pagination: false,
    releasedList: [],
    noReleaseList: [],
    column: [],
  },

  effects: {
    *getArticleReleased({ payload }, { call, put, select }) {
      let response
      try {
        if (payload && payload.body) {
          yield put({
            type: 'saveQueryData',
            payload: {
              queryData: payload.body,
            },
          })
        } else {
          payload.body = yield select(state => state.articlePublication.queryData)
        }
        response = yield call(getArticleReleased, { body: payload.body })
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          yield put({
            type: 'saveReleasedList',
            payload: {
              releasedList: datas,
              pagination,
            },
          })
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveReleasedList',
          payload: {
            releasedList: [],
            pagination: false,
          },
        })
      }
    },
    *getColumnList(_, { call, put, select }) {
      let response
      try {
        const column = yield select(state => state.articlePublication.column)
        if (column.length !== 0) {
          return null
        } else {
          response = yield call(columnList, {body: {pageSize: 0, pageNum: 0}})
          if (+response.code === 0) {
            yield put({
              type: 'saveColumn',
              payload: {
                column: number2String(JSON.parse(JSON.stringify(response.result.datas).replace(/columnId/g, 'value').replace(/columnPage/g, 'label'))),
              },
            })
          } else{
            throw new Error('返回非0')
          }
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
       yield put({
        type: 'saveColumn',
        payload: {
          column: [],
        },
      })
      }
    },
    *cancleArticleReleased({ payload }, { call, put }) {
      const res = yield call(cancleArticleReleased, { params: payload.params })
      if (+res.code === 0) {
        message.success('取消成功!')
        yield put({
          type: 'getArticleReleased',
          payload: {},
        })
      } else {
        message.error('取消失败!')
      }
    },
  },

  reducers: {
    saveQueryData(state, { payload: { queryData } }) {
      return {
        ...state,
        queryData,
      }
    },
    saveReleasedList(state, { payload: { releasedList, pagination } }) {
      return {
        ...state,
        releasedList,
        pagination,
      }
    },
    saveColumn(state, { payload: {column} }) {
      return {
        ...state,
        column,
      }
    },
  },
}