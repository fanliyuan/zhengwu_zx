/*
 * @Author: ChouEric
 * @Date: 2018-07-25 10:33:45
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-25 10:34:08
 * @Description: FTP步骤3
 */

import React, { PureComponent, Fragment } from 'react'
// import { routerRedux } from 'dva/router'
import Result from 'components/Result'

export default class Step3 extends PureComponent {
  render() {
    return (
      <Fragment>
        <Result type="success" title="提交成功" />
      </Fragment>
    )
  }
}
