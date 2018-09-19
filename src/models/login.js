import { routerRedux } from 'dva/router'
import { message } from 'antd'
import apis from '../api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

const { accountLogin, getRoleName, accountLogout, insertLogging, getAccountDetailByAccountName } = apis

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
        if (response.code >=11030104 && response.code <=11030105) {
          message.error('用户名或密码错误!')
          yield call(insertLogging, {body: {
            createUser: payload.accountName,
            createTime: Date.now(),
            realUser: '佚名',
            logState: 0,
            logType: 3,
          }})
          return null
        }
        if (response.code === 11030201) {
          message.error('账号已停用')
          yield call(insertLogging, {body: {
            createUser: payload.accountName,
            createTime: Date.now(),
            realUser: '佚名',
            logState: 0,
            logType: 3,
          }})
          return null
        }
        const { accountId, accessToken, accountName, tenantId } = response.result.datas
        if (response.code === 0) {
          // localStorage.setItem('accessToken', accessToken)
          document.cookie = `accessToken=${accessToken};path=/`
          localStorage.setItem('accountId', accountId)
          localStorage.setItem('accountName', accountName)
          localStorage.setItem('tenantId', tenantId)
        }
        // Login successfully
        yield put({
          type: 'token',
          payload: {
            filter: accountId,
          },
        })
        let realUser
        try {
          const res = yield call(getAccountDetailByAccountName, {params: { accountName: payload.accountName }})
          realUser = JSON.parse(res.result.datas[0].extendedProperties).name
        } catch (error) {
         // eslint-disable-next-line 
         console.log(error)
         realUser = '佚名'
        }
        yield call(insertLogging, {body: {
          createUser: payload.accountName,
          createTime: Date.now(),
          realUser,
          logState: 1,
          logType: 3,
        }})
      } catch (error) {
        message.error('登录失败')
        yield call(insertLogging, {body: {
          createUser: payload.accountName,
          createTime: Date.now(),
          realUser: '佚名',
          logState: 0,
          logType: 3,
        }})
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
        message.error('登录失败')
        console.log('验证token出错')// eslint-disable-line
        currentAuthority = 'guest'
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority },
        })
        reloadAuthorized()
        if (response && response.code === 0) {
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
        // const urlParams = new URL(window.location.href)
        const pathname = yield select(state => state.routing.location.pathname)
        // add the parameters in the url
        // urlParams.searchParams.set('redirect', pathname)
        // window.history.replaceState(null, 'login', urlParams.href)
        sessionStorage.setItem('redirect', pathname)
        sessionStorage.setItem('authority', localStorage.getItem('antd-pro-authority'))
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        })
        localStorage.removeItem('accessToken')
        document.cookie = `accessToken=;path=/;expires=-1`
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
