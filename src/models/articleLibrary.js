import { message } from 'antd'
import { routerRedux } from 'dva/router'
import apis from '../api'

const { getArticles, categoryList, deleteArticle, insertArticle, getArticleInfo, updateArticle } = apis
 export default {
  namespace:'articleLibrary',

  state:{
    queryData: {},
    pagination: false,
    articleList: [],
    categoryList: [],
    articleInfo: {},
  },

  effects:{
    *getArticles({ payload }, { call, put, select }) {
      let response
      if (payload) {
        yield put({
          type: 'saveQueryData',
          payload,
        })
      } else {
        payload = yield select(state => state.articleLibrary.queryData)
      }
      try {
        response = yield call(getArticles, {body: payload.body})
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        // 列表顺序索引处理
        let index = pageSize * (pageNum-1)
        datas.forEach(item => {
          index++
          item.index = index
        })
        if (+response.code === 0) {
          yield put({
            type: 'saveArticles',
            payload: {
              articleList:datas,
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
          type: 'saveArticles',
          payload: {
            articleList:[],
            pagination: false,
          },
        })
      }
    },
    *getCategories(_, { call, put, select }) {
      let response
      try {
        response = yield call(categoryList, {body: {pageNum: 0, pageSize: 0}})
        if (+response.code === 0) {
          response.result.datas.unshift({categoryId: '全部分类', categoryName: '全部分类'})
          yield put({
            type: 'saveCategory',
            payload: response.result.datas,
          })
        } else {
          throw new Error('结果非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        const payload = select(state => state.articleLibrary.categoryList)
        yield put({
          type: 'saveCategory',
          payload,
        })
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      let response
      try {
        response = yield call(deleteArticle, {params: payload.params})
        if (+response.code === 0) {
          message.success('删除成功')
          yield put({
            type: 'getArticles',
          })
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        message.error('删除失败')
      }
    },
    *insertArticle({ payload }, { call, put }) {
      let response
      try {
        response = yield call(insertArticle, { body: payload.body })
        if (+response.code === 0) {
          message.success('新增成功')
          yield put(
            routerRedux.push('/portalManagement/newsLibrary')
          )
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
       // eslint-disable-next-line 
       console.log(error)
       message.error('新增失败')
      }
    },
    *getArticleInfo({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getArticleInfo, {params: payload.params})
        if (+response.code === 0) {
          yield put({
            type: 'saveArticleInfo',
            payload: response.result.data,
          })
        } else {
          throw new Error('返回结果非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveArticleInfo',
          payload: {},
        })
      }
    },
    *updateArticle({ payload }, { call, put }) {
      let response
      try {
        response = yield call(updateArticle, {body: payload.body})
        if (+response.code === 0) {
          message.success('修改成功')
          yield put(
            routerRedux.push('/portalManagement/newsLibrary')
          )
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        message.error('修改失败')
      }
    },
  },

  reducers:{
    saveArticles(state, {payload: {articleList, pagination}}) {
      return {
        ...state,
        articleList,
        pagination,
      }
    },
    saveQueryData(state, { payload: queryData }) {
      return {
        ...state,
        queryData,
      }
    },
    saveCategory(state, { payload }) {
      return {
        ...state,
        categoryList: payload,
      }
    },
    saveArticleInfo(state, { payload }) {
      return {
        ...state,
        articleInfo: payload,
      }
    },
  },
}