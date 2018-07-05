import React, { PureComponent, Fragment } from 'react'
import { routerRedux } from 'dva/router'
import { Form, Input, Button, Select } from 'antd'

import styles from './index.less'

const { Item } = Form

@Form.create()
export default class Step1 extends PureComponent {
  render() {
    const { form: { getFieldDecorator, validateFields }, dispatch, data } = this.props // eslint-disable-line

    return (
      <Form>
        <Item label='名称' >
          {
            getFieldDecorator('menuName',{
              initialValue: data.menuName,
              rules: [{ required: true, message: '请输入名称' }],
            })(<Input placeholder='请输入名称' />)
          }
        </Item>
        <Item label='描述' >
          {
            getFieldDecorator('desc',{
              initialValue: data.desc,
              rules: [{ required: true, message: '请输入名称' }],
            })(<Input.TextArea placeholder='请输入名称' />)
          }
        </Item>
        <Item label='分类' >
          {
            getFieldDecorator('classify',{
              initialValue: data.classify,
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Select>
                <Option value="classify1">分类1</Option>
                <Option value="classify2">分类2</Option>
                <Option value="classify21">分类21</Option>
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}
