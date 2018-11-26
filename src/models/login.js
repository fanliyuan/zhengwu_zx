import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { message } from 'antd'
import Cookies from 'js-cookie'
import apis from '../api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'
import { getPageQuery } from '@/utils/utils'
// import { getRoutes } from '@/api/test'

const { accountLogin, accountLogout } = apis

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
        // 登录状态码判断
        if (+response.code !== 200) {
          message.error(response.msg)
          return null
        }
        // accountToken 重新赋值为 accessToken
        const { accountId, accountToken: accessToken, accountName, roleName } = response.data
        if (+response.code === 200 && roleName) {
          // localStorage.setItem('accessToken', accessToken)
          document.cookie = `accessToken=${accessToken};path=/`
          localStorage.setItem('accountId', accountId)
          localStorage.setItem('accountName', accountName)
          // 设置
          Cookies.set('antd-pro-authority', roleName)
          yield put({
            type: 'changeLoginStatus',
            payload: { 
              currentAuthority: roleName,
            },
          })
          reloadAuthorized()
          // 从后端获取路由信息
          // const {routes} = yield call(getRoutes)
          // sessionStorage.setItem('routes', routes)
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
          if (redirect && redirect.includes('exception/500')) {
            redirect = ''
          }
          yield put(routerRedux.replace(redirect || '/'))
        } else if (!roleName) {
          message.error('暂无权限登录系统!')
        }
      } catch (error) {
        console.log(error) // eslint-disable-line
      } // eslint-disable-line
    },
    *logout(_, { put, call }) {
      try {
        yield call(accountLogout, {body: { accountId: localStorage.getItem('accountId'), accessToken: Cookies.get('accessToken')}})
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
