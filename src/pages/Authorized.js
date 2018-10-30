import React from 'react'
import RenderAuthorized from '@/components/Authorized'
import { getAuthority } from '@/utils/authority'
import Redirect from 'umi/redirect'

const Authority = getAuthority()
const Authorized = RenderAuthorized(Authority)

export default ({ children }) => {
  // 从后端获取动态权限
  // console.log(children) // eslint-disable-line
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to={`/user/login?redirect=${window.location.href}`} />}>
      {children}
    </Authorized>
  )
}
