/*
 * @Author: ChouEric
 * @Date: 2018-07-06 17:49:38
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-07-06 17:49:38
*/
import React, { PureComponent, Fragment } from 'react'
// import { routerRedux } from 'dva/router'
import Result from 'components/Result'

// import styles from './index.less'

// const { Item } = Form

export default class Step3 extends PureComponent {
  render() {

    return (
      <Fragment>
        <Result type='success' title='提交成功' />
      </Fragment>
    )
  }
}
