/*
 * @Author: ChouEric
 * @Date: 2018-07-24 20:36:13
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-24 23:45:34
 * @Description: 资源注册FTP
 */
import React from 'react'
import { Link, Switch, Redirect, Route } from 'dva/router'
import { Steps, Button } from 'antd'

import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import { getRoutes } from '../../../utils/utils'
import styles from './index.less'

const { Step } = Steps

export default function FTP(props) {
  const { match, routerData } = props

  function getCurrentStep() {
    const {
      location: { pathname },
    } = props
    const pathList = pathname.split('/')
    switch (pathList[pathList.length - 1]) {
      case 'one':
        return 0
      case 'two':
        return 1
      case 'three':
        return 2
      default:
        return 0
    }
  }

  return (
    <PageHeaderLayout>
      <div className="common-layout">
        <div className="btncls clearfix">
          <Link to="/dataSourceManagement/accessManagement" className="mr40">
            <Button>取消</Button>
          </Link>
        </div>
        <Steps current={getCurrentStep()} className={styles.steps}>
          <Step title="选择文件或者文件夹" />
          <Step title="设置同步计划" />
          <Step title="完成" />
        </Steps>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
          <Redirect exact from="/dataSourceManagement/FTP" to="/dataSourceManagement/FTP/one" />
        </Switch>
      </div>
    </PageHeaderLayout>
  )
}
