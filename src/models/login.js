import { routerRedux } from 'dva/router'
import { message } from 'antd'
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
      let response
      try {
        response = yield call(accountLogin, {body: payload})
        const { accountId, accessToken, accountName } = response.result.datas
        // Login successfully
        yield put({
          type: 'token',
          payload: {
            filter: accountId,
          },
        })
        if (response.code === 0) {
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('accountId', accountId)
          localStorage.setItem('accountName', accountName)
          reloadAuthorized()
          if (sessionStorage.getItem('rootRedirect')) {
            yield put(routerRedux.push(sessionStorage.getItem('rootRedirect')))
            yield sessionStorage.clear()
          } else {
            yield put(routerRedux.push('/'))
          }
        }
      } catch (error) {
        message.error(response.msg)
      } // eslint-disable-line
    },
    *token({ payload }, { call, put }) {
      let currentAuthority = 'guest'
      try {
        const response = yield call(getRoleName, {body: payload})
        currentAuthority = response.result.datas.rolename
        if (response.code === 0) {
          localStorage.setItem('antd-pro-authority', response.result.datas.rolename)
        }
      } catch (error) {
        console.log('验证token出错')// eslint-disable-line
        currentAuthority = 'guest'
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority },
        })
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
        setAuthority(payload.currentAuthority)
        return {
          ...state,
          status: payload.status,
          type: payload.type || 'account',
        }
      } catch (error) {
        console.log('登录之后检测role,返回结果接口不一致') // eslint-disable-line
        setAuthority('guest')
        return {
          ...state,
          status: 'ok',
          type: 'account',
        }
      }
    },
  },
}
