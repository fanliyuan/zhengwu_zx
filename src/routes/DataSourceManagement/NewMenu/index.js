/*
 * @Author: ChouEric
 * @Date: 2018-07-05 14:01:01
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-05 16:30:07
*/
import  React, { PureComponent, Fragment } from 'react'
import { Route, Redirect, Switch } from 'dva/router'
import { Steps, Card } from 'antd'

import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import { getRoutes } from '../../../utils/utils'
import styles from './index.less'

const { Step } = Steps

export default class NewMenu extends PureComponent {

  getCurrentStep() {
    const { location: { pathname } } = this.props
    // // const pathList = pathname.split('/')
    // console.log(pathname)
    switch (pathname) {
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

  render() {
    const { match, routerData } = this.props

    return (
      <PageHeaderLayout>
        <Card bordered={false} >
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps} >
              <Step title='填写目录资源内容' />
              <Step title='编辑信息项' />
              <Step title='完成' />
            </Steps>
            <Switch>
              {
                getRoutes(match.path, routerData).map(item => (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ))
              }
              <Redirect exact from="/dataSourceManagement/newMenu" to="/dataSourceManagement/newMenu/one" />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    )
  }
}

