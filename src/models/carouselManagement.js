import { message } from 'antd'
// import { routerRedux } from 'dva/router'

import apis from '../api'

const { getCarousels, insertCarousel, updateCarouse, deleteCarousel, toggleCarousel, getCarousel } = apis // eslint-disable-line
 export default {
  namespace:'carouselManagement',

  state:{
    queryData: {},
    carouselList: [],
    pagination: false,
    carouselData: null,
  },

  effects:{
    *getCarousels({ payload }, { call, put, select }) {
      if (payload && payload.body) {
        yield put({
          type: 'saveQueryData',
          payload: {
            body: payload.body,
          },
        })
      } else {
        payload = select(state => state.carouselManagement.queryData)
      }
      let response
      try {
        response = yield call(getCarousels, {body: payload.body})
        const { datas, total = 0, pageSize = 10, pageNum = 1 } = response.result
        const pagination = total > pageSize ? {total, pageSize, current: pageNum} : false
        if (+response.code === 0) {
          yield put({
            type: 'saveCarouselList',
            payload: {
              carouselList: datas,
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
          type: 'saveCarouselList',
          payload: {
            carouselList: [],
            pagination: false,
          },
        })
      }
    },
    *toggleCarousel({ payload }, { call, put }) {
      let response
      try {
        response = yield call(toggleCarousel, {params: payload.params})
        if (+response.code === 0) {
          message.success('停用成功')
          yield put({
            type: 'getCarousels',
            payload: {},
          })
        } else {
          message.error('停用失败')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        message.error('停用失败')
      }
    },
    *getCarousel({ payload }, { call, put }) {
      let response
      try {
        response = yield call(getCarousel, {params: payload.params})
        if (+response.code === 0) {
          yield put({
            type: 'saveCarouselData',
            payload: {
              carouselData: response.result.data,
            },
          })
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        yield put({
          type: 'saveCarouselData',
          payload: {
            carouselData: null,
          },
        })
      }
    },
    *insertCarousel({ payload }, { call, put }) {
      let response
      try {
        response = yield call(insertCarousel, {body: payload.body})
        if (+response.code === 0) {
          message.success('新增成功!')
          yield put({
            type: 'getCarousels',
            payload: {},
          })
        } else {
          throw new Error('返回非0')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        message.error('新增失败!')
      }
    },
  },

  reducers:{
    saveQueryData(state, { payload: { body } }) {
      return {
        ...state,
        queryData: body,
      }
    },
    saveCarouselList(state, { payload: { carouselList, pagination } }) {
      return {
        ...state,
        carouselList,
        pagination,
      }
    },
    saveCarouselData(state, { payload: { carouselData } }) {
      return {
        ...state,
        carouselData,
      }
    },
  },
}