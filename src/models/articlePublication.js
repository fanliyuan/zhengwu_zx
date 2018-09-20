import { message } from 'antd'
import apis from '../api'
import { number2String } from '../utils/utils'

const { getArticleReleased, getArticleNoRelease, columnList, cancleArticleReleased, changeAricleState, categoryList } = apis

export default {
  namespace: 'articlePublication',

  state: {
    queryData: {},
    queryData2: {},
    pagination: false,
    releasedList: [],
    noReleaseList: [],
    column: [],
    secondCategoryList: [],
    columnObejct: {},
    category: [],
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
        let index = (pageNum-1)*pageSize
        datas.forEach(item => {
          index++
          item.index = index
        })
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
    *getArticleNoRelease({ payload }, { call, put, select }) {
      let response
      try {
        if (payload.body) {
          yield put({
            type: 'saveQueryData2',
            payload: {
              queryData2: payload.body,
            },
          })
        } else {
          payload.body = yield select(state => state.articlePublication.queryData2)
        }
        response = yield call(getArticleNoRelease, {body: payload.body})
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > 10 ? {total, pageSize, current: pageNum} : false
        let index = (pageNum-1)*pageSize
        datas.forEach(item => {
          index++
          item.index = index
        })
        if (+response.code === 0) {
          yield put({
            type: 'saveNoReleaseList',
            payload: {
              noReleaseList: datas,
              pagination,
            },
          })
        } else {
          throw new Error('返回结果非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveNoReleaseList',
          payload: {
            noReleaseList: [],
            pagination: false,
          },
        })
      }
    },
    *getColumnList(_, { call, put, select }) {
      let response
      try {
        let column = yield select(state => state.articlePublication.column)
        // if (column.length !== 0) {
        if (0 in column) { // 判断数组是否为空数组
          return null
        } else {
          response = yield call(columnList, {body: {pageSize: 0, pageNum: 0}})
          if (+response.code === 0) {
            column = number2String(JSON.parse(JSON.stringify(response.result.datas.filter(item => item.columnPage !== '资源目录')).replace(/columnId/g, 'value').replace(/columnPage/g, 'label')))
            const secondCategoryList = column.reduce((pre, cur) => {
              if (cur.children.length > 0) {
                pre = [...pre, ...cur.children]
              }
              return pre
            },[])
            const columnObejct = column.reduce((pre,cur) => {
              pre[cur.value] = cur.children
              return pre
            },{})
            yield put({
              type: 'saveColumn',
              payload: {
                column,
                secondCategoryList,
                columnObejct,
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
          secondCategoryList: [],
          columnObejct:{},
        },
      })
      }
    },
    *getCategoryList({ payload }, { call, put }) {
      let response
      try {
        response = yield call(categoryList, {body: payload.body})
        response.result.datas.unshift({
          categoryId: '全部分类',
          categoryName: '全部分类',
        })
        if (+response.code === 0) {
          yield put({
            type: 'saveCategory',
            payload: {
              category: response.result.datas,
            },
          })
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveCategory',
          payload: {
            category: [],
          },
        })
      }
    },
    *changeAricleState({ payload }, { call, put }) {
      let response
      try {
        response = yield call(changeAricleState, {body: payload.body})
        if (+response.code === 0) {
          message.success('发布成功!')
          if (!payload.body.articleOpenState) {
            yield put({
              type: 'getArticleReleased',
              payload: {},
            })
          } else {
            yield put({
              type: 'getArticleNoRelease',
              payload: {},
            })
          }
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        message.error('发布失败!')
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
    saveQueryData2(state, { payload: { queryData2 } }) {
      return {
        ...state,
        queryData2,
      }
    },
    saveReleasedList(state, { payload: { releasedList, pagination } }) {
      return {
        ...state,
        releasedList,
        pagination,
      }
    },
    saveNoReleaseList(state, { payload: { noReleaseList, pagination } }) {
      return {
        ...state,
        noReleaseList,
        pagination,
      }
    },
    saveColumn(state, { payload: {column,secondCategoryList,columnObejct} }) {
      return {
        ...state,
        column,
        secondCategoryList,
        columnObejct,
      }
    },
    saveCategory(state, { payload: {category} }) {
      return {
        ...state,
        category,
      }
    },
  },
}