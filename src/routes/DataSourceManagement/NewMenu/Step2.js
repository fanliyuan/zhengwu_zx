/*
 * @Author: ChouEric
 * @Date: 2018-07-05 16:45:01
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-07-05 17:57:17
 * @描述: 这个页面的上传应该是 上传完数据,然后后台处理,返回给前台,前台再核对,确认
*/
import React, { PureComponent, Fragment } from 'react'
import { routerRedux } from 'dva/router'
import { Form, Input, Button, Select, Radio } from 'antd'

import TableForm from './TableForm'
import styles from './index.less'

const { Item } = Form

@Form.create()
export default class Step1 extends PureComponent {
  state = {
    data: {
      method: 1,
    },
  }

  methodChange = (e) => {
    this.setState({
      data: {
        method: e.target.value,
      },
    })
  }

  render() {
    const { form: { getFieldDecorator, validateFields }, dispatch } = this.props
    const { data } = this.state

    // 这里是测试数据
    const tableData = [
      {
        infoCode: '00001',
      },
    ]

    return (
      <Fragment>
        <Form>
          <Item lable='名称'>
            <Radio.Group value={data.method} onChange={this.methodChange} >
              <Radio value={1}>从数据资源导入</Radio>
              <Radio value={2}>手工建立</Radio>
            </Radio.Group>
          </Item>
          <Item label='信息项' >
            <TableForm value={tableData} />
          </Item>
        </Form>
      </Fragment>
    )
  }
}
