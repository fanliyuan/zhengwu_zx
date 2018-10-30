import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { message } from 'antd'
import Cookies from 'js-cookie'
import apis from '../api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'
import { getPageQuery } from '@/utils/utils'

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
          Cookies.set('antd-pro-authority', response.result.datas.rolename)
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
          // 重定向代码
          const urlParams = new URL(window.location.href)
          const params = getPageQuery()
          let { redirect } = params
          if (redirect) {
            const redirectUrlParams = new URL(redirect)
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length)
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2)
              }
            } else {
              window.location.href = redirect
            }
          }
          if (sessionStorage.getItem('antd-pro-authority') && sessionStorage.getItem('antd-pro-authority') !== Cookies.get('antd-pro-authority')) {
            redirect = ''
          }
          if (redirect.includes('exception/500')) {
            redirect = ''
          }
          yield put(routerRedux.replace(redirect || '/'))
        }
      }
    },
    *logout(_, { put, call }) {
      try {
        sessionStorage.setItem('antd-pro-authority', Cookies.get('antd-pro-authority'))
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
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        )
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
