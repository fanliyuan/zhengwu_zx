import { routerRedux } from 'dva/router'
import apis from '../api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

const { accountLogin, getRoleName } = apis

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentAuthority: 'guest',
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(accountLogin, {body: payload})
        // Login successfully
        yield put({
          type: 'token',
          payload: {
            filter: response.result.datas.accountId,
          },
        })
        if (response.code === 0) {
          localStorage.setItem('accessToken', response.result.datas.accessToken)
          localStorage.setItem('accountId', response.result.datas.accountId)
          localStorage.setItem('accountName', response.result.datas.accountName)
          reloadAuthorized()
          if (sessionStorage.getItem('rootRedirect')) {
            yield put(routerRedux.push(sessionStorage.getItem('rootRedirect')))
            yield sessionStorage.clear()
          } else {
            yield put(routerRedux.push('/'))
          }
        }
      } catch (error) {console.log('登录失败,有报错')} // eslint-disable-line
    },
    *token({ payload }, { call, put }) {
      const response = yield call(getRoleName, {body: payload})
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      })
      if (response.code === 0) {
        localStorage.setItem('antd-pro-authority', response.result.datas.rolename)
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href)
        const pathname = yield select(state => state.routing.location.pathname)
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname)
        window.history.replaceState(null, 'login', urlParams.href)
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        })
        reloadAuthorized()
        yield put(routerRedux.push('/user/login'))
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      try {
        setAuthority(payload.result.datas.roleName)
        return {
          ...state,
          status: payload.status || 'ok',
          type: payload.type || 'guest',
        }
      } catch (error) {console.log('登录之后检测role,返回结果接口不一致')} // eslint-disable-line
    },
  },
}
