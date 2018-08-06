import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

const { accountLogin, getRoleName, accountLogout } = apis

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
        }
      } catch (error) {
        message.error('登录失败')
      } // eslint-disable-line
    },
    *token({ payload }, { call, put }) {
      let currentAuthority = 'guest'
      let response
      try {
        response = yield call(getRoleName, {params: payload, path: 2})
        currentAuthority = response.result.datas[0].rolename
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
        reloadAuthorized()
        if (response.code === 0) {
          if (sessionStorage.getItem('rootRedirect')) {
            yield put(routerRedux.push(sessionStorage.getItem('rootRedirect')))
            yield sessionStorage.clear()
          } else {
            yield put(routerRedux.push('/'))
          }
        }
      }
    },
    *logout(_, { put, select, call }) {
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
        localStorage.removeItem('accessToken')
        localStorage.removeItem('accountId')
        localStorage.removeItem('accountName')
        reloadAuthorized()
        yield put(routerRedux.push('/user/login'))
        yield call(accountLogout)
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
