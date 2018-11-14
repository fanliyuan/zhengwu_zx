import React from 'react'
import RenderAuthorized from '@/components/Authorized'
import { getAuthority } from '@/utils/authority'
import Redirect from 'umi/redirect'

const Authority = getAuthority()
const Authorized = RenderAuthorized(Authority)

export default ({ children }) => {
  // 从后端获取动态权限
  // const routesData = (sessionStorage.getItem('routes') || '').split(',')
  // const { props: {location: {pathname}} } = children
  // if (routesData.indexOf(pathname) < 0 && (pathname !== '/exception/403' && pathname !== '/exception/404' && pathname !== '/exception/500' )) {
  //   // console.log(pathname) // eslint-disable-line
  //   // console.log(routesData) // eslint-disable-line
  //   return (
  //     <Authorized authority='forbidButChouEric' noMatch={<Redirect to='/exception/403' />}>
  //       {children}
  //     </Authorized>
  //     )
  // }
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to={`/user/login${window.location.pathname==='/'?'':`?redirect=${window.location.href.split('?')[0]}`}`} />}>
      {children}
    </Authorized>
  )
}
