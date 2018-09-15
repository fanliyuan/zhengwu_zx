import React from 'react'
import { routerRedux, Route, Switch } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import { getRouterData } from './common/router'
import Authorized from './utils/Authorized'
import styles from './index.less'

const { ConnectedRouter } = routerRedux
const { AuthorizedRoute } = Authorized
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />
})

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const UserLayout = routerData['/user'].component
  const BasicLayout = routerData['/'].component
  // 这里用的sessionStorage,应该用models
  // let redirect
  // if (window.location.search) {
  //   redirect = window.location.search.substring(10)
  //   sessionStorage.setItem('redirect', redirect)
  // }
  const urlParams = new URL(window.location.href)
  const redirect = urlParams.searchParams.get('redirect')
  if (redirect && redirect !== '/user/login') {
    sessionStorage.setItem('redirect', redirect)
  }
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={[
              'admin',
              'security',
              'auditor',
              'operator',
              'admin-n',
              'security-n',
              'auditor-n',
              'assessor-n',
              'operator-n',
            ]}
            redirectPath="/user/login"
            />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  )
}

export default RouterConfig
