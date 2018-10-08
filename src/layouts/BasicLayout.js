/*
 * @Author: ChouEric
 * @Date: 2018-07-19 15:37:20
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-10-08 11:59:41
 * @Description: 删除底部蚂蚁金服相关信息
 * @important: 感觉权限应该从这里入手,在这里获取到登录后的路由信息,然后在这里生成routerData,来自memu和router两个数据
 *   不需要权限authority,直接根据后台的数据生成路由信息.要求在登录成功后就返回router和token等信息;
 *                      
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, message } from 'antd'
import DocumentTitle from 'react-document-title'
import { connect } from 'dva'
import { Route, Redirect, Switch, routerRedux } from 'dva/router'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import pathToRegexp from 'path-to-regexp'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import Cookies from 'js-cookie'
import GlobalHeader from '../components/GlobalHeader'
import GlobalFooter from '../components/GlobalFooter'
import SiderMenu from '../components/SiderMenu'
import NotFound from '../routes/Exception/404'
import { getRoutes } from '../utils/utils'
import Authorized from '../utils/Authorized'
import { getMenuData } from '../common/menu'
import logo from '../assets/logo.png'

const { Content, Header, Footer } = Layout
const { AuthorizedRoute, check } = Authorized

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = []
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      let overview
      if (['admin', 'operator', 'security', 'auditor'].includes(Cookies.set('antd-pro-authority'))) {
        overview = '/overview/platformOverview'
      } else {
        overview = '/overview/nodeOverview'
      }
      redirectData.push({
        from: `${item.path}`,
        to: item.path === '/overview' ? overview : `${item.children[0].path}`,
      })
      item.children.forEach(children => {
        getRedirect(children)
      })
    }
  }
}
getMenuData().forEach(getRedirect)

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {}
  const childResult = {}
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData))
    }
  }
  return Object.assign({}, routerData, result, childResult)
}

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}

let isMobile
enquireScreen(b => {
  isMobile = b
})



const platforms = ['admin', 'security', 'auditor', 'operator']
const nodes = ['admin-n', 'security-n', 'auditor-n', 'operator-n', 'assessor-n']

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }

  state = {
    isMobile,
  }

  getChildContext() {
    const { location, routerData } = this.props
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
    }
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      })
    })
    const { dispatch } = this.props
    dispatch({
      type: 'user/fetchCurrent',
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  getPageTitle() {
    const { routerData, location } = this.props
    const { pathname } = location
    let title = '政务数据交换平台'
    let currRouterData = null
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key]
      }
    })
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - 政务数据交换平台`
    }
    return title
  }

  getBaseRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href)
    // 这里用的sessionStorage,应该用models
    const redirect = urlParams.searchParams.get('redirect')
    sessionStorage.clear()
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect')
      window.history.replaceState(null, 'redirect', urlParams.href)
      console.log('重定向到'+redirect)// eslint-disable-line
    } else {
      const { routerData, location: { pathname } } = this.props
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      )
      if (pathname === '/') {
        if (platforms.indexOf(Cookies.set('antd-pro-authority')) > -1) {
          return '/overview/platformOverview'
        } else if (nodes.indexOf(Cookies.set('antd-pro-authority')) > -1) {
          return '/overview/nodeOverview'
        }
      }
      return authorizedPath
    }
    return redirect
  }

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  }

  handleNoticeClear = type => {
    message.success(`清空了${type}`)
    const { dispatch } = this.props
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    })
  }

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props
    if (key === 'triggerError') {
      dispatch(routerRedux.push('/exception/trigger'))
      return
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      })
    }
  }

  handleNoticeVisibleChange = visible => {
    const { dispatch } = this.props
    if (visible) {
      dispatch({
        type: 'global/fetchNotices',
      })
    }
  }

  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
    } = this.props
    const { isMobile: mb } = this.state
    // console.log(sessionStorage.getItem('authority'))
    // console.log(Cookies.set('antd-pro-authority'))
    const redirect = sessionStorage.getItem('authority') === Cookies.get('antd-pro-authority') ? sessionStorage.getItem('redirect') : ''
    const bashRedirect = this.getBaseRedirect()
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={mb}
          onCollapse={this.handleMenuCollapse}
          />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={mb}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
              { redirect &&  <Redirect exact to={redirect} />}
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                  />
              ))}
              <Redirect exact from='/' to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              links={
                [
                  // {
                  //   key: 'Pro 首页',
                  //   title: 'Pro 首页',
                  //   href: 'http://pro.ant.design',
                  //   blankTarget: true,
                  // },
                  // {
                  //   key: 'github',
                  //   title: <Icon type="github" />,
                  //   href: 'https://github.com/ant-design/ant-design-pro',
                  //   blankTarget: true,
                  // },
                  // {
                  //   key: 'Ant Design',
                  //   title: 'Ant Design',
                  //   href: 'http://ant.design',
                  //   blankTarget: true,
                  // },
                ]
              }
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018 国信优易
                </Fragment>
              }
              />
          </Footer>
        </Layout>
      </Layout>
    )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}

export default connect(({ user, global = {}, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout)
